import { NextPage } from 'next'
import React from 'react'

import NextContextWithApollo from '../../interfaces/NextContextWithApollo'
import { HOME_QUERY } from './queries'
import { Config, PageData } from './types'
import Layout from '../../components/global/Layout'
import NotFound from '../../components/page/NotFound'

interface Props {
  pageData: PageData
  storeConfig?: Config
  error?: string
}

const defaultProps = {
  pageData: {
    title: '',
    content: ''
  }
}

const Home: NextPage<Props> = ({ error, storeConfig, pageData }) => {
  if (error) {
    return <NotFound pageData={pageData} />
  }

  return (
    <Layout
      title={pageData.meta_title}
      welcome={storeConfig ? storeConfig.welcome : ''}
    >
      <div>{storeConfig ? storeConfig.welcome : ''}</div>
      <h1>{pageData.content_heading}</h1>
    </Layout>
  )
}

Home.getInitialProps = async ({ apolloClient, res }: NextContextWithApollo) => {
  try {
    const { data } = await apolloClient.query({
      query: HOME_QUERY,
      variables: { identifier: 'home' }
    })

    return { storeConfig: data.storeConfig, pageData: data.cmsPage }
  } catch (err) {
    const { data } = await apolloClient.query({
      query: HOME_QUERY,
      variables: { identifier: 'no-route' }
    })

    if (res) {
      res.statusCode = 404
      return { error: '404', pageData: data.cmsPage }
    }
  }

  return defaultProps
}

export default Home
