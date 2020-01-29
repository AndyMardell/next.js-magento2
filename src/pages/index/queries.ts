import gql from 'graphql-tag'

const HOME_QUERY = gql`
  query HomeQuery($identifier: String!) {
    storeConfig {
      welcome
    }
    cmsPage(identifier: $identifier) {
      title
      content
      content_heading
      meta_title
      meta_description
      meta_keywords
    }
  }
`

export { HOME_QUERY }
