import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import ErrorPage from 'next/error'

import NextContextWithApollo from '../interfaces/NextContextWithApollo'
import { HOME_QUERY } from '../gql/home/queries'
import { PageData } from '../gql/home/types'
import Layout from '../components/global/Layout'
import Content from '../components/page/Content'
import handleGqlError from '../lib/handle-gql-error'
import ErrorInterface from '../interfaces/Error'

interface Props {
  pageData?: PageData
  error?: ErrorInterface
}

const Home: NextPage<Props> = ({ error, pageData }) => {
  if (!error && pageData) {
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

  return <ErrorPage statusCode={error ? error.status : 500} />
}

Home.getInitialProps = async ({ apolloClient, res }: NextContextWithApollo) => {
  try {
    const { data } = await apolloClient.query({
      query: HOME_QUERY,
      variables: { identifier: 'home' }
    })

    return { pageData: data.cmsPage }
  } catch (err) {
    return { error: handleGqlError({ err, res }) }
  }
}

export default Home
