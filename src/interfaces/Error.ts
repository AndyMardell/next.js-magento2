export default interface ErrorInterface {
  message: string
  status: number
  graphQLErrors?: {
    message: string
    category: string
  }[]
}
