import { validateContactForm } from "@/components";

export function getFormspreeEndpoint() {
  return process.env.FORMSPREE_FORM_URL?.trim() ?? "";
}

export function formDataToValues(formData) {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    service: String(formData.get("service") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

export async function submitContactForm(formData) {
  const endpoint = getFormspreeEndpoint();

  if (!endpoint) {
    return { ok: false, reason: "not_configured" };
  }

  if (formData.get("_gotcha")) {
    return { ok: true };
  }

  const values = formDataToValues(formData);
  const errors = validateContactForm(values);

  if (Object.values(errors).some(Boolean)) {
    return { ok: false, reason: "validation", errors };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return { ok: false, reason: "upstream" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "upstream" };
  }
}
