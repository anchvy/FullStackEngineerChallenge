import fs from 'fs'
import util from 'util'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

/**
 * Check whether the given data is valid JSON or not
 * @param {*} data
 * @returns {boolean}
 */
export function isValidJson(data) {
  try {
    JSON.parse(JSON.stringify(data))
    return true
  } catch (error) {
    return false
  }
}

/**
 * Read data as a JSON from given path
 * @param {string} path
 * @returns {*}
 */
export async function readJsonFile(path) {
  try {
    const data = await readFile(path)
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
}

/**
 * Write data to given path
 * @param {string} path
 * @param {*} data
 * @returns {boolean}
 */
export async function writeJsonFile(path, data) {
  try {
    if (!isValidJson(data)) return false

    await writeFile(path, JSON.stringify(data))
    return true
  } catch (error) {
    return false
  }
}
