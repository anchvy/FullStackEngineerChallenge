import { verify, generate } from './models'

const resolvers = {
  Query: {
    verifyToken: (_, { token }) => verify(token),
  },
  Mutation: {
    auth: async (_, { employeeId }) => generate(employeeId),
  },
}

export default resolvers
