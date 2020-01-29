import React, { FunctionComponent } from 'react'
import Layout from '../../global/Layout'

interface Props {
  pageData: {
    content: string
    content_heading?: string
  }
}

const NotFound: FunctionComponent<Props> = ({ pageData }) => (
  <Layout>
    <h2>{pageData.content_heading}</h2>
    <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
  </Layout>
)

export default NotFound
