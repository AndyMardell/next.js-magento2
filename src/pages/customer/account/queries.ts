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

export { CUSTOMER_QUERY }
