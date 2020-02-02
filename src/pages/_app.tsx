import { ApolloProvider } from '@apollo/react-hooks'
import GlobalStyle from '../styles/global'
import withData from '../lib/apollo-client'
import AppPropsWithApollo from '../interfaces/AppPropsWithApollo'
import App from 'next/app'

class MyApp extends App<AppPropsWithApollo> {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

export default withData(MyApp)
