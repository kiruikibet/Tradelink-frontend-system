/**
 * Validate registration form fields
 * @returns {string} error message or empty string if valid
 */
export function validateRegister({ password, password2 }) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (password !== password2) return "Passwords do not match.";
  return "";
}
