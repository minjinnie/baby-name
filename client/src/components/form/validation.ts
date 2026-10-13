const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns an error message for an invalid email address, or undefined if it's fine. */
export function validateEmail(email: string): string | undefined {
  const value = email.trim();
  if (!value) {
    return "Please enter your email address.";
  }
  if (!EMAIL_PATTERN.test(value)) {
    return "Please enter a valid email address.";
  }
  return undefined;
}

export const NETWORK_ERROR_MESSAGE = "Unable to reach the server. Check your connection and try again.";
