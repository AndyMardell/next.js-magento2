import { CartItem } from '../checkout/types'

export type PageData = {
  customer: Customer
}

export type User = {
  cart?: {
    id: string
    items: CartItem[]
  }
  details?: Customer
}

export type Customer = {
  firstname: string
  lastname: string
  suffix?: string
  email: string
  __typename: string
}
