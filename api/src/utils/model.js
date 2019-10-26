/**
 * Generate new document id
 * @param {Object<*>} currentData
 * @param {string} prefix
 */
export function generateNewId(currentData, prefix) {
  return `${prefix.toUpperCase()}${String(Object.keys(currentData).length + 1).padStart(10, '0')}`
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
