import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { getCookies, removeCookies } from 'cookies-next'

import NextContextWithApollo from '../../../interfaces/NextContextWithApollo'
import { PageData } from './types'
import { CUSTOMER_QUERY } from './queries'
import redirect from '../../../lib/redirect'

interface Props {
  pageData: PageData
}

const CustomerAccount: NextPage<Props> = ({ pageData }) => {
  return (
    <>
      <h1>Customer Account Dashboard</h1>
      <p>Hello {pageData.customer.firstname}!</p>
      <Link href='/customer/account/logout'>
        <a>Logout</a>
      </Link>
    </>
  )
}

CustomerAccount.getInitialProps = async (ctx: NextContextWithApollo) => {
  try {
    const { data } = await ctx.apolloClient.query({
      query: CUSTOMER_QUERY,
      context: {
        token: getCookies(ctx, process.env.SESSION_COOKIE_NAME)
      }
    })

    if (!data) {
      throw new Error('Data not found')
    }

    return { pageData: data }
  } catch (err) {
    removeCookies(ctx, process.env.SESSION_COOKIE_NAME)
    redirect('/customer/account/login', ctx)
    return { pageData: {} }
  }
}

export default CustomerAccount
