import { AppProps } from 'next/app'

interface AppPropsWithApollo extends AppProps {
  apollo: any
}

export default AppPropsWithApollo
