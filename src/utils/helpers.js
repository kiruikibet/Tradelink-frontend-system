/**
 * Capitalize the first letter of a word
 */
export function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Get initials from a name or username
 */
export function getInitial(name) {
  return name?.charAt(0).toUpperCase() ?? "?";
}
