import React, { FunctionComponent } from 'react'

interface Props {
  pageData: {
    content: string
    content_heading?: string
  }
}

const Content: FunctionComponent<Props> = ({ pageData }) => {
  return (
    <>
      <h2>{pageData.content_heading}</h2>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </>
  )
}

export default Content
