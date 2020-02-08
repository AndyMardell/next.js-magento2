import { NextPage } from 'next'
import { removeCookies, getCookies } from 'cookies-next'
import { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

import { LOGOUT_MUTATION } from '../../../gql/customer/mutations'
import useMessages from '../../../hooks/useMessages'

const CustomerAccountLogout: NextPage = () => {
  const [logout] = useMutation(LOGOUT_MUTATION)
  const router = useRouter()
  const { setMessage } = useMessages()

  const resetUser = () => {
    removeCookies(null, process.env.SESSION_COOKIE_NAME)
    router.push('/customer/account/login')
  }

  const triggerLogout = async () => {
    try {
      await logout({
        context: {
          token: getCookies(null, process.env.SESSION_COOKIE_NAME)
        }
      })
    } catch (err) {
      resetUser()
      console.log(err)
    }

    setMessage('Successfully logged out', { type: 'success' })
    resetUser()
  }

  useEffect(() => {
    triggerLogout()
  }, [])

  return null
}

export default CustomerAccountLogout
