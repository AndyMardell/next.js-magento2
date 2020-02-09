import gql from 'graphql-tag'

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($cartId: String!, $itemSku: String!, $qty: Float = 1) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [{ data: { sku: $itemSku, quantity: $qty } }]
      }
    ) {
      cart {
        items {
          id
          product {
            name
            sku
          }
          quantity
        }
      }
    }
  }
`

const CREATE_EMPTY_CART = gql`
  mutation CreateEmptyCart {
    createEmptyCart
  }
`

export { ADD_TO_CART_MUTATION, CREATE_EMPTY_CART }
