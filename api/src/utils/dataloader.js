/**
 * Map response by key
 * @param {Object[]} response - Mongo (Model.find) response
 * @param {string[]} refKeysArray - Args for query
 * @param {string} refKeyName - eg. id
 * @returns {Object[]} Sorted result array
 */
export function mapDataloaderResult(response, refKeysArray, refKeyName) {
  const mappedResponse = response.reduce((result, item) => ({ ...result, [item[refKeyName]]: item }), {})
  return refKeysArray.map(key => mappedResponse[key])
}
