export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/dev/"],
      crawlDelay: 1,
    },
    sitemap: "https://ariantika.me/sitemap.xml",
  };
}
