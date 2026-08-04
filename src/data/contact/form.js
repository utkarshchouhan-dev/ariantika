import { FaCheck } from "react-icons/fa6";
import { PiCaretDownBold, PiPaperPlaneTiltBold } from "react-icons/pi";
import { servicesSource } from "../services/services";

export const contactForm = {
  submitLabel: "Send",
  sendingLabel: "Sending...",
  successMessage: "Your message has been sent.",
  errorMessage: "Something went wrong. Please try again.",
  notConfiguredMessage:
    "The form is not connected yet. Add the Formspree URL to continue.",
  servicePlaceholder: "Select a service (optional)",
  serviceOtherLabel: "Other",
  checkIcon: FaCheck,
  selectCaretIcon: PiCaretDownBold,
  submitIcon: PiPaperPlaneTiltBold,
};

export function getContactServiceOptions() {
  return [
    ...servicesSource.servicesPage.map((service) => ({
      value: service.id,
      label: service.title,
    })),
    { value: "other", label: contactForm.serviceOtherLabel },
  ];
}
