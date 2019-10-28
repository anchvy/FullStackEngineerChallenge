import React from 'react'

import { ApolloProvider } from '@apollo/react-hooks'
import client from './libs/initApollo'

import GlobalStyle from './components/GlobalStyle'
import Main from './containers/main'

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Main />
  </ApolloProvider>
)

export default App
