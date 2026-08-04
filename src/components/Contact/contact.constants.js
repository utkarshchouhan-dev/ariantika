// ==== endpoint for the formspee form ====
export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_URL?.trim();

// ==== initial values for the contact form ====
export const INITIAL_VALUES = {
  fullName: "",
  email: "",
  service: "",
  message: "",
};

// ==== required fields for the contact form ====
export const REQUIRED_FIELDS = ["fullName", "email", "message"];
