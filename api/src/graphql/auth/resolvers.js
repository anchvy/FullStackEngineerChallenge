import { verify, generate } from './models'

const resolvers = {
  Query: {
    verifyToken: (_, { token }) => {
      const { responseData } = verify(token)
      return responseData.data
    },
  },
  Mutation: {
    auth: async (_, { employeeId }) => {
      const { responseData } = await generate(employeeId)
      return responseData.data
    },
  },
  Auth: {
    username: ({ payload = {} }) => payload.name,
  },
}

export default resolvers
