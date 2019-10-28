import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'

import routes from '../configs/routes'
import { getToken, setToken } from '../utils/auth'

// terminate link
const batchLink = new BatchHttpLink({
  uri: `http://localhost:4000`,
  credentials: 'same-origin',
})

// non-terminate link
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    const isAuthenticationError = graphQLErrors.some(err => err.extensions.code === 'UNAUTHENTICATED')
    // remove current token key and force re-login
    if (isAuthenticationError) {
      setToken('')
      window.location.href = routes.auth.path
    }
  }
})

const authMiddlewareLink = new ApolloLink((operation, forward) => {
  const token = getToken()
  // ||
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBBWTAwMDAwMDAwMDEiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE1NzIxNzM5NDYsImV4cCI6MTU3MjI2MDM0Nn0.5AbaUTSrCr-DcCl0nLhtwO9wnVo370f0ETG0DmRneIQ'

  if (token) {
    operation.setContext(context => ({
      ...context,
      headers: {
        ...context.headers,
        authorization: `Bearer ${token}`,
      },
    }))
  }
  return forward(operation)
})

// cache
const cache = new InMemoryCache()

// apollo-client
const client = new ApolloClient({
  link: ApolloLink.from([authMiddlewareLink, errorLink, batchLink]),
  cache,
})

export default client
