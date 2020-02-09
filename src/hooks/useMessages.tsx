import { useContext } from 'react'
import Context from '../context'

export interface Message {
  message: string
  options?: MessageOptions
}

export interface MessageOptions {
  type?: string
}

const useMessages = () => {
  const { context, setContext } = useContext(Context)

  const setMessage = (message: string, options?: MessageOptions) => {
    const existingMessages = context.messages || []
    setContext({
      messages: [...existingMessages, { message, options }]
    })
  }

  const clearMessages = () => {
    setContext({
      messages: []
    })
  }

  return { messages: context.messages, setMessage, clearMessages }
}

export default useMessages
