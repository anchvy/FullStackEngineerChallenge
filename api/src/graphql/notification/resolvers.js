import { create, update } from './models'

const resolvers = {
  Mutation: {
    createNotification: async (_, { data }) => {
      const { responseData } = await create(data)
      return responseData.data
    },
    updateNotification: async (_, { id, data }) => {
      const { responseData } = await update(id, data)
      return responseData.data
    },
  },
}

export default resolvers
