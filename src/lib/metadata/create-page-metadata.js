import { SITE_URL } from "@/lib";
import {
  OPEN_GRAPH_IMAGE,
  SITE_DEFAULT_TITLE,
  SITE_NAME,
  SITE_SHORT_NAME,
} from "./constants";

function resolveCanonicalUrl(path) {
  if (!path || path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function resolveFullTitle(title, path) {
  if (path === "/" || (!title && path !== undefined)) {
    return SITE_DEFAULT_TITLE;
  }

  if (!title) {
    return SITE_DEFAULT_TITLE;
  }

  if (title === SITE_DEFAULT_TITLE || title.includes(SITE_SHORT_NAME)) {
    return title;
  }

  return `${title} | ${SITE_SHORT_NAME}`;
}

export function createPageMetadata({
  path,
  title,
  description,
  robots,
  openGraph = {},
  twitter = {},
  includeCanonical = true,
}) {
  const canonicalUrl = path !== undefined ? resolveCanonicalUrl(path) : null;
  const fullTitle = resolveFullTitle(title, path);
  const isHome = path === "/";

  const metadata = {
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [OPEN_GRAPH_IMAGE],
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OPEN_GRAPH_IMAGE.url],
      ...twitter,
    },
  };

  if (!isHome && title) {
    metadata.title = title;
  }

  if (includeCanonical && canonicalUrl) {
    metadata.alternates = {
      canonical: canonicalUrl,
    };
  }

  if (robots) {
    metadata.robots = robots;
  }

  return metadata;
}
