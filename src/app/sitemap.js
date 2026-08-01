const BASE_URL = "https://ariantika.me";
export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/aboutme`,
      lastModified: new Date(),
      changefreq: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/research`,
      lastModified: new Date(),
      changefreq: "daily",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changefreq: "daily",
      priority: 0.4,
    },
  ];
}
