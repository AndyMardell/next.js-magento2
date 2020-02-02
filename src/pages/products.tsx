import { NextPage } from 'next'
import React from 'react'

import NextContextWithApollo from '../interfaces/NextContextWithApollo'
import { PRODUCTS_QUERY } from '../gql/products/queries'
import { Product } from '../gql/products/types'
import { PAGE_QUERY } from '../gql/page/queries'
import { PageData } from '../gql/page/types'
import Layout from '../components/global/Layout'
import Content from '../components/page/Content'
import ProductList from '../components/catalog/Products/ProductList'

interface Props {
  pageData?: PageData
  products?: {
    item_count: number
    items: Product[]
  }
  error?: string
}

const defaultProps = {
  pageData: {
    title: '',
    content: ''
  }
}

const Products: NextPage<Props> = ({ error, products, pageData }) => {
  if (error && pageData) {
    return (
      <Layout>
        <Content pageData={pageData} />
      </Layout>
    )
  }

  if (products && products.items.length) {
    return (
      <Layout>
        <ProductList products={products.items} />
      </Layout>
    )
  }

  return null
}

Products.getInitialProps = async ({
  apolloClient,
  res
}: NextContextWithApollo) => {
  try {
    const { data } = await apolloClient.query({
      query: PRODUCTS_QUERY,
      variables: { category: '2' }
    })

    return { products: data.products }
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

export default Products
