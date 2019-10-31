import { read, create, update, remove } from './models'
import { read as readReview } from '../review/models'
import { throwIfNotAdmin, isAdmin } from '../../utils/role'

const resolvers = {
  Query: {
    employee: async (_, { id }, { user }) => read(id || user.id) || {},
    employees: async (_src, _params, context) => throwIfNotAdmin(context) && read(),
  },
  Mutation: {
    createEmployee: async (_, { data }, context) => throwIfNotAdmin(context) && create(data),
    updateEmployee: async (_, { id, data }, context) => throwIfNotAdmin(context) && update(id, data),
    removeEmployee: async (_, { id }, context) => throwIfNotAdmin(context) && remove(id, context.user.id),
  },
  Employee: {
    reviews: async ({ id }, _, { user }) => (isAdmin(user.role) ? readReview({ revieweeId: id }) : []),
    reviewed: async ({ id }) => readReview({ reviewerId: id }),
  },
}

export default resolvers
