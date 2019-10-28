import { UserInputError } from 'apollo-server'

import Reviews from '../../db/reviews'
import { modelResponse, generateNewId } from '../../utils/model'

/**
 * Get review data with/without given options
 * @param {Object} options
 * @param {string} options.employeeId - reviewee id
 * @param {string} options.reviewId
 * @returns {Object} modelResponse
 */
export async function read({ employeeId, reviewId }) {
  try {
    const defaultQuery = { isActive: true }

    // if employeeId is defined, return reviews of employee
    if (employeeId) {
      const employeeReviews = await Reviews.find({ revieweeId: employeeId, ...defaultQuery })
      return modelResponse.success({ data: employeeReviews })
    }

    // if reviewId is defined, return specific review
    if (reviewId) {
      const review = await Reviews.findOne({ id: reviewId, ...defaultQuery })
      return modelResponse.success({ data: review })
    }

    // if employeeId is not defined, return array of reviews
    const reviews = await Reviews.find(defaultQuery)
    return modelResponse.success({ data: reviews })
  } catch (error) {
    return modelResponse.fail({ message: error.message, data: reviewId ? {} : [] })
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
    if (!revieweeId || !reviewerId) throw new UserInputError('INVALID_INPUT_REVIEW')

    const count = await Reviews.countDocuments()
    const newId = generateNewId(count, 'REVIEW')
    const time = new Date().toISOString()

    // prepare new review data
    const newData = {
      id: newId,
      isActive: true,
      text: text ? encodeURIComponent(text) : '',
      score,
      revieweeId,
      reviewerId,
      createdAt: time,
      updatedAt: time,
    }

    // store in database
    const response = await Reviews.findOneAndUpdate({ id: newId }, newData, { upsert: true, new: true })
    return modelResponse.success({ data: response })
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
    if (!id || !score) throw new UserInputError('INVALID_INPUT_REVIEW')

    // prepare updated review data
    const updatedData = {
      score,
      text,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const response = await Reviews.findOneAndUpdate({ id }, updatedData, { new: true })
    return modelResponse.success({ data: response })
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
    if (!id) throw new UserInputError('INVALID_REVIEW_ID')

    // prepare removed employee data
    const updatedData = {
      isActive: false,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const response = await Reviews.findOneAndUpdate({ id }, updatedData, { new: true })
    return modelResponse.success({ data: response })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}
