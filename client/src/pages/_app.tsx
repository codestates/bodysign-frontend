import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	concat,
	HttpLink,
	InMemoryCache
} from '@apollo/client'
import { getCookies } from 'cookies-next'
import { Provider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import '../components/loading.css'
import '../styles/globals.css'
import useAuthHandler from '../utils/useAuthHandler'

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_API_DOMAIN_GRAPHQL,
	credentials: 'same-origin'
})

const authMiddleware = new ApolloLink((operation, forward) => {
	const accessToken = getCookies().accessToken
	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			authorization: accessToken ? `Bearer ${accessToken}` : ''
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

	useAuthHandler()

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, height=device-height, initial-scale=1.0"
				/>
			</Head>
			<ApolloProvider client={client}>
				<Provider session={pageProps.session}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</ApolloProvider>
		</>
	)
}

export default MyApp
