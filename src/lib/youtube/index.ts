// ─────────────────────────────────────────────────────────────────────────
//  YouTube plugin — logic (no API key required)
//
//  Two capabilities, both keyed off the channelId in ./config.ts:
//    • getLiveStatus()   – is the channel live right now? (+ the live videoId)
//    • getRecentVideos() – the latest uploads, from the channel's public RSS feed
//
//  Neither call needs a Google API key — they read YouTube's own public
//  pages/feeds. See ./AGENTS.md for how to reuse this on another church site.
// ─────────────────────────────────────────────────────────────────────────

import { youtube } from "./config";

export interface LiveStatus {
  isLive: boolean;
  videoId: string | null;
}

export interface SermonVideo {
  id: string;
  title: string;
  url: string;
  published: string; // human-friendly date
  isoDate: string;
  thumbnail: string;
  description: string;
}

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

/** Is the channel streaming right now? Reads youtube.com/channel/<id>/live. */
export async function getLiveStatus(
  channelId: string = youtube.channelId,
): Promise<LiveStatus> {
  try {
    const res = await fetch(
      `https://www.youtube.com/channel/${channelId}/live`,
      {
        next: { revalidate: 30 },
        headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
      },
    );
    if (!res.ok) return { isLive: false, videoId: null };

    const html = await res.text();
    const videoId =
      html.match(
        /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]+)"/,
      )?.[1] ?? null;

    const isOffline =
      /"status":"LIVE_STREAM_OFFLINE"/.test(html) || /"isUpcoming":true/.test(html);
    const isLive = !isOffline && /"isLive":true/.test(html);

    return { isLive, videoId };
  } catch {
    return { isLive: false, videoId: null };
  }
}

function matchTag(block: string, tag: string) {
  return block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))?.[1]?.trim() || "";
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(value: string) {
  return decodeXml(value).replace(/<[^>]+>/g, "").trim();
}

/** Latest uploads from the channel's public RSS feed. */
export async function getRecentVideos(
  limit = 12,
  channelId: string = youtube.channelId,
): Promise<SermonVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 1800 } },
    );
    if (!res.ok) return [];

    const xml = await res.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

    return entries.slice(0, limit).map((entry) => {
      const id = matchTag(entry, "yt:videoId");
      const isoDate = matchTag(entry, "published");
      return {
        id,
        title: stripHtml(matchTag(entry, "title")),
        url:
          entry.match(/<link[^>]*href="([^"]+)"[^>]*rel="alternate"/)?.[1] ||
          `https://www.youtube.com/watch?v=${id}`,
        isoDate,
        published: new Date(isoDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        thumbnail:
          entry.match(/<media:thumbnail[^>]*url="([^"]+)"/)?.[1] ||
          `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        description: stripHtml(matchTag(entry, "media:description")),
      };
    });
  } catch {
    return [];
  }
}

export { youtube };
