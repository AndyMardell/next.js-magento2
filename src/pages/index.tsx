import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import NextContextWithApollo from '../interfaces/NextContextWithApollo'
import { CONFIG_QUERY, HOME_QUERY } from '../gql/home/queries'
import { PageData } from '../gql/home/types'
import Layout from '../components/global/Layout'
import Content from '../components/page/Content'

interface Props {
  pageData: PageData
  error?: string
}

const defaultProps = {
  pageData: {
    title: '',
    content: ''
  }
}

const Home: NextPage<Props> = ({ error, pageData }) => {
  if (error) {
    return (
      <Layout>
        <Content pageData={pageData} />
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{pageData.meta_title || ''}</title>
        <meta name='description' content={pageData.meta_description} />
      </Head>
      <Content pageData={pageData} />
    </Layout>
  )
}

Home.getInitialProps = async ({ apolloClient, res }: NextContextWithApollo) => {
  let config = {
    cms_home_page: 'home',
    cms_no_route: 'no-route'
  }

  try {
    const { data: configData } = await apolloClient.query({
      query: CONFIG_QUERY
    })

    config = {
      ...configData.storeConfig
    }

    const { data } = await apolloClient.query({
      query: HOME_QUERY,
      variables: { identifier: config.cms_home_page }
    })

    return { pageData: data.cmsPage }
  } catch (err) {
    const { data } = await apolloClient.query({
      query: HOME_QUERY,
      variables: { identifier: config.cms_no_route }
    })

    if (res) {
      res.statusCode = 404
      return { error: '404', pageData: data.cmsPage }
    }
  }

  return defaultProps
}

export default Home
