import React, { FunctionComponent } from 'react'
import Head from 'next/head'

import Header from '../Header'
import Footer from '../Footer'

interface Props {
  title?: string
}

const Layout: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name='description' content='Default meta description' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title={title} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
