import * as motion from "motion/react-client";
import { SectionHeader } from "@/components";
import { servicesWhyChooseMe } from "@/data";
import { stagger } from "@/lib";

import "./WhyChooseMe.scss";

export default function WhyChooseMe() {
  const {
    headingId,
    header: { prefix, accent, suffix, subtitle },
    items,
  } = servicesWhyChooseMe;

  return (
    <section className="why-choose-me" aria-labelledby={headingId}>
      <SectionHeader
        headingId={headingId}
        prefix={prefix}
        accent={accent}
        suffix={suffix}
        subtitle={subtitle}
      />

      <motion.ul className="why-choose-me__grid" variants={stagger}>
        {items.map(({ title, icon: Icon }, index) => (
          <motion.li
            key={title}
            className="why-choose-me__item"
            custom={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <span className="why-choose-me__icon" aria-hidden="true">
              <Icon />
            </span>
            <h3 className="why-choose-me__title">{title}</h3>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
