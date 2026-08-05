"use client";

import { SocialLinks } from "@/components";
import ContactForm from "./ContactForm";

import "./Contact.scss";

export default function Contact({ className = "", priority = false }) {
  return (
    <div className={`contact__panel ${className}`.trim()}>
      <ContactForm priority={priority} />
      <SocialLinks direction="horizontal" className="contact__social" />
    </div>
  );
}
