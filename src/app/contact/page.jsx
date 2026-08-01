import { Contact } from "@/sections";
// import { PageHeader } from "@/components";

export default function ContactPage() {
  return (
    <>
      {/* ---- main container ---- */}
      <main id="main" tabIndex={-1} className="contact__page">
        {/* ---- page header ---- */}
        {/* <PageHeader header={header} /> */}
        {/* ---- contact section ---- */}
        <Contact />
      </main>
    </>
  );
}
