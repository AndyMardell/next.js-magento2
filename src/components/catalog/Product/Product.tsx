import React, { FunctionComponent } from 'react'

import { CatalogProduct } from '../../../gql/products/types'
import AddToCart from './AddToCart'
import styled from 'styled-components'

interface Props {
  product: CatalogProduct
}

const Product: FunctionComponent<Props> = ({ product }) => {
  return (
    <ProductLink href={`/product/${product.url_key}`}>
      {product.small_image && (
        <ProductImage>
          <img src={product.small_image.url} alt={product.small_image.label} />
        </ProductImage>
      )}
      <h4>{product.name}</h4>
      <AddToCart itemSku={product.sku} />
    </ProductLink>
  )
}

const ProductLink = styled.a`
  display: block;
`
const ProductImage = styled.div`
  height: 200px;
  width: 100%;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`

export default Product
