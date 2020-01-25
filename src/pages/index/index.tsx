import { NextPage } from 'next'
import React from 'react'

import NextContextWithApollo from '../../interfaces/NextContextWithApollo'
import { CONFIG_QUERY } from './queries'
import { Config } from './types'
import Layout from '../../components/global/Layout'

interface Props {
  storeConfig: Config
}

const Home: NextPage<Props> = ({ storeConfig }) => (
  <Layout title={storeConfig.welcome}>Content</Layout>
)

Home.getInitialProps = async ({ apolloClient }: NextContextWithApollo) => {
  const { data } = await apolloClient.query({ query: CONFIG_QUERY })

  return { storeConfig: data.storeConfig }
}

export default Home
