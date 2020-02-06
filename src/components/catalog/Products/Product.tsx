import React, { FunctionComponent } from 'react'

import { Product as ProductType } from '../../../gql/products/types'

interface Props {
  product: ProductType
}

const Product: FunctionComponent<Props> = ({ product }) => {
  return <div>{product.name}</div>
}

export default Product
