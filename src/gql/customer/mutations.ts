import gql from 'graphql-tag'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    revokeCustomerToken {
      result
    }
  }
`

const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $is_subscribed: Boolean!
  ) {
    createCustomer(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        is_subscribed: $is_subscribed
      }
    ) {
      customer {
        id
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`

export { LOGIN_MUTATION, LOGOUT_MUTATION, REGISTER_MUTATION }
