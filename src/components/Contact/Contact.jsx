"use client";

import { SocialLinks } from "@/components";
import ContactForm from "./ContactForm";

import "./Contact.scss";

export default function Contact({ className = "" }) {
  return (
    <div className={`contact__panel ${className}`.trim()}>
      {/* ---- contact form ---- */}
      <ContactForm />

      {/* ---- social links ---- */}
      <SocialLinks direction="horizontal" className="contact__social" />
    </div>
  );
}
