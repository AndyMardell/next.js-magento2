import ErrorInterface from '../interfaces/Error'

interface Props {
  err: ErrorInterface
  res?: {
    statusCode: number
  }
}

const handleGqlError: Function = ({ err, res }: Props) => {
  const category =
    err.graphQLErrors && err.graphQLErrors.length
      ? err.graphQLErrors[0].category
      : 'none'

  const error = {
    message: err.message,
    category: category,
    status: category === 'graphql-no-such-entity' ? 404 : 500
  }

  if (res) {
    res.statusCode = error.status
  }

  return error
}

export default handleGqlError
