import { banner } from "@/data";

import "./Banner.scss";

export default function Banner() {
  // ---- data ----
  const {
    items,
    marquee: { repeatCount },
    separator: { icon: SeparatorIcon },
  } = banner;

  const repeatedItems = Array.from({ length: repeatCount }, () => items).flat();

  return (
    <section className="banner" aria-hidden="true">
      <div className="banner__surface">
        <div className="banner__track">
          {["a", "b"].map((prefix) => (
            <ul key={prefix} className="banner__items">
              {repeatedItems.map((item, itemIndex) => (
                <li
                  className="banner__item"
                  key={`${prefix}-${item}-${itemIndex}`}
                >
                  <span className="banner__label">{item}</span>
                  <span className="banner__separator">
                    <SeparatorIcon />
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
