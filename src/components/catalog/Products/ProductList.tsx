import React, { FunctionComponent } from 'react'

import { Product as ProductType } from '../../../gql/products/types'
import Product from './Product'

interface Props {
  products: ProductType[]
}

const ProductList: FunctionComponent<Props> = ({ products }) => (
  <div>
    {products.map((productDetails: ProductType, i: number) => (
      <Product key={i} product={productDetails} />
    ))}
  </div>
)

export default ProductList
