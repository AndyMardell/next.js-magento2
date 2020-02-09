import React, {
  createContext,
  useReducer,
  FunctionComponent,
  Dispatch
} from 'react'

import { Message } from '../hooks/useMessages'
import { User } from '../gql/customer/types'
import { Cart } from '../gql/checkout/types'

interface ContextType {
  showMenu?: boolean
  messages?: Message[]
  user?: User
  cartId?: String
  cart?: Cart
}

interface ContextWithDispatch {
  context: ContextType
  setContext: Dispatch<ContextType>
}

const defaultContextValue: ContextType = {
  showMenu: false,
  messages: []
}

const Context = createContext({
  context: defaultContextValue
} as ContextWithDispatch)

const ContextProvider: FunctionComponent = ({ children }) => {
  const [context, setContext] = useReducer(
    (context: ContextType, newContext: ContextType) => ({
      ...context,
      ...newContext
    }),
    defaultContextValue
  )

  return (
    <Context.Provider value={{ context, setContext } as ContextWithDispatch}>
      {children}
    </Context.Provider>
  )
}

export { Context as default, ContextProvider }
