import { NextPage } from 'next'
import Head from 'next/head'
import ErrorPage from 'next/error'
import React from 'react'

import NextContextWithApollo from '../interfaces/NextContextWithApollo'
import { PAGE_QUERY } from '../gql/page/queries'
import { PageData } from '../gql/page/types'
import Layout from '../components/global/Layout'
import Content from '../components/page/Content'
import handleGqlError from '../lib/handle-gql-error'
import ErrorInterface from '../interfaces/Error'

interface Props {
  pageData?: PageData
  error?: ErrorInterface
}

const Page: NextPage<Props> = ({ error, pageData }) => {
  if (!error && pageData) {
    return (
      <Layout>
        <Head>
          <title>{pageData.meta_title || ''}</title>
          <meta name='description' content={pageData.meta_description || ''} />
        </Head>
        <Content pageData={pageData} />
      </Layout>
    )
  }

  return <ErrorPage statusCode={error ? error.status : 500} />
}

Page.getInitialProps = async ({
  apolloClient,
  query,
  res
}: NextContextWithApollo) => {
  const slug = Array.isArray(query.page) ? query.page[0] : query.page

  try {
    const { data } = await apolloClient.query({
      query: PAGE_QUERY,
      variables: { identifier: slug.substr(slug.indexOf('/') + 1) }
    })

    return { pageData: data.cmsPage }
  } catch (err) {
    return { error: handleGqlError({ err, res }) }
  }
}

export default Page
