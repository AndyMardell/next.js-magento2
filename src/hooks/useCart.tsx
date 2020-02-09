import { useMutation } from '@apollo/react-hooks'
import { useState, useEffect, useContext } from 'react'

import { Cart } from '../gql/checkout/types'
import {
  ADD_TO_CART_MUTATION,
  CREATE_EMPTY_CART
} from '../gql/checkout/mutations'
import Context from '../context'

const useCart = () => {
  const [add, { data, loading, error }] = useMutation(ADD_TO_CART_MUTATION)
  const [
    createCart,
    { data: emptyCartData, loading: emptyCartLoading }
  ] = useMutation(CREATE_EMPTY_CART)
  const { context, setContext } = useContext(Context)

  useEffect(() => {
    if (!loading && data) {
      setContext({ cart: data.addSimpleProductsToCart.cart })
    }
  }, [data, loading])

  useEffect(() => {
    const existingId = localStorage.getItem(`${process.env.APP_PREFIX}_cartId`)

    if (existingId) {
      setContext({ cartId: existingId })
    }

    if (!existingId && !context.cartId) {
      createCart()

      if (!emptyCartLoading && emptyCartData) {
        setContext({ cartId: emptyCartData.createEmptyCart })
        localStorage.setItem(
          `${process.env.APP_PREFIX}_cartId`,
          emptyCartData.createEmptyCart
        )
      }
    }
  }, [emptyCartData, emptyCartLoading])

  const addToCart = (itemSku: String, qty: Number = 1) => {
    add({ variables: { cartId: context.cartId, itemSku, qty } })
  }

  return {
    cart: context.cart,
    addToCart,
    loading: loading || emptyCartLoading,
    error
  }
}

export default useCart
