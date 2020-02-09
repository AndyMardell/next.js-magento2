import React, { FunctionComponent } from 'react'

import { CatalogProduct } from '../../../gql/products/types'
import Product from '../Product'
import styled from 'styled-components'

interface Props {
  products: CatalogProduct[]
}

const ProductList: FunctionComponent<Props> = ({ products }) => {
  return (
    <ListContainer>
      {products.map((productDetails: CatalogProduct, i: number) => (
        <Product key={i} product={productDetails} />
      ))}
    </ListContainer>
  )
}

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`

export default ProductList
