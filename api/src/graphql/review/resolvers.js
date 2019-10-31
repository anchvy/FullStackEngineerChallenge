import { read, create, update, remove } from './models'
import { throwIfNotAdmin } from '../../utils/role'

const resolvers = {
  Query: {
    review: async (_, { id }, context) => throwIfNotAdmin(context) && read({ reviewId: id }),
    reviews: async (_, { employeeId }, context) => throwIfNotAdmin(context) && read({ employeeId }),
  },
  Mutation: {
    createReview: async (_, { data }, context) => throwIfNotAdmin(context) && create(data),
    updateReview: async (_, { id, data }, context) => throwIfNotAdmin(context) && update(id, data),
    removeReview: async (_, { id }, context) => throwIfNotAdmin(context) && remove(id),
  },
  Review: {
    reviewer: async ({ reviewerId }, _args, { loader }) => loader.readEmployees.load(reviewerId),
    reviewee: async ({ revieweeId }, _args, { loader }) => loader.readEmployees.load(revieweeId),
  },
}

export default resolvers
