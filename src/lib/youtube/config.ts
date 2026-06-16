// ─────────────────────────────────────────────────────────────────────────
//  YouTube plugin — connection settings
//
//  To connect a church's YouTube channel, this is the ONLY file you change.
//  Set the handle (the @name), the channel URL, and the channelId (UC…).
//
//  How to find the channelId from a handle:
//    1. Open https://www.youtube.com/@theirhandle
//    2. View page source and search for  "externalId":"UC…"
//       (or use any "YouTube channel ID" lookup tool)
//    3. Paste that UC… value below.
//
//  Once set, the Sermons page automatically shows the LIVE stream whenever
//  the channel is live, and otherwise lists the most recent uploads.
// ─────────────────────────────────────────────────────────────────────────

export const youtube = {
  handle: "@elmwoodbaptist",
  channelUrl: "https://www.youtube.com/@elmwoodbaptist",
  channelId: "UC14XgwvD6ArK5K-dziQbh3g",
};
