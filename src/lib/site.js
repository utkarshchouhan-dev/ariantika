const DEFAULT_SITE_URL = "https://ariantika.me";

function normalizeSiteUrl(url) {
  if (!url) return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  return trimmed.replace(/\/$/, "");
}

export function getSiteUrl() {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    normalizeSiteUrl(process.env.URL) ||
    DEFAULT_SITE_URL
  );
}

export const SITE_URL = getSiteUrl();
