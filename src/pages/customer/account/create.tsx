import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import withData from '../../../lib/apollo-client'
import Layout from '../../../components/global/Layout'
import { REGISTER_MUTATION } from './mutations'
import { NextPage } from 'next'
import redirect from '../../../lib/redirect'

interface FieldValues {
  firstName: string
  lastName: string
  newsletter: boolean
  email: string
  password: string
  confirmPassword: string
}

const CustomerAccountCreate: NextPage = ({ apollo }: any) => {
  const { handleSubmit, register, errors, setError, clearError } = useForm<
    FieldValues
  >()
  const [registrationError, setRegistrationError] = useState('')

  const onSubmit = async ({
    firstName: firstname,
    lastName: lastname,
    newsletter: is_subscribed,
    email,
    password,
    confirmPassword
  }: Record<string, any>) => {
    if (password !== confirmPassword) {
      return setError('confirmPassword', 'notMatch', 'Passwords do not match')
    } else {
      clearError('confirmPassword')
    }

    try {
      await apollo.mutate({
        mutation: REGISTER_MUTATION,
        variables: {
          firstname,
          lastname,
          email,
          password,
          is_subscribed
        }
      })
    } catch (err) {
      setRegistrationError(err.message)
    }

    redirect('/customer/account/login')
  }

  return (
    <Layout>
      <h1>Create a new customer account</h1>

      {registrationError}

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Personal information</h3>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input
            name='firstName'
            type='text'
            ref={register({ required: true })}
          />
          {errors.firstName && errors.firstName.message}
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input
            name='lastName'
            type='text'
            ref={register({ required: true })}
          />
          {errors.lastName && errors.lastName.message}
        </div>
        <div>
          <label htmlFor='newsletter'>Sign up to newsletter?</label>
          <input name='newsletter' type='checkbox' ref={register()} />
          {errors.newsletter && errors.newsletter.message}
        </div>
        <h3>Sign-in information</h3>
        <div>
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' ref={register({ required: true })} />
          {errors.email && errors.email.message}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            ref={register({ required: true })}
          />
          {errors.password && errors.password.message}
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            name='confirmPassword'
            type='password'
            ref={register({ required: true })}
          />
          {errors.confirmPassword && errors.confirmPassword.message}
        </div>
        <button type='submit'>Create an account</button>
      </form>
    </Layout>
  )
}

export default withData(CustomerAccountCreate)
