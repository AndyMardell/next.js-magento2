import React, { FunctionComponent, useEffect, useContext } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { CART_QUERY } from '../../../gql/customer/queries'
import Context from '../../../context'
import useCart from '../../../hooks/useCart'

const Cart: FunctionComponent = () => {
  const { cart, loading } = useCart()

  if (loading || !cart) {
    return <div>Cart</div>
  }

  return <div>{cart.items.length} items in cart</div>
}

export default Cart
