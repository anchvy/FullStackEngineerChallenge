import 'dotenv/config'
import { ApolloServer, AuthenticationError } from 'apollo-server'
import { verify } from './graphql/auth/models'
import schema from './graphql/schema'

const PORT = 4000
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const { operationName } = req.body
    let user = {}

    // prevent validate user in case of auth request
    if (operationName !== 'Auth') {
      const { authentication = '' } = req.headers
      const { status, responseData } = verify(authentication.split(' ')[1])
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
