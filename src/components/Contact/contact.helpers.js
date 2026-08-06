// ---- function for getting the field state ----
export function getFieldState({ error, isValid, blurred, value }) {
  if (error && blurred) return "invalid";
  if (isValid && blurred) return "valid-blurred";
  if (isValid && value) return "valid";
  return "idle";
}

// ---- function for formatting the error message ----
const STRONG_TAG_PATTERN = /(<strong>.*?<\/strong>)/;

// ---- function for formatting the error message ----
export function formatErrorMessage(message) {
  if (!message || !STRONG_TAG_PATTERN.test(message)) {
    return message;
  }

  return message.split(STRONG_TAG_PATTERN).map((part, index) => {
    if (part.startsWith("<strong>")) {
      return <strong key={index}>{part.slice(8, -9)}</strong>;
    }

    return part;
  });
}
