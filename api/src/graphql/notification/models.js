import path from 'path'
import { readJsonFile, writeJsonFile } from '../../utils/fs'
import { modelResponse } from '../../utils/response'

const PATH_FILE = path.join(__dirname, 'data.json')
const readDataFile = () => readJsonFile(PATH_FILE)
const writeDataFile = data => writeJsonFile(PATH_FILE, data)

/**
 * Get notification data with/without given options
 * @param {Object} options
 * @param {string} options.employeeId
 * @param {string} options.notificationId
 * @returns {Object} modelResponse
 */
export async function read({ employeeId, notificationId }) {
  try {
    const currentData = await readDataFile()
    const filteredData = currentData.filter(item => item.isActive)
    const filteredDataArr = Object.values(filteredData)

    // if employeeId is defined, return notifications of employee
    if (employeeId) {
      const employeeNotifications = filteredDataArr.filter(item => item.employeeId === employeeId)
      return modelResponse.success({ data: employeeNotifications })
    }

    // if notificationId is defined, return specific notification
    if (notificationId) {
      const notification = currentData[notificationId]
      return modelResponse.success({ data: notification.isActive ? notification : null })
    }

    // if employeeId is not defined, return array of notifications
    return modelResponse.success({ data: filteredDataArr })
  } catch (error) {
    return modelResponse.fail({ message: error.message, data: [] })
  }
}

/**
 * Create notification with given data
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.description
 * @param {string<NOTIFICATION>} options.type
 * @returns {Object} modelResponse
 */
export async function create({ title, description, type }) {
  try {
    if (!type || !title || !description) throw new Error('INVALID_INPUT_NOTIFICATION')

    const currentData = await readDataFile()
    const newId = Object.keys(currentData).length + 1
    const time = new Date().toISOString()

    // prepare new notification data
    const newData = {
      id: `NOTIFICATION${String(newId).padStart(10, '0')}`,
      isActive: true,
      title: encodeURIComponent(title),
      description: encodeURIComponent(title),
      type,
      createdAt: time,
      updatedAt: time,
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [newId]: newData })
    if (!isWritten) throw new Error('CANNOT_CREATE_NEW_NOTIFICATION')

    return modelResponse.success({ data: newData })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}

/**
 * Update a notification with given data
 * @param {string} id
 * @param {Object} options
 * @param {boolean} options.isActive
 * @returns {Object} modelResponse
 */
export async function update(id, { isActive }) {
  try {
    if (isActive === undefined) throw new Error('INVALID_INPUT_NOTIFICATION')

    const currentData = await readDataFile()
    const currentNotificationData = currentData[id]

    // validate all notification data
    if (!currentNotificationData) throw new Error('CANNOT_FETCH_NOTIFICATION')

    // prepare updated notification data
    const newData = {
      ...currentNotificationData,
      isActive,
      updatedAt: new Date().getTime(),
    }

    // store in database
    const isWritten = await writeDataFile({ ...currentData, [id]: newData })
    if (!isWritten) throw new Error('CANNOT_UPDATE_NOTIFICATION')

    return modelResponse.success({ data: newData })
  } catch (error) {
    return modelResponse.fail({ message: error.message })
  }
}
