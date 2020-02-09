import gql from 'graphql-tag'

const CART_QUERY = gql`
  query Cart($cartId: String!) {
    cart(cart_id: $cartId) {
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
`

export { CART_QUERY }
