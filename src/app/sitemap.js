import { getOrderedPublications } from "@/data";
import { SITE_URL } from "@/lib";

export const dynamic = "force-static";
const isNetlifyPreview =
  process.env.CONTEXT && process.env.CONTEXT !== "production";

const staticRoutes = [
  { path: "/", priority: 1.0 },
  { path: "/aboutme", priority: 0.8 },
  { path: "/services", priority: 0.8 },
  { path: "/research", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
];

export default function sitemap() {
  if (isNetlifyPreview) {
    return [];
  }

  const lastModified = new Date();

  const pages = staticRoutes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changefreq: "monthly",
    priority,
  }));

  const publications = getOrderedPublications().map((publication) => ({
    url: `${SITE_URL}/research/${publication.slug}`,
    lastModified,
    changefreq: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...publications];
}
