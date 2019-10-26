import { ApolloServer } from 'apollo-server'
import schema from './graphql/schema'

const PORT = 4000
const server = new ApolloServer({ schema })

// The `listen` method launches a web server.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
