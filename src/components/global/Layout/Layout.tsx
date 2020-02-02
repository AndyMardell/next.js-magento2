import React, { FunctionComponent } from 'react'
import Head from 'next/head'

import Header from '../Header'
import Footer from '../Footer'

interface Props {
  welcome?: string
}

const Layout: FunctionComponent<Props> = ({ welcome, children }) => (
  <>
    <Head>
      <title>Default title</title>
      <meta name='description' content='Default meta description' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header welcome={welcome} />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout
