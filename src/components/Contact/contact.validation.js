const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAIL_TYPING_ERROR_PATTERN = /@@|\.@|@\./;

export const MESSAGE_MIN_LENGTH = 50;
export const MESSAGE_MAX_LENGTH = 200;
export const NAME_MIN_LENGTH = 2;

// ---- function for getting the full name error ----
export function getFullNameError(value) {
  if (!value) {
    return "Please enter your name.";
  }

  if (value.trim().length < NAME_MIN_LENGTH) {
    return `Please enter at least <strong>${NAME_MIN_LENGTH}</strong> characters.`;
  }

  return "";
}

// ---- function for checking if the full name is valid ----
export function isFullNameValid(value) {
  return value.trim().length >= NAME_MIN_LENGTH;
}

// ---- function for getting the email error ----
export function getEmailError(value) {
  if (!value) {
    return "Please enter your email.";
  }

  if (EMAIL_TYPING_ERROR_PATTERN.test(value) || value.split("@").length > 2) {
    return "Please enter a valid email address.";
  }

  if (!EMAIL_PATTERN.test(value.trim())) {
    return "Please enter a valid email address.";
  }

  return "";
}

// ---- function for checking if the email is valid ----
export function isEmailValid(value) {
  if (!value) return false;
  if (EMAIL_TYPING_ERROR_PATTERN.test(value) || value.split("@").length > 2) {
    return false;
  }

  return EMAIL_PATTERN.test(value.trim());
}

// ---- function for getting the message error ----
export function getMessageError(value) {
  if (!value) {
    return "Please enter a message.";
  }

  if (value.length < MESSAGE_MIN_LENGTH) {
    return `Message must be at least <strong>${MESSAGE_MIN_LENGTH}</strong> characters.`;
  }

  if (value.length > MESSAGE_MAX_LENGTH) {
    return `Message must be no more than <strong>${MESSAGE_MAX_LENGTH}</strong> characters.`;
  }

  return "";
}

// ---- function for checking if the message is valid ----
export function isMessageValid(value) {
  return (
    value.length >= MESSAGE_MIN_LENGTH && value.length <= MESSAGE_MAX_LENGTH
  );
}

// ---- object for getting the field error ----
const FIELD_ERROR_GETTERS = {
  fullName: getFullNameError,
  email: getEmailError,
  message: getMessageError,
};

// ---- function for getting the field error ----
export function getFieldError(field, value) {
  return FIELD_ERROR_GETTERS[field]?.(value) ?? "";
}

// ---- function for validating the contact form ----
export function validateContactForm(values) {
  return {
    fullName: getFullNameError(values.fullName),
    email: getEmailError(values.email),
    message: getMessageError(values.message),
  };
}
