/**
 * Generate new document id
 * @param {number} currentCount
 * @param {string} prefix
 */
export function generateNewId(currentCount, prefix) {
  return `${prefix.toUpperCase()}${String(currentCount + 1).padStart(10, '0')}`
}
