import { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

import NextContextWithApollo from '../../interfaces/NextContextWithApollo'
import { PAGE_QUERY } from './queries'
import { Page as PageType } from './types'
import Header from '../../components/global/Header'
import { isArray } from 'util'

interface Props {
  pageData: PageType
}

const Page: NextPage<Props> = ({ pageData }) => (
  <div>
    <Head>
      <title>{pageData.title}</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header welcome={pageData.title} />
    <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
  </div>
)

Page.getInitialProps = async ({
  apolloClient,
  query
}: NextContextWithApollo) => {
  const slug = isArray(query.slug) ? query.slug[0] : query.slug

  const { data } = await apolloClient.query({
    query: PAGE_QUERY,
    variables: { identifier: slug.substr(slug.indexOf('/') + 1) }
  })

  return { pageData: data.cmsPage }
}

export default Page
