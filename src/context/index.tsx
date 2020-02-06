import React, {
  createContext,
  useReducer,
  FunctionComponent,
  Dispatch
} from 'react'

interface ContextType {
  showMenu: boolean
}

interface ContextWithDispatch {
  context: ContextType
  setContext: Dispatch<ContextType>
}

const defaultContextValue: ContextType = {
  showMenu: false
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
