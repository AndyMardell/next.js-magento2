import { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

import NextContextWithApollo from '../../interfaces/NextContextWithApollo'
import { PAGE_QUERY } from './queries'
import { Page as PageType } from './types'
import Layout from '../../components/global/Layout'
import Content from '../../components/page/Content'
import NotFound from '../../components/page/NotFound'

interface Props {
  pageData: PageType
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
    return <NotFound />
  }

  return (
    <Layout title={pageData.title}>
      <Content html={pageData.content} />
    </Layout>
  )
}

Page.getInitialProps = async ({
  apolloClient,
  query,
  res
}: NextContextWithApollo) => {
  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug

  try {
    const { data } = await apolloClient.query({
      query: PAGE_QUERY,
      variables: { identifier: slug.substr(slug.indexOf('/') + 1) }
    })

    return { pageData: data.cmsPage }
  } catch (err) {
    if (res) {
      res.statusCode = 404
      return { error: '404', ...defaultProps }
    }
  }

  return defaultProps
}

export default Page
