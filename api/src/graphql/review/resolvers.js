import { read, create, update, remove } from './models'

const resolvers = {
  Query: {
    review: async (_, { id }) => {
      const { responseData } = await read({ reviewId: id })
      return responseData.data
    },
    reviews: async (_, { employeeId }) => {
      const { responseData } = await read({ employeeId })
      return responseData.data
    },
  },
  Mutation: {
    createReview: async (_, { data }) => {
      const { responseData } = await create(data)
      return responseData.data
    },
    updateReview: async (_, { id, data }) => {
      const { responseData } = await update(id, data)
      return responseData.data
    },
    removeReview: async (_, { id }) => {
      const { responseData } = await remove(id)
      return responseData.data
    },
  },
}

export default resolvers
