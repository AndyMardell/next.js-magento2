import { NextPage } from 'next'
import React from 'react'

import NextContextWithApollo from '../interfaces/NextContextWithApollo'
import { PAGE_QUERY } from '../gql/page/queries'
import { PageData } from '../gql/page/types'
import Layout from '../components/global/Layout'
import Content from '../components/page/Content'
import Head from 'next/head'

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

const Page: NextPage<Props> = ({ error, pageData }) => {
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
        <title>{pageData.meta_title}</title>
        <meta name='description' content={pageData.meta_description} />
      </Head>
      <Content pageData={pageData} />
    </Layout>
  )
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
    const { data } = await apolloClient.query({
      query: PAGE_QUERY,
      variables: { identifier: 'no-route' }
    })

    if (res) {
      res.statusCode = 404
      return { error: '404', pageData: data.cmsPage }
    }
  }

  return defaultProps
}

export default Page
