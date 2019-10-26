import path from 'path'
import { readJsonFile, writeJsonFile } from '../../utils/fs'
import { modelResponse } from '../../utils/response'

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
    return modelResponse.success({ data: employee.isActive ? employee : null })
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
    if (!name || !role) throw new Error('INVALID_INPUT_EMPLOYEE')

    const currentData = await readDataFile()
    const newId = Object.keys(currentData).length + 1
    const time = new Date().toISOString()

    // prepare new employee data
    const newData = {
      id: `PAY${String(newId).padStart(10, '0')}`,
      isActive: true,
      name: encodeURIComponent(name),
      role,
      createdAt: time,
      updatedAt: time,
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [newId]: newData })
    if (!isWritten) throw new Error('CANNOT_CREATE_NEW_EMPLOYEE')

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
    if (!id || !name || !role) throw new Error('INVALID_INPUT_EMPLOYEE')

    const currentData = await readDataFile()
    const currentEmployeeData = currentData[id]

    // validate all employee data
    if (!currentEmployeeData) throw new Error('CANNOT_FETCH_EMPLOYEE')

    // prepare updated employee data
    const newData = {
      ...currentEmployeeData,
      name,
      role,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [id]: newData })
    if (!isWritten) throw new Error('CANNOT_UPDATE_EMPLOYEE')

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
    if (!id) throw new Error('INVALID_EMPLOYEE_ID')

    const currentData = await readDataFile()
    const currentEmployeeData = currentData[id]

    // validate target employee data
    if (!currentEmployeeData) throw new Error('CANNOT_FETCH_EMPLOYEE')

    // prepare removed employee data
    const newData = {
      ...currentEmployeeData,
      isActive: false,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [id]: newData })
    if (!isWritten) throw new Error('CANNOT_REMOVE_EMPLOYEE')

    return modelResponse.success({ data: newData })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}
