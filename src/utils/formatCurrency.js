/**
 * Format a number as KSh currency string
 * @param {number|string} amount
 * @returns {string} e.g. "KSh 15,000"
 */
export function formatCurrency(amount) {
  return `KSh ${Number(amount).toLocaleString()}`;
}
