import 'dotenv/config'
import { ApolloServer, AuthenticationError } from 'apollo-server'
import { verify } from './graphql/auth/models'
import schema from './graphql/schema'

const AUTH_OPERATIONS_NAME = ['Auth', 'VerifyToken']
const PORT = 4000
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    let user = {}
    const requestOperations = Array.isArray(req.body) ? req.body : [req.body]
    const isAuthRequest = requestOperations.every(operation => AUTH_OPERATIONS_NAME.includes(operation.operationName))

    // prevent validate user in case of auth request
    if (!isAuthRequest) {
      const { authorization = '' } = req.headers
      const { status, responseData } = verify(authorization.split(' ')[1])
      // validate user login
      if (!status) throw new AuthenticationError('REQUIRED_LOGIN')
      // set current user to context
      user = responseData.data.payload
    }

    return {
      user,
    }
  },
})

// The `listen` method launches a web server.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
