import path from 'path'
import { UserInputError, ApolloError } from 'apollo-server'
import { readJsonFile, writeJsonFile } from '../../utils/fs'
import { modelResponse, generateNewId } from '../../utils/model'

const PATH_FILE = path.join(__dirname, 'data.json')
const readDataFile = () => readJsonFile(PATH_FILE)
const writeDataFile = data => writeJsonFile(PATH_FILE, data)

/**
 * Get employee data with/without given id
 * @param {string} id
 * @returns {Object} modelResponse
 */
export async function read(id) {
  try {
    const currentData = await readDataFile()

    // if id is not defined, return array of employees
    if (!id) {
      const filteredData = Object.values(currentData).filter(item => item.isActive)
      return modelResponse.success({ data: Object.values(filteredData) })
    }

    // if id is defined, return specific employee
    const employee = currentData[id]
    return modelResponse.success({ data: employee && employee.isActive ? employee : {} })
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

    const currentData = await readDataFile()
    const newId = generateNewId(currentData, 'PAY')
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
    const isWritten = await writeDataFile({ ...currentData, [newId]: newData })
    if (!isWritten) throw new ApolloError('CANNOT_CREATE_NEW_EMPLOYEE')

    return modelResponse.success({ data: newData })
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

    const currentData = await readDataFile()
    const currentEmployeeData = currentData[id]

    // validate all employee data
    if (!currentEmployeeData) throw new ApolloError('CANNOT_FETCH_EMPLOYEE')

    // prepare updated employee data
    const newData = {
      ...currentEmployeeData,
      name,
      role,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [id]: newData })
    if (!isWritten) throw new ApolloError('CANNOT_UPDATE_EMPLOYEE')

    return modelResponse.success({ data: newData })
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

    const currentData = await readDataFile()
    const currentEmployeeData = currentData[id]

    // validate target employee data
    if (!currentEmployeeData) throw new ApolloError('CANNOT_FETCH_EMPLOYEE')

    // prepare removed employee data
    const newData = {
      ...currentEmployeeData,
      isActive: false,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [id]: newData })
    if (!isWritten) throw new ApolloError('CANNOT_REMOVE_EMPLOYEE')

    return modelResponse.success({ data: newData })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}
