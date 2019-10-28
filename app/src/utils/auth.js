import cookies from 'js-cookie'

/**
 * Get auth token from src
 * @returns {string}
 */
export function getToken() {
  return cookies.get(process.env.REACT_APP_TOKEN_KEY) || ''
}

/**
 * Set auth token to src
 * @param {string} [token = '']
 * @returns {string}
 */
export function setToken(token = '') {
  return cookies.set(process.env.REACT_APP_TOKEN_KEY, token)
}
