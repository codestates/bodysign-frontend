import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	concat,
	HttpLink,
	InMemoryCache
} from '@apollo/client'
import { Provider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import '../components/loading.css'
import { accessTokenVar } from '../graphql/vars'
import '../styles/globals.css'

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_API_DOMAIN_GRAPHQL,
	credentials: 'same-origin'
})

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			// TODO: 액세스토큰을 여기 담아서 요청들에 보내기 완료. 제대로 작동하는지 체크 필요
			authorization: accessTokenVar() ? `Bearer ${accessTokenVar()}` : ''
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
