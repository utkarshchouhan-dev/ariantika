const PWA_ICON_192 = "/favicon/web-app-manifest-192x192.png";
const PWA_ICON_512 = "/favicon/web-app-manifest-512x512.png";

export default function manifest() {
  return {
    id: "/",
    name: "Ariantika • Epidemiology & Biostatistics Researcher",
    short_name: "Ariantika • Epidemiology & Biostatistics Researcher",
    description:
      "If you want to know more about me, you can find all information about my publications and my interests here.",
    lang: "en",
    dir: "ltr",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F7F3E9",
    theme_color: "#2B1B17",
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
        description: "Learn about my background and research experience",
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
          "I offer services for research design, statistical analysis, and public health consulting",
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
        name: "Publications",
        short_name: "Publications",
        description: "My research publications",
        url: "/publications",
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
        description: "Contact me for research inquiries",
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
