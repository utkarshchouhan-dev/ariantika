import { Contact, PageHeader } from "@/components";
import { contactHeader, contactMetadata } from "@/data";

export const metadata = contactMetadata;

export default function ContactPage() {
  return (
    <main id="main" tabIndex={-1} className="contact__page">
      <PageHeader header={contactHeader.pageHeader} />

      <div className="contact__container contact__container--page">
        <Contact priority />
      </div>
    </main>
  );
}
