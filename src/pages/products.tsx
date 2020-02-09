import { NextPage } from 'next'
import React from 'react'
import ErrorPage from 'next/error'

import NextContextWithApollo from '../interfaces/NextContextWithApollo'
import { PRODUCTS_QUERY } from '../gql/products/queries'
import { CatalogProduct } from '../gql/products/types'
import { PageData } from '../gql/page/types'
import Layout from '../components/global/Layout'
import ProductList from '../components/catalog/Products/ProductList'
import handleGqlError from '../lib/handle-gql-error'
import ErrorInterface from '../interfaces/Error'

interface Props {
  pageData?: PageData
  products?: {
    item_count: number
    items: CatalogProduct[]
  }
  error?: ErrorInterface
}

const Products: NextPage<Props> = ({ error, products }) => {
  if (!error && products && products.items.length) {
    return (
      <Layout>
        <ProductList products={products.items} />
      </Layout>
    )
  }

  return <ErrorPage statusCode={error ? error.status : 500} />
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
    return { error: handleGqlError({ err, res }) }
  }
}

export default Products
