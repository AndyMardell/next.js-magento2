export type Cart = {
  email: string
  billing_address: {
    city: string
    country: {
      code: string
      label: string
    }
    firstname: string
    lastname: string
    postcode: string
    region: {
      code: string
      label: string
    }
    street: string
    telephone: string
  }
  shipping_addresses: {
    firstname: string
    lastname: string
    street: string
    city: string
    region: {
      code: string
      label: string
    }
    country: {
      code: string
      label: string
    }
    telephone: string
    available_shipping_methods: {
      amount: {
        currency: string
      }
      available: string
      carrier_code: string
      carrier_title: string
      error_message: string
      method_code: string
      method_title: string
      price_excl_tax: {
        value: number
        currency: string
      }
      price_incl_tax: {
        value: number
        currency: string
      }
    }
    selected_shipping_method: {
      amount: {
        value: number
        currency: string
      }
      carrier_code: string
      carrier_title: string
      method_code: string
      method_title: string
    }
  }
  items: CartItem[]
  available_payment_methods: {
    code: string
    title: string
  }
  selected_payment_method: {
    code: string
    title: string
  }
  applied_coupons: {
    code: string
  }
  prices: {
    grand_total: {
      value: number
      currency: string
    }
  }
}

export interface CartItem {
  id: string
  product: {
    name: string
    sku: string
  }
  quantity: number
}
