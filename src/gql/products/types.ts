export type Product = {
  name: string
  sku: string
  price_range: {
    minimum_price: {
      regular_price: {
        value: number
        currency: string
      }
    }
  }
}
