/**
 * Generate new document id
 * @param {number} currentCount
 * @param {string} prefix
 */
export function generateNewId(currentCount, prefix) {
  return `${prefix.toUpperCase()}${String(currentCount + 1).padStart(10, '0')}`
}

/**
 * Get model success response
 * @param {Object} [responseData = {}]
 * @returns {Object}
 */
function success(responseData = {}) {
  return { status: true, responseData }
}

/**
 * Get model failed response
 * @param {Object} [responseData = {}]
 * @returns {Object}
 */
function fail(responseData = {}) {
  return { status: false, responseData }
}

export const modelResponse = { success, fail }
