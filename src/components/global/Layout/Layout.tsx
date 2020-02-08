import React, { FunctionComponent } from 'react'
import Head from 'next/head'

import Header from '../Header'
import Footer from '../Footer'
import Messages from '../Messages'

interface Props {
  welcome?: string
}

const Layout: FunctionComponent<Props> = ({ welcome, children }) => {
  return (
    <>
      <Head>
        <title>Default title</title>
        <meta name='description' content='Default meta description' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header welcome={welcome} />
      <Messages />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
