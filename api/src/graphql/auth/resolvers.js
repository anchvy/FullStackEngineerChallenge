import { verify, generate } from './models'

const resolvers = {
  Mutation: {
    auth: async (_, { employeeId }) => {
      const { responseData } = await generate(employeeId)
      return responseData.data
    },
    verifyToken: (_, { token }) => {
      const { responseData } = verify(token)
      return responseData.data
    },
  },
}

export default resolvers
