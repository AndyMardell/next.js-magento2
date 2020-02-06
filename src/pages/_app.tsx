import App from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks'

import GlobalStyle from '../styles/global'
import withData from '../lib/apollo-client'
import AppPropsWithApollo from '../interfaces/AppPropsWithApollo'
import { ContextProvider } from '../context'

class MyApp extends App<AppPropsWithApollo> {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <ContextProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ContextProvider>
      </ApolloProvider>
    )
  }
}

export default withData(MyApp)
