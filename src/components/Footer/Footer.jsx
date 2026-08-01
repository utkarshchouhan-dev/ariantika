import { footer } from "@/data";

import "./Footer.scss";

export default function Footer() {
  const {
    legal: { copyrightText, roleText },
  } = footer;

  return (
    <footer className="footer">
      <div className="footer__container">
        <small className="footer__copyright">{copyrightText}</small>
        <p className="footer__role">{roleText}</p>
      </div>
    </footer>
  );
}
