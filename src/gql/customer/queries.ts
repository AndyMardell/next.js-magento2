import gql from 'graphql-tag'

const CUSTOMER_QUERY = gql`
  query CustomerQuery {
    customer {
      firstname
      lastname
      suffix
      email
    }
  }
`

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

export { CUSTOMER_QUERY, CART_QUERY }
