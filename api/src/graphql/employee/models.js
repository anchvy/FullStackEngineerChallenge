import { UserInputError, ApolloError } from 'apollo-server'

import Employees from '../../db/employees'
import { generateNewId } from '../../utils/model'
import { mapDataloaderResult } from '../../utils/dataloader'

const DEFAULT_QUERY = { isActive: true }

/**
 * Get employee data with/without budffered ids
 * @param {string[]} ids
 * @returns {Object[]}
 *
 * __APPLIED WITH DATALOADER__
 */
export async function readWithDataloader(ids) {
  // :dataloader
  // need to response as array and require the same array lenght with args (ids)
  const employees = await Employees.find({ id: { $in: ids }, ...DEFAULT_QUERY })
  return mapDataloaderResult(employees, ids, 'id')
}

/**
 * Get employee da  ta with/without given id
 * @param {string} id
 * @returns {Object|Object[]}
 *
 */
export async function read(id) {
  // if id is not defined, return array of employees
  if (!id) {
    return Employees.find(DEFAULT_QUERY).sort({ id: -1 })
  }

  // if id is defined, return specific employee
  return Employees.findOne({ id, ...DEFAULT_QUERY })
}

/**
 * Create new employee with given data
 * @param {Object} options
 * @param {string} options.name
 * @param {string<ADMIN|STAFF>} options.role
 * @returns {Object} modelResponse
 */
export async function create({ name, role }) {
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
  if (!response) throw new ApolloError('CANNOT_CREATE_EMPLOYEE')

  return response
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
  if (!id || !name || !name.trim() || !role) throw new UserInputError('INVALID_INPUT_EMPLOYEE')

  // prepare updated employee data
  const updatedData = {
    name,
    role,
    updatedAt: new Date().getTime(),
  }

  // store in database
  const response = await Employees.findOneAndUpdate({ id }, updatedData, { new: true })
  if (!response) throw new ApolloError('CANNOT_UPDATE_EMPLOYEE')

  return response
}

/**
 * Remove an employee with given id
 * @param {string} id
 * @param {string} removerId
 * @returns {Object} modelResponse
 */
export async function remove(id, removerId) {
  if (!id || !removerId) throw new ApolloError('INVALID_INPUT_ID')
  if (id === removerId) throw new ApolloError('CANNOT_REMOVE_YOURSELF')

  // prepare removed employee data
  const updatedData = {
    isActive: false,
    updatedAt: new Date().getTime(),
  }

  // store in database
  const response = await Employees.findOneAndUpdate({ id }, updatedData, { new: true })
  if (!response) throw new ApolloError('CANNOT_REMOVE_EMPLOYEE')

  return response
}
