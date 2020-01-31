import { NextPage } from 'next'
import { removeCookies, getCookies } from 'cookies-next'

import NextContextWithApollo from '../../../interfaces/NextContextWithApollo'
import { LOGOUT_MUTATION } from './mutations'
import redirect from '../../../lib/redirect'

const CustomerAccountLogout: NextPage = () => null

CustomerAccountLogout.getInitialProps = async (ctx: NextContextWithApollo) => {
  try {
    await ctx.apolloClient.mutate({
      mutation: LOGOUT_MUTATION,
      context: {
        token: getCookies(ctx, process.env.SESSION_COOKIE_NAME)
      }
    })
  } catch (err) {
    console.log(err)
  }

  removeCookies(ctx, process.env.SESSION_COOKIE_NAME)
  redirect('/customer/account/login', ctx)
  return {}
}

export default CustomerAccountLogout
