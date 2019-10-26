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
