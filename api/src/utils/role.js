import { ApolloError } from 'apollo-server'

/**
 * Define whether the given data is ADMIN or not
 * @param {string} role
 * @returns {boolean}
 */
export const isAdmin = role => role === 'ADMIN'
/**
 * Check admin permission
 * @param {Object} context - resolver context
 * @returns {boolean}
 */
export const throwIfNotAdmin = context => {
  if (!isAdmin(context.user.role)) throw new ApolloError('REQUIRED_ADMIN_PERMISSION')
  return true
}
