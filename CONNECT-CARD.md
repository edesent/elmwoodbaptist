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

**Changed:**
- `src/lib/email.ts` — added `sendEmail()` for a configurable to/from address.
  `sendChurchEmail()` (used by `/api/contact` and `/api/prayer`) is unchanged
  in behavior — it now just calls `sendEmail()` internally.
- `src/components/MapAddress.tsx` — added a "Fill Out a Connect Card" link
  next to "Get Directions" / "Send Us a Message" in the Visit Us section.
- `src/components/Footer.tsx` — added "Connect Card" to Quick Links.
- `package.json` — added a `test` script and `tsx` as a devDependency (see §6
  for why one small dependency was needed).
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
| `CONNECT_CARD_SEND_AUTOREPLY` | Visitor thank-you email | `"true"` to enable; defaults to off. |
| `BREEZE_ENABLED` | Breeze sync | Must be `"true"` **and** have a subdomain + API key before any Breeze call is made. |
| `BREEZE_SUBDOMAIN` | Breeze sync | e.g. `elmwoodbaptist` for `elmwoodbaptist.breezechms.com`. |
| `BREEZE_API_KEY` | Breeze sync | Secret — never logged, never sent to the browser. |
| `BREEZE_CONNECT_CARD_TAG_ID`, `BREEZE_FIRST_TIME_VISITOR_TAG_ID`, `BREEZE_RETURNING_VISITOR_TAG_ID`, `BREEZE_REGULAR_ATTENDER_TAG_ID`, `BREEZE_MEMBER_TAG_ID` | Breeze tagging | Account-specific tag IDs — see §5. |
| `BREEZE_PROFILE_FIELD_MAP` | Breeze field mapping | JSON — see §5. |
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
- Phone/email normalization
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
npm run dev
```
Visit `http://localhost:3000/connect`, fill out the form, and submit. Leave
`BREEZE_ENABLED` unset/false for this — Breeze sync will report as
"disabled" in the staff email, which is expected until §8 is complete.

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
`BREEZE_API_KEY` are both set — nothing in this codebase guesses at your
account's field or tag IDs.

### a) Confirm the auth mechanism
`src/lib/connectCard/breezeClient.ts` sends the API key as an `Api-Key`
request header, matching the convention used by Breeze's published wrapper
libraries. **This has not been confirmed against Elmwood's own account** —
Breeze's public API reference page describes each endpoint's URL and query
parameters but doesn't show the raw HTTP auth mechanism outside of the PHP
wrapper. Before enabling anything, have a Breeze administrator generate an
API key (**Breeze → Settings (gear icon) → Extensions → API** — the exact
menu label may vary slightly by account) and make one manual test call, e.g.:
```bash
curl -H "Api-Key: YOUR_KEY" "https://YOUR_SUBDOMAIN.breezechms.com/api/account/summary"
```
If that doesn't return your church's account info, the auth header format
needs adjusting in `breezeClient.ts` before going further.

### b) Retrieve your profile fields
```bash
curl -H "Api-Key: YOUR_KEY" "https://YOUR_SUBDOMAIN.breezechms.com/api/profile"
```
This returns every profile field and multiple-choice option **with your
account's actual numeric IDs** (these are unique per Breeze account — the
ones in Breeze's own docs, and any examples in this codebase, are just
illustrative and will not match your data).

### c) Build `BREEZE_PROFILE_FIELD_MAP`
Using the field/option IDs from step (b), construct a JSON object shaped
like:
```json
{
  "email": { "fieldId": "YOUR_EMAIL_FIELD_ID", "fieldType": "email" },
  "phone": { "fieldId": "YOUR_PHONE_FIELD_ID", "fieldType": "phone" },
  "address": { "fieldId": "YOUR_ADDRESS_FIELD_ID", "fieldType": "address" },
  "maritalStatus": {
    "fieldId": "YOUR_MARITAL_STATUS_FIELD_ID",
    "fieldType": "radio",
    "options": { "single": "OPT_ID", "married": "OPT_ID", "widowed": "OPT_ID" }
  },
  "grade": { "fieldId": "YOUR_GRADE_FIELD_ID", "fieldType": "grade" }
}
```
Supported top-level keys: `email`, `phone`, `address`, `maritalStatus`,
`attendanceStatus`, `preferredContact`, `firstVisitDate`, `howHeard`,
`permissionToContact`, `grade`. Omit any key your account doesn't have an
appropriate field for — see (e) below.

Set the whole JSON object (minified, no line breaks) as
`BREEZE_PROFILE_FIELD_MAP`. The app validates this at request time and will
log (not crash) a clear configuration error if it's malformed — see
`src/lib/connectCard/breezeConfig.ts`.

### d) Find or create Breeze tags
```bash
curl -H "Api-Key: YOUR_KEY" "https://YOUR_SUBDOMAIN.breezechms.com/api/tags/list_tags"
```
Find (or, in the Breeze UI, create) tags for: a general "Website Connect
Card" tag, plus "First-Time Visitor," "Returning Visitor," "Regular
Attendee," and "Church Member" (or your account's existing equivalents —
don't create duplicates of tags that already exist). Set their IDs as
`BREEZE_CONNECT_CARD_TAG_ID`, `BREEZE_FIRST_TIME_VISITOR_TAG_ID`, etc.

### e) Fields Elmwood's Breeze account may not have yet
The Connect Card asks for a few things that many Breeze accounts don't have
a dedicated field for out of the box:
- **Attendance status** (first-time / returning / regular) — this is
  primarily tracked via **tags** in this implementation (see §9d), not a
  profile field, so no new field is strictly required.
- **Preferred contact method** and **How did you hear about us** — these
  need a custom multiple-choice profile field if you want them stored on the
  person record (Breeze → Settings → Profile Fields → Add Field →
  Multiple Choice). Otherwise, leave them out of `BREEZE_PROFILE_FIELD_MAP`
  and they'll simply not sync to Breeze (they still appear in the staff
  email/Slack notification either way).
- **First visit date** — use a Date-type custom field if you'd like this in
  Breeze.
- **Permission to contact** — a Yes/No custom field (checkbox type) if
  you'd like it tracked in Breeze; otherwise it's only in the staff
  notifications.

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
1. Set `BREEZE_ENABLED=true` with real subdomain/API key/tag IDs, but do
   this **first on a preview deployment or local environment**, not
   production, if possible.
2. Submit several Connect Cards using **clearly test-labeled names** (e.g.
   "ZZTEST Connect Card" as the last name) so they're unmistakable in
   Breeze and easy to find and delete afterward:
   - A brand-new person (no existing match)
   - A person who should strong-match by email
   - A person who should strong-match by phone + consistent name
   - A same-name-only case (should create a new profile + flag for review,
     not update the existing one)
   - A submission with 2–3 children (new family creation)
   - A submission adding a child to an adult who already has a Breeze family
3. Confirm each result in Breeze directly (correct person created/updated,
   correct tags, correct family), and confirm the staff email/Slack message
   accurately describes what happened.
4. Delete the ZZTEST records afterward using Breeze's own People → bulk
   delete tools (not this app, which deliberately has no delete capability)
   — take care to only remove records you created, and to remove them from
   any family they were linked to first if that's required by Breeze's UI.
5. Only after all of the above looks right, set `BREEZE_ENABLED=true` in
   production.

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
- Breeze's raw HTTP authentication header format (`Api-Key: <key>`) is
  implemented based on the convention used by Breeze's published API
  wrappers, since the official docs page shows examples exclusively through
  those wrappers. This must be confirmed against your account before go-live
  (§9a).
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
5. If/when you want Breeze sync, work through §9 in order: confirm the auth
   header, retrieve your account's profile-field IDs, build
   `BREEZE_PROFILE_FIELD_MAP`, find/create the tag IDs, decide on the fields
   in §9(e) that may need new custom Breeze fields, and complete the manual
   integration test (§9i) before setting `BREEZE_ENABLED=true` in production.
6. Decide whether you'd ever like prayer requests/comments stored in Breeze
   (currently intentionally excluded — §9f) — that needs a separate consent
   and access-control decision, not just a config change.
