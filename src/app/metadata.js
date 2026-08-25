import {
  SITE_URL,
  OPEN_GRAPH_IMAGE,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE_TEMPLATE,
} from "@/lib";

const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Ariantika", url: SITE_URL }],
  creator: "Ariantika",
  publisher: "Ariantika",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  other: {
    "theme-color": "#BFDDF7",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [OPEN_GRAPH_IMAGE.url],
  },
};

export async function generateMetadata() {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  if (!google) {
    return metadata;
  }

  return {
    ...metadata,
    verification: {
      google,
    },
  };
}
