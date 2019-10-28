import { UserInputError, ApolloError } from 'apollo-server'

import Employees from '../../db/employees'
import { modelResponse, generateNewId } from '../../utils/model'

/**
 * Get employee data with/without given id
 * @param {string} id
 * @returns {Object} modelResponse
 */
export async function read(id) {
  try {
    const defaultQuery = { isActive: true }

    // if id is not defined, return array of employees
    if (!id) {
      const allEmployee = await Employees.find(defaultQuery)
      return modelResponse.success({ data: allEmployee })
    }

    // if id is defined, return specific employee
    const employee = await Employees.findOne({ id, ...defaultQuery })
    return modelResponse.success({ data: employee })
  } catch (error) {
    return modelResponse.fail({ message: error.message, data: id ? {} : [] })
  }
}

/**
 * Create new employee with given data
 * @param {Object} options
 * @param {string} options.name
 * @param {string<ADMIN|STAFF>} options.role
 * @returns {Object} modelResponse
 */
export async function create({ name, role }) {
  try {
    if (!name || !role) throw new UserInputError('INVALID_INPUT_EMPLOYEE')

    const count = await Employees.countDocuments()
    const newId = generateNewId(count, 'PAY')
    const time = new Date().toISOString()

    // prepare new employee data
    const newData = {
      id: newId,
      isActive: true,
      name: encodeURIComponent(name),
      role,
      createdAt: time,
      updatedAt: time,
    }

    // store in database
    const response = await Employees.findOneAndUpdate({ id: newId }, newData, { upsert: true, new: true })
    return modelResponse.success({ data: response })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}

/**
 * Update an employee with given data
 * @param {string} id
 * @param {Object} options
 * @param {string} options.name
 * @param {ADMIN|STAFF} options.role
 * @returns {Object} modelResponse
 */
export async function update(id, { name, role }) {
  try {
    if (!id || !name || !role) throw new UserInputError('INVALID_INPUT_EMPLOYEE')

    // prepare updated employee data
    const updatedData = {
      name,
      role,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const response = await Employees.findOneAndUpdate({ id }, updatedData, { new: true })
    return modelResponse.success({ data: response })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}

/**
 * Remove an employee with given id
 * @param {string} id
 * @returns {Object} modelResponse
 */
export async function remove(id) {
  try {
    if (!id) throw new ApolloError('INVALID_EMPLOYEE_ID')

    // prepare removed employee data
    const updatedData = {
      isActive: false,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const response = await Employees.findOneAndUpdate({ id }, updatedData, { new: true })
    return modelResponse.success({ data: response })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}
