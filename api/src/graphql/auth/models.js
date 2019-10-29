import jwt from 'jsonwebtoken'
import { UserInputError, ApolloError } from 'apollo-server'
import { read as readEmployee } from '../employee/models'

/**
 * Generate new JSON Web Token
 * @param {string} employeeId
 * @returns {Object}
 */
export async function generate(employeeId) {
  try {
    if (!employeeId) throw new UserInputError('INVALID_EMPLOYEE_ID')

    const employee = await readEmployee(employeeId)
    // validate employee data
    if (!employee || !employee.id) throw new ApolloError('INVALID_EMPLOYEE')

    // if employee exists, then generate a token
    const token = jwt.sign({ id: employee.id, name: employee.name, role: employee.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    })
    return { token, isActive: true, payload: employee }
  } catch (error) {
    return { message: error.message, data: { isActive: false } }
  }
}

/**
 * Verify given JSON Web Token
 * @param {string} token
 * @returns {Object} modelResponse
 */
export function verify(token) {
  try {
    if (!token) throw new UserInputError('INVALID_TOKEN')
    // if the verification is failed, it will throw an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    return { token, isActive: true, payload: decoded }
  } catch (error) {
    return { message: error.message, data: { token, isActive: false } }
  }
}
