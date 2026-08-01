import {
  FaRegUser,
  FaRegEnvelope,
  FaRegMessage,
  FaStarOfLife,
  FaChevronDown,
} from "react-icons/fa6";

import { servicesSource } from "../services/source";

// ---- contact form fields source ----
export const contactFormFields = [
  {
    name: "fullName",
    label: "your full name",
    icon: FaRegUser,
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "your email",
    icon: FaRegEnvelope,
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "service",
    label: "select a service",
    icon: FaChevronDown,
    type: "select",
    optionsGroupLabel: "Select a service",
    required: false,
    options: [
      ...servicesSource.map((service) => ({
        value: service.id,
        label: service.title,
      })),
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "message",
    label: "message",
    icon: FaRegMessage,
    type: "textarea",
    required: true,
  },
];

// ---- contact form config ----
export const contactForm = {
  submitLabel: "Send Message",
  sendingLabel: "Sending...",
  successMessage: "Sent",
  errorMessage: "Something went wrong. Please try again.",
  notConfiguredMessage:
    "The form is not connected yet. Add the Formspree URL to continue.",
  requireIcon: <FaStarOfLife />,
  fields: contactFormFields,
};
