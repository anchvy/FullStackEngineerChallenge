import jwt from 'jsonwebtoken'
import { UserInputError, ApolloError } from 'apollo-server'
import { read as readEmployee } from '../employee/models'
import { modelResponse } from '../../utils/model'

/**
 * Generate new JSON Web Token
 * @param {string} employeeId
 * @returns {Object} modelResponse
 */
export async function generate(employeeId) {
  try {
    if (!employeeId) throw new UserInputError('INVALID_EMPLOYEE_ID')

    const {
      responseData: { data },
    } = await readEmployee(employeeId)

    // validate employee data
    if (!data.id) throw new ApolloError('INVALID_EMPLOYEE')

    // if employee exists, then generate a token
    const token = jwt.sign({ id: data.id, name: data.name, role: data.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    })
    return modelResponse.success({ data: { token, isActive: true, payload: data } })
  } catch (error) {
    return modelResponse.fail({ data: { message: error.message } })
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
    return modelResponse.success({ data: { token, isActive: true, payload: decoded } })
  } catch (error) {
    return modelResponse.fail({ data: { token, isActive: false, message: error.message } })
  }
}
