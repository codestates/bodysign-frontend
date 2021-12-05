import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider
} from '@apollo/client'
import '../components/loading.css'

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
	  cache: new InMemoryCache()
  })
	
  return (
		<ApolloProvider client={client}>
      <Provider session={pageProps.session}>
			  <Component {...pageProps} />
      </Provider>
		</ApolloProvider>
	)
}

export default MyApp
