import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { removeCookies, getCookies } from 'cookies-next'
import { useQuery } from '@apollo/react-hooks'
import Router from 'next/router'

import { CUSTOMER_QUERY } from '../../gql/customer/queries'
import Layout from '../../components/global/Layout'

const CustomerAccount: NextPage = () => {
  const { loading, error, data } = useQuery(CUSTOMER_QUERY, {
    context: { token: getCookies(null, process.env.SESSION_COOKIE_NAME) },
    fetchPolicy: 'no-cache'
  })

  if (loading) {
    return <Layout>Loading...</Layout>
  }

  if (error || !data.customer) {
    removeCookies(null, process.env.SESSION_COOKIE_NAME)
    Router.push('/customer/account/login')
    return null
  }

  return (
    <Layout>
      <h1>Customer Account Dashboard</h1>
      <p>Hello {data.customer.firstname}!</p>
      <Link href='/customer/account/logout'>
        <a>Logout</a>
      </Link>
    </Layout>
  )
}

export default CustomerAccount
