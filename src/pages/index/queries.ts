import gql from 'graphql-tag'

const CONFIG_QUERY = gql`
  query StoreConfig {
    storeConfig {
      welcome
    }
  }
`

export { CONFIG_QUERY }
