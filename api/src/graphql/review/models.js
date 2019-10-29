import { UserInputError, ApolloError } from 'apollo-server'

import Reviews from '../../db/reviews'
import { generateNewId } from '../../utils/model'

const DEFAULT_QUERY = { isActive: true }

/**
 * Get review data with/without given options
 * @param {Object} options
 * @param {string} options.employeeId - reviewee id
 * @param {string} options.reviewId
 * @returns {Object|Object[]}
 */
export async function read({ employeeId, reviewId }) {
  // if employeeId is defined, return reviews of employee
  if (employeeId) {
    return Reviews.find({ revieweeId: employeeId, ...DEFAULT_QUERY })
  }

  // if reviewId is defined, return specific review
  if (reviewId) {
    return Reviews.findOne({ id: reviewId, ...DEFAULT_QUERY })
  }

  // if employeeId is not defined, return array of reviews
  return Reviews.find(DEFAULT_QUERY)
}

/**
 * Create review with given data
 * @param {Object} options
 * @param {string} options.text
 * @param {string} options.revieweeId
 * @param {string} options.reviewerId
 * @returns {Object}
 */
export async function create({ text, revieweeId, reviewerId }) {
  if (!revieweeId || !reviewerId) throw new UserInputError('INVALID_INPUT_REVIEW')
  if (revieweeId === reviewerId) throw new UserInputError('SELF_REVIEWING_NOT_ALLOWED')

  const count = await Reviews.countDocuments()
  const newId = generateNewId(count, 'REVIEW')
  const time = new Date().toISOString()

  // prepare new review data
  const newData = {
    id: newId,
    isActive: true,
    text: text ? encodeURIComponent(text) : '',
    revieweeId,
    reviewerId,
    createdAt: time,
    updatedAt: time,
  }

  // store in database
  const response = await Reviews.findOneAndUpdate({ id: newId }, newData, { upsert: true, new: true })
  if (!response) throw new ApolloError('CANNOT_CREATE_REVIEW')
  return response
}

/**
 * Update a review with given data
 * @param {string} id
 * @param {Object} options
 * @param {string} options.text
 * @returns {Object}
 */
export async function update(id, { text }) {
  if (!id || !text) throw new UserInputError('INVALID_INPUT_REVIEW')

  // prepare updated review data
  const updatedData = {
    text,
    updatedAt: new Date().getTime(),
  }

  // store in database
  const response = await Reviews.findOneAndUpdate({ id }, updatedData, { new: true })
  if (!response) throw new ApolloError('CANNOT_UPDATE_REVIEW')
  return response
}

/**
 * Remove an review with given id
 * @param {string} id
 * @returns {Object}
 */
export async function remove(id) {
  if (!id) throw new UserInputError('INVALID_REVIEW_ID')

  // prepare removed employee data
  const updatedData = {
    isActive: false,
    updatedAt: new Date().getTime(),
  }

  // store in database
  const response = await Reviews.findOneAndUpdate({ id }, updatedData, { new: true })
  if (!response) throw new ApolloError('CANNOT_REMOVE_REVIEW')
  return response
}
