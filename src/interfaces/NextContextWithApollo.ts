import { ApolloClient } from 'apollo-client'
import { NextPageContext } from 'next'

interface NextContextWithApollo extends NextPageContext {
  apolloClient: ApolloClient<any>
}

export default NextContextWithApollo
