import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Inter, Sour_Gummy, Caveat_Brush, Amiri } from "next/font/google";
import { Header, Footer, ToastRegion, SkipLink, BackToTop } from "@/components";
import { JsonLd, getPersonJsonLd } from "@/lib";
import { generateMetadata } from "./metadata";

import "@/assets/styles/main.scss";

export { generateMetadata };

const noscriptCss = readFileSync(
  join(process.cwd(), "src/assets/styles/noscript.css"),
  "utf8",
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sour-gummy",
  display: "swap",
});

const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caveat-brush",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-arabic",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourGummy.variable} ${caveatBrush.variable} ${amiri.variable}`}
    >
      <head>
        <JsonLd data={getPersonJsonLd()} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noscriptCss }} />
        </noscript>
      </head>
      <body>
        <SkipLink href="#main">Skip to main content</SkipLink>
        <noscript>
          {/* Native anchors required — Next.js Link depends on JavaScript */}
          {/* eslint-disable @next/next/no-html-link-for-pages */}
          <nav className="noscript-nav" aria-label="Site navigation">
            <ul className="noscript-nav__list">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/aboutme">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/research">Research</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
          {/* eslint-enable @next/next/no-html-link-for-pages */}
        </noscript>
        <Header />
        {children}
        <BackToTop />
        <Footer />
        <ToastRegion />
      </body>
    </html>
  );
}
