import gql from 'graphql-tag'

const CONFIG_QUERY = gql`
  query ConfigQuery {
    storeConfig {
      cms_home_page
      cms_no_route
    }
  }
`

const HOME_QUERY = gql`
  query HomeQuery($identifier: String!) {
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

export { CONFIG_QUERY, HOME_QUERY }
