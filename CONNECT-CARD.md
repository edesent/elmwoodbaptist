# Connect Card — Implementation Notes

This document covers the visitor/attendee **Connect Card** feature: the
`/connect` page, its `/api/connect-card` endpoint, email + Slack
notifications, the optional visitor auto-reply, and the (currently
disabled-by-default) Breeze ChMS synchronization.

## 1. Files created or changed

**New:**
- `src/app/connect/page.tsx` — the Connect Card page
- `src/components/ConnectCardForm.tsx` — the form itself (client component)
- `src/app/api/connect-card/route.ts` — the API route
- `src/lib/connectCard/validation.ts` — shared types + validation/sanitization
- `src/lib/connectCard/rateLimit.ts` — best-effort in-memory rate limiting
- `src/lib/connectCard/idempotency.ts` — best-effort duplicate-submit guard
- `src/lib/connectCard/slack.ts` — Slack incoming-webhook notifier
- `src/lib/connectCard/breezeClient.ts` — low-level Breeze ChMS API client
- `src/lib/connectCard/breezeConfig.ts` — loads/validates Breeze env config
- `src/lib/connectCard/breeze.ts` — Breeze matching/sync orchestration
- `src/lib/connectCard/notify.ts` — staff email + visitor auto-reply content
- `.env.example` — placeholder environment variables
- `tests/connectCard/*.test.ts` — automated tests (see §6)
- `scripts/submit-connect-card.mjs` — reusable local test-card sender, run via
  `npm run card` (see §7)

**Changed:**
- `src/lib/email.ts` — added `sendEmail()` for a configurable to/from address.
  `sendChurchEmail()` (used by `/api/contact` and `/api/prayer`) is unchanged
  in behavior — it now just calls `sendEmail()` internally.
- `src/components/MapAddress.tsx` — added a "Fill Out a Connect Card" link
  next to "Get Directions" / "Send Us a Message" in the Visit Us section.
- `src/components/Footer.tsx` — added "Connect Card" to Quick Links.
- `package.json` — added a `test` script, a `card` script (local test-card
  sender, see §7) and `tsx` as a devDependency (see §6 for why one small
  dependency was needed).
- `README.md` — added `/connect` to the pages table.

Nothing else was touched — no other pages, components, or styling changed.

## 2. Route

**`/connect`** — publicly accessible, linked from the homepage's "Visit Us"
section and the footer.

## 3. Environment variables

All are in `.env.example` with empty placeholders. None of these are set in
this repo — you'll set the real values in Vercel's Project Settings.

| Variable | Required for | Notes |
|---|---|---|
| `RESEND_API_KEY` | Any email | Already required by the existing contact/prayer forms. |
| `CONNECT_CARD_EMAIL_TO` | Staff email | If unset, the staff email is skipped (Slack/Breeze still run). |
| `CONNECT_CARD_EMAIL_FROM` | Staff + autoreply email | Falls back to the existing `SENDER` in `src/lib/email.ts`. |
| `SLACK_CONNECT_CARD_WEBHOOK_URL` | Slack notification | Server-side only — never exposed to the browser. |
| `CONNECT_CARD_SEND_AUTOREPLY` | Visitor thank-you email | Enabled by default; set to `"false"` to disable. |
| `BREEZE_ENABLED` | Breeze sync | Must be `"true"` **and** have a subdomain + API key before any Breeze call is made. |
| `BREEZE_SUBDOMAIN` | Breeze sync | e.g. `elmwoodbaptist` for `elmwoodbaptist.breezechms.com`. |
| `BREEZE_API_KEY` | Breeze sync | Secret — never logged, never sent to the browser. |
| `BREEZE_CONNECT_CARD_TAG_ID`, `BREEZE_FIRST_TIME_VISITOR_TAG_ID`, `BREEZE_RETURNING_VISITOR_TAG_ID`, `BREEZE_REGULAR_ATTENDER_TAG_ID`, `BREEZE_MEMBER_TAG_ID` | Breeze tagging (optional) | Account-specific tag IDs. **Optional** — attendance now writes to the `Status` profile field by default, so tags are not required. See §9d. |
| `BREEZE_PROFILE_FIELD_MAP` | Breeze field mapping (optional) | JSON — **overrides** the built-in Elmwood default map in `breezeConfig.ts`. See §9c. |
| `SITE_URL` | Visitor auto-reply link | Defaults to the current site URL if unset. |

## 4. Email provider setup (Resend)

This project already uses [Resend](https://resend.com) for `/api/contact`
and `/api/prayer` — the Connect Card reuses the same integration, just with
its own recipient/sender variables so it isn't tied to the general office
inbox.

1. In Resend, verify the `elmwoodbaptist.org` sending domain (or use the
   shared `onboarding@resend.dev` sender for testing — note that one only
   delivers to the address you signed up to Resend with).
2. Set `RESEND_API_KEY` in Vercel (if not already set).
3. Set `CONNECT_CARD_EMAIL_TO` to the address that should receive Connect
   Card submissions (can be the same as `office@elmwoodbaptist.org` or a
   dedicated address).
4. Set `CONNECT_CARD_EMAIL_FROM` to a verified sender, e.g.
   `"Elmwood Baptist Website <website@elmwoodbaptist.org>"`.

## 5. Slack setup

1. In Slack, go to **Apps → Incoming Webhooks** (or create a simple app at
   [api.slack.com/apps](https://api.slack.com/apps) with the Incoming
   Webhooks feature enabled).
2. Choose the channel that should receive Connect Card notifications and
   generate a webhook URL (looks like
   `https://hooks.slack.com/services/T000/B000/xxxxxxxx`).
3. Set `SLACK_CONNECT_CARD_WEBHOOK_URL` to that URL in Vercel — **as a
   server-side environment variable only**. Do not prefix it with
   `NEXT_PUBLIC_`, do not put it in any client component, and do not commit
   it anywhere.
4. Submit a test Connect Card (see §7) and confirm the message appears
   correctly formatted in the channel.

## 6. Testing

**Automated tests** live in `tests/connectCard/` and use Node's built-in
test runner (`node:test`) rather than a new test framework — the project
currently has zero test tooling and its own README explicitly discourages
adding dependencies "to make it fancier." The one exception: running
TypeScript test files directly requires **`tsx`** (added as a devDependency)
since this project has no build step that compiles `.ts` to `.js` outside of
Next's own bundler. This is a single, minimal, well-established tool — not a
test framework — and is the smallest addition that makes `node --test` able
to run at all.

Run them with:
```bash
npm install   # pulls in tsx
npm test
```

**What's covered:**
- Valid basic submission; optional fields omitted; multiple children
- Invalid email; missing required fields; invalid attendance status
- Overly long text (clipped, not rejected)
- Mass-assignment guard (unexpected field names rejected)
- HTML/Slack-formatting sanitization; email-header-injection stripping
- Phone/email normalization (email requires a domain + 2+ letter TLD; phone is
  US/NANP-only — 10 digits with a plausible area code and exchange)
- Duplicate-submission (idempotency) guard
- Slack notifier: success, HTTP failure, network failure, escaping
- Breeze field-map configuration validation (valid + several invalid shapes)
- Rate limiter (burst allowed, then blocked; per-client isolation)

**What's intentionally NOT covered by automated tests, and why:**
- The `/api/connect-card` route handler itself isn't exercised end-to-end
  (that would require bootstrapping a full Next.js request/response cycle,
  which is disproportionate tooling for this project). Instead, the pure
  logic each step depends on (validation, Slack, idempotency, rate limiting,
  Breeze config) is tested directly, and the route's wiring should be
  confirmed with a real local submission (§7).
- The Breeze *sync* orchestration (`breeze.ts`) — matching, create/update,
  family linking — is not unit tested with mocked HTTP calls in this pass,
  because it can't be meaningfully verified without real (or realistically
  shaped) account data. Instead, it stays behind `BREEZE_ENABLED=false` until
  you've completed the manual integration test in §8, which exercises the
  real logic against a live (test-labeled) Breeze account.
- Honeypot spam rejection is simple enough (`if (raw.botcheck) return success`)
  that it's verified manually rather than with an automated test.

**I have not run `npm run build`, `npm run lint`, `npm test`, or `npm run dev`
myself.** The tool I used to make these changes commits files directly to
GitHub and does not have a shell to install dependencies or execute a build.
Please run these locally (or let Vercel's own build run) before relying on
this in production:
```bash
npm install
npm run lint
npm run build
npm test
```
If the build reports a TypeScript or ESLint error, it's most likely in one of
the new `src/lib/connectCard/*.ts` files or `ConnectCardForm.tsx` — those are
the files most likely to need a small fix I couldn't catch without a
compiler. I'd be glad to fix anything the build turns up.

## 7. Testing a submission locally

```bash
npm install
cp .env.example .env.local
# Fill in at least RESEND_API_KEY, CONNECT_CARD_EMAIL_TO, CONNECT_CARD_EMAIL_FROM
# To test Breeze sync, also set BREEZE_ENABLED=true, BREEZE_SUBDOMAIN, BREEZE_API_KEY
npm run dev
```

Then either open `http://localhost:3000/connect` and fill in the form, or use
the reusable script so you don't retype the form every time:

```bash
npm run card list                       # show scenarios
npm run card new                        # brand-new visitor (ZZTEST label)
npm run card new -- --unique            # timestamped, never matches
npm run card update-email               # strong-match by email -> update
npm run card update-phone               # strong-match by phone + name
npm run card name-only                  # then name-only-2 -> duplicate flagged
npm run card family-new                 # adult + 2 kids -> family create
npm run card family-add-child           # run after family-new -> family add
npm run card raw -- --json ./card.json  # arbitrary payload
```

Each run sends a random `x-forwarded-for`, so the 5-per-10-minutes rate limit
doesn't get in the way; add `--dry-run` to print the payload without sending.
Every scenario uses a `ZZTEST` last name and a test address, so the records are
easy to spot and delete in Breeze afterwards (§9i).

When Breeze sync runs, the terminal running `npm run dev` prints the full
Breeze result (create/update/duplicate/family/tags) — no staff email or Slack
needed to see what happened. This log is development-only. Leave
`BREEZE_ENABLED` unset/false if you don't want to touch Breeze; sync then
reports as "disabled" and everything else still works.

## 8. Verifying in production

1. Deploy with the email/Slack env vars set (Breeze still disabled).
2. Submit a real test Connect Card on the live site using your own
   information (clearly identifiable as a test — see below).
3. Confirm:
   - You receive the staff notification email at `CONNECT_CARD_EMAIL_TO`.
   - The Slack message appears in the configured channel, correctly
     formatted, with your test data.
   - If you entered an email and `CONNECT_CARD_SEND_AUTOREPLY=true`, you
     receive the visitor thank-you email.
   - The success page appears and does not display any of your submitted
     information back to you.
4. **I have not personally verified email or Slack delivery with real
   credentials** — I don't have your Resend or Slack credentials, and this
   tool has no way to send a live test message. Please complete this
   verification step yourselves before considering the notification pipeline
   "done."

## 9. Before enabling live Breeze writes (`BREEZE_ENABLED=true`)

**Do not turn this on until each of these is complete.** Breeze sync is
fully inert until `BREEZE_ENABLED=true` **and** `BREEZE_SUBDOMAIN` +
`BREEZE_API_KEY` are both set. Elmwood's field mappings are already built
into `breezeConfig.ts` (see c) — the steps below are the verification done
against the live account.

### a) Auth mechanism (confirmed against Elmwood's account)
`src/lib/connectCard/breezeClient.ts` sends the API key as an `Api-Key`
request header. This is **confirmed working** for Elmwood — e.g.
`https://elmwoodbaptistchurchacademy.breezechms.com/api/account/summary`
returns the church's account summary. No auth change is needed. Generate/manage
the key under **Breeze → Settings (gear icon) → Extensions → API**.

### b) Retrieve your profile fields
```bash
curl -H "Api-Key: YOUR_KEY" "https://YOUR_SUBDOMAIN.breezechms.com/api/profile"
```
This returns every profile field and multiple-choice option **with your
account's actual numeric IDs** (unique per Breeze account — any examples in
Breeze's docs are illustrative and will not match your data).

### c) Profile field map (Elmwood's is already built in)
`src/lib/connectCard/breezeConfig.ts` contains `ELMWOOD_DEFAULT_FIELD_MAP`,
built from Elmwood's own `/profile` export, so Breeze sync works **without**
setting `BREEZE_PROFILE_FIELD_MAP` at all. Current mappings:

| Connect Card field | Breeze field | Notes |
|---|---|---|
| email | Email (`682313441`) | |
| phone | Phone (`639540696`) | |
| address | Address (`857201905`) | |
| maritalStatus | Marital Status (`1481884841`) | only single / married / widowed are sent |
| attendanceStatus | Status (`195090343`) | first_time→First Time Visitor, visited_before→Returning Visitor, regular→Attender, member→Member |
| preferredContact | Preferred Contact Method (`1525684764`) | |
| howHeard | Connected At (`1525684763`) | |
| ageGroup | Age Group (`1525684765`) | Breeze has no "under 18" option (and that option was removed from the site) |
| grade | Grade (`183091182`) | children only |

To change this without a code deploy, set `BREEZE_PROFILE_FIELD_MAP` (a
minified JSON object) — it **overrides** the built-in default entirely. Find
IDs via step (b). Supported top-level keys: `email`, `phone`, `address`,
`maritalStatus`, `attendanceStatus`, `preferredContact`, `firstVisitDate`,
`howHeard`, `permissionToContact`, `ageGroup`, `grade`. The app validates the
JSON at request time and logs (does not crash) a clear configuration error if
it's malformed — see `breezeConfig.ts`.

### d) Breeze tags (optional — no longer needed for attendance)
Attendance status is written to the `Status` profile field (step c), **not** to
tags. The tag support still exists if you later want, say, a "Website Connect
Card" tag (list tags with
`curl -H "Api-Key: YOUR_KEY" "https://YOUR_SUBDOMAIN.breezechms.com/api/tags/list_tags"`).
Leave the `BREEZE_*_TAG_ID` variables unset to skip tagging entirely.

### e) Connect Card answers that don't reach Breeze
- **How We Can Help** (`interests`) — Breeze has no multi-select field type, so
  this stays email/Slack-only. Storing it would need a code change (e.g.
  multiple checkbox fields, or a concatenated text field).
- **First visit date** and **Permission to contact** — supported by the sync
  code, but Elmwood has no matching Breeze field yet. Add a Date field / a
  Yes-No (checkbox) field in Breeze, then map them (step c) to store these.
- **Prayer requests** and **comments** are intentionally never written to
  Breeze — see (f).

### f) Fields intentionally never sent to Breeze
Prayer requests and free-form comments are **never** written to Breeze —
only delivered via the staff email/Slack notification. If you'd like these
stored in Breeze later (e.g. as a private pastoral note), that needs a
separate decision about who can see it, whether it should be a private
note, and retention — see the note in `breeze.ts`'s "Other Connect Card
Information" section of the original spec. Not implemented here.

### g) Duplicate-matching rules (implemented)
- **Strong match** (safe to update): normalized email exact match, or
  normalized phone match **with** consistent first/last name.
- **Possible match** (never auto-updated): same first + last name only. A
  new profile is created instead, and the submission is flagged in the
  staff email/Slack message with the existing profile's Breeze ID for
  manual review.
- Existing non-empty Breeze values are never overwritten with a blank
  submitted value (updates only ever include fields the visitor filled in).
- Children are only matched against people already in the same Breeze
  family as the confirmed adult match — never Breeze-wide by name alone.

### h) Family-linking rules (implemented)
- `families/destroy` and `families/remove` are never called by this flow.
- If the adult has no existing Breeze family and no new child belongs to
  another family, `families/create` links the adult + newly created
  children.
- If the adult already has a Breeze family, newly created children are
  added via `families/add` (which preserves the existing family record)
  rather than `families/create` (which would not).
- If the adult match itself is only a "possible duplicate," family linking
  is skipped and flagged for manual review rather than guessed at.

### i) Test before going live
1. Set `BREEZE_ENABLED=true` with the real subdomain/API key, but do this
   **first on a preview deployment or local environment**, not production, if
   possible.
2. Send test cards with `npm run card` (§7) — every scenario uses a `ZZTEST`
   last name and a test address, so the records are unmistakable in Breeze and
   easy to find and delete afterward:
   - `npm run card new` — a brand-new person (no existing match)
   - `npm run card update-email` — should strong-match by email and update
   - `npm run card update-phone` (run twice) — second run strong-matches by
     phone + consistent name
   - `npm run card name-only` then `npm run card name-only-2` — same-name-only
     case should create a new profile and flag for review, not update
   - `npm run card family-new` — a submission with 2 children (family creation)
   - `npm run card family-add-child` — adds a child to an adult who already has
     a Breeze family (run after `family-new`)
   The `npm run dev` terminal prints the full Breeze result for each run (§7).
3. Confirm each result in Breeze directly (correct person created/updated,
   correct `Status`/profile fields, correct family), and confirm the staff
   email/Slack message accurately describes what happened.
4. Delete the ZZTEST records afterward using Breeze's own People → bulk
   delete tools (not this app, which deliberately has no delete capability)
   — take care to only remove records you created, and to remove them from
   any family they were linked to first if that's required by Breeze's UI.
5. Only after all of the above looks right, set `BREEZE_ENABLED=true` in
   production.

### j) Breeze API quirks (already handled in code)
Found while integrating against Elmwood's live account — worth knowing if the
client is ever revisited:
- **Write endpoints double-encode their JSON.** `/people/add` and
  `/families/create` return the payload as a JSON *string* (e.g.
  `"{\"id\":\"123\"}"`), not a JSON object. `breezeClient.ts` unwraps this
  once so callers get the real object.
- **`/tags/assign` returns `204` with an empty body** — treated as success.
- **`showPerson().family` entries are membership records**, with the actual
  person nested under `.details` — normalized before child matching.
- `/people/update` returns a single object (not an array), while `/people`
  returns an array; the client types reflect the real shapes.

## 10. Known limitations

- **Rate limiting and duplicate-submission protection are in-memory only**
  (see comments in `rateLimit.ts` / `idempotency.ts`). On Vercel's
  serverless platform this only protects against rapid abuse hitting the
  same warm instance — it is not a durable, cross-instance guarantee. If
  spam becomes a real problem, this should be swapped for a durable store
  (Vercel KV / Upstash Redis) rather than treated as fully solved.
- **No CAPTCHA** was added, per the instruction not to add one unless the
  site already has one or spam becomes a demonstrated problem. The honeypot
  field plus rate limiting are the current spam defenses.
- **Phone validation is US-only.** `normalizePhone()` accepts only 10-digit
  NANP numbers (with an optional leading `1`/`+1`) whose area code and
  exchange don't start with 0 or 1; international numbers are rejected. Email
  validation checks format only (domain + 2+ letter TLD) — it does **not**
  verify the address actually exists/delivers.
- **Breeze's List People filter (`filter_json`) exact-match semantics**
  aren't fully documented for arbitrary field values (vs. the tag-based
  example Breeze's own docs show) — `breeze.ts` re-confirms any email match
  against the full person record before trusting it, but this should be
  watched during the manual integration test in §9i.
- **No persistent database** was introduced, per your instruction. Email +
  Slack (+ Breeze, once enabled) serve as the submission record. The code is
  structured (a single `ValidatedConnectCard` type, a single sync entry
  point) so a database could be added later without a rewrite.

## 11. Assumptions made

- The "Plan Your Visit area" referenced in the request is this site's
  "Visit Us" section (`MapAddress.tsx`, `id="contact"`) — that's where the
  Connect Card link was added, plus a link in the footer. I did not add a
  new top-level item to the main navbar, to avoid overcrowding it per your
  instruction; the existing "Plan a Visit" nav button still points to the
  contact modal, unchanged.
- "Grade" options were implemented as Nursery / Preschool / Kindergarten +
  an "Other" option with a follow-up text field, since your spec mentioned
  an "Other" text field in the Children section immediately after the grade
  list (it wasn't fully clear whether that note was about grade or was
  carried over from the "How did you hear about us" section above it). If
  you'd rather Grade be a closed list with no "Other," that's a one-line
  change in `ConnectCardForm.tsx` and `validation.ts`.
- Breeze's raw HTTP authentication header format (`Api-Key: <key>`) was
  implemented from the convention used by Breeze's published API wrappers and
  has since been **confirmed working** against Elmwood's account (§9a).
- The visitor auto-reply and staff email both use the church's existing
  public contact info already present elsewhere on the site (phone,
  address, office email) rather than duplicating it in a new config file.

## 12. What still needs your input/action

1. Verify/complete the Resend domain setup and set the email env vars (§4).
2. Create the Slack incoming webhook and set `SLACK_CONNECT_CARD_WEBHOOK_URL` (§5).
3. Run `npm install && npm run build && npm run lint && npm test` — I could
   not run these myself (§6).
4. Perform a real local test submission (§7) and a real production
   verification (§8) — I don't have your credentials to do this myself.
5. If/when you want Breeze sync: the auth header, profile-field mappings
   (§9c), and Status-field attendance mapping are already done and confirmed
   against Elmwood's account. Review §9e for the few answers that still don't
   reach Breeze, run the `npm run card` test matrix (§9i), then set
   `BREEZE_ENABLED=true` in production.
6. Decide whether you'd ever like prayer requests/comments stored in Breeze
   (currently intentionally excluded — §9f) — that needs a separate consent
   and access-control decision, not just a config change.
