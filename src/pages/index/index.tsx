import { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

import NextContextWithApollo from '../../interfaces/NextContextWithApollo'
import { CONFIG_QUERY } from './queries'
import { Config } from './types'
import Header from '../../components/global/Header'

interface Props {
  storeConfig: Config
}

const Home: NextPage<Props> = ({ storeConfig }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header welcome={storeConfig.welcome} />
  </div>
)

Home.getInitialProps = async ({ apolloClient }: NextContextWithApollo) => {
  const { data } = await apolloClient.query({ query: CONFIG_QUERY })

  return { storeConfig: data.storeConfig }
}

export default Home
