import path from 'path'
import { readJsonFile, writeJsonFile } from '../../utils/fs'
import { modelResponse } from '../../utils/response'

const PATH_FILE = path.join(__dirname, 'data.json')
const readDataFile = () => readJsonFile(PATH_FILE)
const writeDataFile = data => writeJsonFile(PATH_FILE, data)

/**
 * Get review data with/without given options
 * @param {Object} options
 * @param {string} options.employeeId - reviewee id
 * @param {string} options.reviewId
 * @returns {Object} modelResponse
 */
export async function read({ employeeId, reviewId }) {
  try {
    const currentData = await readDataFile()
    const filteredData = currentData.filter(item => item.isActive)
    const filteredDataArr = Object.values(filteredData)

    // if employeeId is defined, return reviews of employee
    if (employeeId) {
      const employeeReviews = filteredDataArr.filter(review => review.revieweeId === employeeId)
      return modelResponse.success({ data: employeeReviews })
    }

    // if reviewId is defined, return specific review
    if (reviewId) {
      const review = currentData[reviewId]
      return modelResponse.success({ data: review.isActive ? review : null })
    }

    // if employeeId is not defined, return array of reviews
    return modelResponse.success({ data: filteredDataArr })
  } catch (error) {
    return modelResponse.fail({ message: error.message, data: [] })
  }
}

/**
 * Create review with given data
 * @param {Object} options
 * @param {number} options.score
 * @param {string} options.text
 * @param {string} options.revieweeId
 * @param {string} options.reviewerId
 * @returns {Object} modelResponse
 */
export async function create({ score, text, revieweeId, reviewerId }) {
  try {
    if (!revieweeId || !reviewerId) throw new Error('INVALID_INPUT_REVIEW')

    const currentData = await readDataFile()
    const newId = Object.keys(currentData).length + 1
    const time = new Date().toISOString()

    // prepare new review data
    const newData = {
      id: `REVIEW${String(newId).padStart(10, '0')}`,
      isActive: true,
      text: text ? encodeURIComponent(text) : '',
      score,
      revieweeId,
      reviewerId,
      createdAt: time,
      updatedAt: time,
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [newId]: newData })
    if (!isWritten) throw new Error('CANNOT_CREATE_NEW_REVIEW')

    return modelResponse.success({ data: newData })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}

/**
 * Update a review with given data
 * @param {string} id
 * @param {Object} options
 * @param {number} options.score
 * @param {string} options.text
 * @returns {Object} modelResponse
 */
export async function update(id, { score, text }) {
  try {
    if (!id || !score) throw new Error('INVALID_INPUT_REVIEW')

    const currentData = await readDataFile()
    const currentReviewData = currentData[id]

    // validate all review data
    if (!currentReviewData) throw new Error('CANNOT_FETCH_REVIEW')

    // prepare updated review data
    const newData = {
      ...currentReviewData,
      score,
      text,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [id]: newData })
    if (!isWritten) throw new Error('CANNOT_UPDATE_REVIEW')

    return modelResponse.success({ data: newData })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}

/**
 * Remove an review with given id
 * @param {string} id
 * @returns {Object} modelResponse
 */
export async function remove(id) {
  try {
    if (!id) throw new Error('INVALID_REVIEW_ID')

    const currentData = await readDataFile()
    const currentReviewData = currentData[id]

    // validate target review data
    if (!currentReviewData) throw new Error('CANNOT_FETCH_REVIEW')

    // prepare removed review data
    const newData = {
      ...currentReviewData,
      isActive: false,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [id]: newData })
    if (!isWritten) throw new Error('CANNOT_REMOVE_REVIEW')

    return modelResponse.success({ data: newData })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}
