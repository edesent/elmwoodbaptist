import type { MetadataRoute } from "next";
import { staff } from "@/lib/staff";

const SITE_URL = "https://www.elmwoodbaptist.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/staff`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...staff.map((m) => ({
      url: `${SITE_URL}/staff/${m.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    {
      url: `${SITE_URL}/statement-of-faith`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/messages`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/give`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/plan-of-salvation`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
