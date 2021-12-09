import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	ApolloLink,
	concat
} from '@apollo/client'
import '../components/loading.css'
import { loginTypeVar } from '../graphql/vars'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers
			// Authorization: null
		}
	}))

	return forward(operation)
})

function MyApp({ Component, pageProps }: AppProps) {
	const client = new ApolloClient({
		link: concat(authMiddleware, httpLink),
		cache: new InMemoryCache(),
		connectToDevTools: true
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
