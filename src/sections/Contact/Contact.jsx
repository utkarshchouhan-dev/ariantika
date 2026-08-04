import { Contact as ContactPanel, SectionHeader } from "@/components";
import { contactHeader } from "@/data";

export default function Contact() {
  const {
    sectionHeader: { headingId, prefix, accent, subtitle },
  } = contactHeader;

  return (
    <section className="contact" id="contact" aria-labelledby={headingId}>
      <SectionHeader
        headingId={headingId}
        prefix={prefix}
        accent={accent}
        subtitle={subtitle}
      />

      <div className="contact__container">
        <ContactPanel />
      </div>
    </section>
  );
}
