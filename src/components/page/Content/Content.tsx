import React, { FunctionComponent } from 'react'

interface Props {
  html: string
}

const Content: FunctionComponent<Props> = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
)

export default Content
