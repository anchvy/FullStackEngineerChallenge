import { read, create, update, remove } from './models'

const resolvers = {
  Query: {
    review: async (_, { id }) => read({ reviewId: id }),
    reviews: async (_, { employeeId }) => read({ employeeId }),
  },
  Mutation: {
    createReview: async (_, { data }) => create(data),
    updateReview: async (_, { id, data }) => update(id, data),
    removeReview: async (_, { id }) => remove(id),
  },
  Review: {
    reviewer: async ({ reviewerId }, _args, { loader }) => loader.readEmployees.load(reviewerId),
    reviewee: async ({ revieweeId }, _args, { loader }) => loader.readEmployees.load(revieweeId),
  },
}

export default resolvers
