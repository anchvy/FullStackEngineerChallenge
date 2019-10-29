/**
 * Parse GraphQLErrors response
 * @param {*} errors
 * @returns {string}
 */
export function parseErrorString(errors) {
  try {
    return errors.message
  } catch (error) {
    return 'SOMETHING_WENT_WRONG'
  }
}
