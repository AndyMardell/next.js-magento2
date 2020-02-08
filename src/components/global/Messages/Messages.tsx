import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'

import useMessages, { Message } from '../../../hooks/useMessages'

interface StyledProps {
  type?: string
}

const StyledMessage = styled.div<StyledProps>`
  ${({ type }) =>
    type === 'error' &&
    `
    color: red;
    border: red;
  `}

  ${({ type }) =>
    type === 'success' &&
    `
    color: green;
    border: green;
  `}
`

const Messages: FunctionComponent = () => {
  const { messages, clearMessages } = useMessages()
  const [currentMessages, setCurrentMessages] = useState<Message[]>([])

  useEffect(() => {
    setCurrentMessages(messages)
    clearMessages()
  }, [])

  return (
    <div>
      {currentMessages.map(({ message, options }: Message, i) => (
        <StyledMessage key={i} type={options && options.type}>
          {message}
        </StyledMessage>
      ))}
    </div>
  )
}

export default Messages
