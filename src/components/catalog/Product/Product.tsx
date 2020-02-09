import React, { FunctionComponent } from 'react'

import { Product as ProductType } from '../../../gql/products/types'
import AddToCart from './AddToCart'

interface Props {
  product: ProductType
}

const Product: FunctionComponent<Props> = ({ product }) => {
  return (
    <div>
      <h4>{product.name}</h4>
      <AddToCart itemSku={product.sku} />
    </div>
  )
}

export default Product
