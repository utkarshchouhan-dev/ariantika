import { SectionHeader } from "@/components";
import { servicesWhyChooseMe } from "@/data";

import "./WhyChooseMe.scss";

export default function WhyChooseMe() {
  // ---- data ----
  const {
    headingId,
    header: { prefix, accent, suffix, subtitle },
    items,
  } = servicesWhyChooseMe;

  return (
    <section className="why-choose-me" aria-labelledby={headingId}>
      {/* ---- section header ---- */}
      <SectionHeader
        headingId={headingId}
        prefix={prefix}
        accent={accent}
        suffix={suffix}
        subtitle={subtitle}
      />

      {/* ---- cards ---- */}
      <ul className="why-choose-me__grid">
        {items.map(({ title, icon: Icon }) => (
          <li key={title} className="why-choose-me__item">
            <span className="why-choose-me__icon" aria-hidden="true">
              <Icon />
            </span>
            <h3 className="why-choose-me__title">{title}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
