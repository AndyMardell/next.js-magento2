import React, { FunctionComponent, useEffect } from 'react'

import useCart from '../../../hooks/useCart'
import useMessages from '../../../hooks/useMessages'

interface Props {
  itemSku: String
  qty?: Number
}

const AddToCart: FunctionComponent<Props> = ({ itemSku, qty }) => {
  const { setMessage, clearMessages } = useMessages()
  const { addToCart, loading, error } = useCart()

  useEffect(() => {
    if (error) {
      setMessage('There was an error adding item to cart', { type: 'error' })
    } else {
      clearMessages()
    }
  }, [error])

  return (
    <button onClick={() => addToCart(itemSku, qty)} disabled={loading}>
      Add to cart
    </button>
  )
}

export default AddToCart
