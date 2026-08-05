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
        width={110}
        height={110}
        priority
        sizes="(max-width: 768px) 80px, 110px"
        quality={75}
        className="logo__wrapper-image"
      />
    </Button>
  );
}
