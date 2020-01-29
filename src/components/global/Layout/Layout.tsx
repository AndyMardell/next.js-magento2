import React, { FunctionComponent } from 'react'
import Head from 'next/head'

import Header from '../Header'
import Footer from '../Footer'

interface Props {
  title?: string
  welcome?: string
}

const Layout: FunctionComponent<Props> = ({ title, welcome, children }) => (
  <>
    <Head>
      <title>Home</title>
      <meta name='description' content='Default meta description' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header title={title} welcome={welcome} />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout
