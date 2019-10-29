import { read, create, update, remove } from './models'
import { read as readReview } from '../review/models'

const resolvers = {
  Query: {
    employee: async (_, { id }, { user }) => read(user.id || id) || {},
    employees: async () => read(),
  },
  Mutation: {
    createEmployee: async (_, { data }) => create(data),
    updateEmployee: async (_, { id, data }) => update(id, data),
    removeEmployee: async (_, { id }) => remove(id),
  },
  Employee: {
    reviews: async ({ id }) => readReview({ reviewerId: id }),
  },
}

export default resolvers
