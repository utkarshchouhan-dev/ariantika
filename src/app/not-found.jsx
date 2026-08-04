import Image from "next/image";
import notFoundImage from "@/assets/images/not_found/not-found.png";
import * as motion from "motion/react-client";
import { reveal, viewportOnce } from "@/lib";
import { createPageMetadata } from "@/lib";

import "./not-found.scss";

export const metadata = createPageMetadata({
  title: "Page not found",
  description:
    "The page you requested could not be found on ariantika.me. Browse research, services, or contact Ariantika directly.",
  robots: {
    index: false,
    follow: false,
  },
  includeCanonical: false,
});

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="not-found">
      <motion.div
        className="not-found__container"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <Image
          src={notFoundImage}
          alt="404 - Page not found"
          className="not-found__image"
          width={1000}
          height={1000}
          priority
        />
      </motion.div>
    </main>
  );
}
