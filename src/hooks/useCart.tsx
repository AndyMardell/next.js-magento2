import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useEffect, useContext } from 'react'

import {
  ADD_TO_CART_MUTATION,
  CREATE_EMPTY_CART
} from '../gql/checkout/mutations'
import Context from '../context'
import { CART_QUERY } from '../gql/checkout/queries'

const useCart = () => {
  const { context, setContext } = useContext(Context)

  const [
    add,
    { data: addToCartData, loading: addToCartLoading, error }
  ] = useMutation(ADD_TO_CART_MUTATION)

  const [getCart, { data: cartData, loading: cartLoading }] = useLazyQuery(
    CART_QUERY
  )

  const [
    createCart,
    { data: emptyCartData, loading: emptyCartLoading }
  ] = useMutation(CREATE_EMPTY_CART)

  useEffect(() => {
    if (!addToCartLoading && addToCartData) {
      setContext({ cart: addToCartData.addSimpleProductsToCart.cart })
    }
  }, [addToCartData, addToCartLoading])

  useEffect(() => {
    if (!cartLoading && cartData) {
      setContext({ cart: cartData.cart })
    }
  }, [cartData, cartLoading])

  useEffect(() => {
    const existingId = localStorage.getItem(`${process.env.APP_PREFIX}_cartId`)

    if (existingId) {
      getCart({ variables: { cartId: existingId } })
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
  }, [addToCartLoading, emptyCartData, emptyCartLoading])

  const addToCart = (itemSku: String, qty: Number = 1) => {
    add({ variables: { cartId: context.cartId, itemSku, qty } })
  }

  return {
    cart: context.cart,
    addToCart,
    loading: addToCartLoading || cartLoading || emptyCartLoading,
    error
  }
}

export default useCart
