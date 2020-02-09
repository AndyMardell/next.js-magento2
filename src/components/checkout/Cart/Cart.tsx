import React, { FunctionComponent } from 'react'

import useCart from '../../../hooks/useCart'

const Cart: FunctionComponent = () => {
  const { cart, loading } = useCart()

  if (loading || !cart) {
    return <div>Cart</div>
  }

  return <div>{cart.items.length} items in cart</div>
}

export default Cart
