import { NextPage } from 'next'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { setCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'

import Layout from '../../../components/global/Layout'
import { LOGIN_MUTATION } from '../../../gql/customer/mutations'

interface FieldValues {
  email: string
  password: string
}

const CustomerAccountLogin: NextPage = () => {
  const { handleSubmit, register, errors, reset } = useForm<FieldValues>()
  const [error, setError] = useState(false)
  const [login] = useMutation(LOGIN_MUTATION)
  const router = useRouter()

  const onSubmit = async ({ email, password }: Record<string, any>) => {
    try {
      const { data } = await login({
        variables: { email, password }
      })

      const { generateCustomerToken: customerToken } = data

      setCookies(null, process.env.SESSION_COOKIE_NAME, customerToken.token, {
        path: '/',
        expires: new Date(Date.now() + 12096e5) // 2 weeks from now
      })

      router.push('/customer/account')
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
