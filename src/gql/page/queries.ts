import gql from 'graphql-tag'

const PAGE_QUERY = gql`
  query Page($identifier: String!) {
    cmsPage(identifier: $identifier) {
      url_key
      title
      content
      content_heading
      page_layout
      meta_title
      meta_description
      meta_keywords
    }
  }
`

export { PAGE_QUERY }
