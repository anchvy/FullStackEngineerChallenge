import { read, create, update, remove } from './models'
import { read as readReview } from '../review/models'
import { read as readNotification } from '../notification/models'

const resolvers = {
  Query: {
    employee: async (_, { id }, { user }) => {
      const { responseData } = await read(user.id || id)
      return responseData.data
    },
    employees: async () => {
      const { responseData } = await read()
      return responseData.data
    },
  },
  Mutation: {
    createEmployee: async (_, { data }) => {
      const { responseData } = await create(data)
      return responseData.data
    },
    updateEmployee: async (_, { id, data }) => {
      const { responseData } = await update(id, data)
      return responseData.data
    },
    removeEmployee: async (_, { id }) => {
      const { responseData } = await remove(id)
      return responseData.data
    },
  },
  Employee: {
    reviews: async ({ id }) => {
      const { responseData } = await readReview({ employeeId: id })
      return responseData.data
    },
    notifications: async ({ id }) => {
      const { responseData } = await readNotification({ employeeId: id })
      return responseData.data
    },
  },
}

export default resolvers
