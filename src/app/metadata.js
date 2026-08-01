const SITE_URL = "https://ariantika.me";

const openGraphImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Ariantika • Epidemiology & Biostatistics Researcher",
  type: "image/png",
};

const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ariantika • Epidemiology & Biostatistics Researcher",
    template: "%s | Ariantika",
  },
  description:
    "I'm Ariantika, an Epidemiology & Biostatistics Researcher. Explore my research, publications, and work in public health and data analysis.",
  keywords: [
    "Ariantika",
    "Ariantikaa",
    "ariantika effendi",
    "Ariantika researcher",
    "epidemiology researcher",
    "biostatistics researcher",
    "public health researcher",
    "public health Indonesia",
    "cancer research",
    "infectious disease research",
    "non-communicable disease research",
    "SPSS statistical analysis",
    "research design",
    "health data analysis",
    "researcher North Sumatra",
    "researcher Indonesia",
  ],
  authors: [{ name: "Ariantika" }],
  creator: "Ariantika",
  publisher: "Ariantika",
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
    "theme-color": "#1563a7",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ariantika • Epidemiology & Biostatistics Researcher",
    title: "Ariantika",
    description:
      "Portfolio of Ariantika, an Epidemiology & Biostatistics researcher focused on public health and disease research.",
    images: [openGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ariantika | Epidemiology & Biostatistics Researcher ",
    description:
      "Explore Ariantika's research, publications, and work in public health and data analysis.",
    site: SITE_URL,
    creator: "Ariantika",
    images: [openGraphImage.url],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "4AhP3TwACu_yGCE3TRLJ7jVgr5BA1DETZePAmR9uqhI",
  },
};

export async function generateMetadata() {
  return metadata;
}
