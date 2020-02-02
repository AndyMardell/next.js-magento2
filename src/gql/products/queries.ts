import gql from 'graphql-tag'

const PRODUCTS_QUERY = gql`
  query ProductsQuery($category: String!) {
    products(filter: { category_id: { eq: $category } }) {
      total_count
      items {
        name
      }
      page_info {
        page_size
        current_page
      }
    }
  }
`

export { PRODUCTS_QUERY }
