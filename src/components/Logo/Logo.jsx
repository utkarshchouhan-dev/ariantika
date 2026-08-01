import Image from "next/image";
import { Button } from "@/components";
import logoSrc from "@/assets/images/logo/primary-logo.png";

import "./Logo.scss";

export default function Logo() {
  return (
    <Button href="/" variant="link" className="logo__wrapper" aria-label="Home">
      <Image
        src={logoSrc}
        alt="Ariantika's logo"
        width={300}
        height={300}
        quality={50}
        priority
        className="logo__wrapper-image"
      />
    </Button>
  );
}
