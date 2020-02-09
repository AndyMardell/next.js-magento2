import { NextPage } from 'next'
import React, { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { setCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useLazyQuery } from '@apollo/react-hooks'

import Layout from '../../../components/global/Layout'
import { LOGIN_MUTATION } from '../../../gql/customer/mutations'
import { CUSTOMER_QUERY } from '../../../gql/customer/queries'
import Context from '../../../context'

interface FieldValues {
  email: string
  password: string
}

const CustomerAccountLogin: NextPage = () => {
  const { handleSubmit, register, errors, reset } = useForm<FieldValues>()
  const [error, setError] = useState(false)
  const [login] = useMutation(LOGIN_MUTATION)
  const [getUser, { loading: userLoading, data: userData }] = useLazyQuery(
    CUSTOMER_QUERY
  )
  const router = useRouter()
  const { setContext } = useContext(Context)
  useEffect(() => {
    if (!userLoading && userData) {
      setContext({
        user: userData.customer
      })

      router.push('/customer/account')
    }
  }, [userLoading, userData])

  const onSubmit = async ({ email, password }: Record<string, any>) => {
    try {
      const { data } = await login({
        variables: { email, password }
      })

      const customerToken = data.generateCustomerToken.token
      setCookies(null, process.env.SESSION_COOKIE_NAME, customerToken, {
        path: '/',
        expires: new Date(Date.now() + 12096e5) // 2 weeks from now
      })
      getUser({ context: { token: customerToken } })
    } catch (err) {
      setError(err.message)
      reset()
    }
  }

  return (
    <Layout>
      <h1>Login</h1>
      {error && 'Incorrect credentials'}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
          />
          {errors.email && errors.email.message}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            ref={register({ required: 'Password is required' })}
          />
          {errors.password && errors.password.message}
        </div>
        <button type='submit'>Login</button>
      </form>
    </Layout>
  )
}

export default CustomerAccountLogin
