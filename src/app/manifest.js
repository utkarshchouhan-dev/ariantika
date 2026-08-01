const PWA_ICON_192 = "/favicon/web-app-manifest-192x192.png";
const PWA_ICON_512 = "/favicon/web-app-manifest-512x512.png";

export default function manifest() {
  return {
    id: "/",
    name: "Ariantika • Epidemiology & Biostatistics Researcher",
    short_name: "Ariantika",
    description:
      "I'm Ariantika, an Epidemiology & Biostatistics Researcher. Explore my research, publications, and my work in public health and data analysis.",
    lang: "en",
    dir: "ltr",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#97C7F2",
    theme_color: "#BFDDF7",
    prefer_related_applications: false,
    categories: ["health", "medical", "education", "science", "research"],
    icons: [
      {
        src: PWA_ICON_192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: PWA_ICON_512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    shortcuts: [
      {
        name: "About Me",
        short_name: "About",
        description:
          "Learn about Ariantika's background and research experience",
        url: "/aboutme",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Services",
        short_name: "Services",
        description:
          "Research design, statistical analysis, and public health consulting",
        url: "/services",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Research",
        short_name: "Research",
        description: "Ariantika's research projects",
        url: "/research",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Contact",
        short_name: "Contact",
        description: "Contact Ariantika for research inquiries",
        url: "/contact",
        icons: [
          {
            src: PWA_ICON_192,
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
    screenshots: [
      {
        src: "/opengraph-image.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  };
}
