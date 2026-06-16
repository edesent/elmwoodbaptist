# YouTube Sermons Plugin

A self-contained, **no-API-key** plugin that powers a church's Sermons page from
their YouTube channel:

- When the channel is **live**, the Sermons page shows the live stream automatically.
- Otherwise it lists the **most recent uploads** in a grid that plays in a popup.

It works by reading YouTube's own public surfaces (the channel `/live` page and the
channel RSS feed) — there is no Google API key, no OAuth, and nothing to expire.

## Files

| File | What it is |
|---|---|
| `config.ts` | **The only file you edit to connect a church.** Handle + channel URL + channelId. |
| `index.ts` | Logic: `getLiveStatus()` and `getRecentVideos(limit)` (+ the `LiveStatus` / `SermonVideo` types). |
| `AGENTS.md` | This file. |

The matching UI lives in `src/components/SermonGrid.tsx` (the video grid + popup
player) and is rendered by the Sermons route at `src/app/messages/page.tsx`.

## Connect a church's YouTube channel (the whole job)

1. Open the channel — e.g. `https://www.youtube.com/@theirhandle`.
2. Get the **channel ID** (`UC…`): view page source and search for
   `"externalId":"UC` — copy that `UC…` value (or use any "YouTube channel ID"
   lookup tool).
3. Put the handle, URL, and channelId into `config.ts`. Done — the Sermons page
   now goes live when they go live, and lists their latest videos the rest of the week.

## Behavior notes

- **Live detection** revalidates every ~30s, so the page flips to the live stream
  within about half a minute of the stream starting (and back to the video list
  when it ends). The Sermons page sets `export const dynamic = "force-dynamic"`.
- **Recent videos** revalidate every ~30 min (the upload list rarely changes).
- If the feed is briefly unavailable, the page falls back to a "Watch on YouTube"
  button — it never shows an error.

## Reusing on another site

Copy the `src/lib/youtube/` folder + `src/components/SermonGrid.tsx`, edit
`config.ts`, and make sure the Sermons page calls `getLiveStatus()` /
`getRecentVideos()` and passes the videos into `<SermonGrid />`. Restyle
`SermonGrid` with that site's color tokens if needed.
