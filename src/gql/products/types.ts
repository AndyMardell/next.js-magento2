export type CatalogProduct = {
  name: string
  sku: string
  url_key: string
  small_image: {
    url: string
    label: string
  }
  price_range: {
    minimum_price: {
      regular_price: {
        value: number
        currency: string
      }
    }
  }
}
