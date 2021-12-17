import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
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

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })
const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers

	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers
			// TODO: 액세스토큰을 여기 담아서 요청들에 보내기
			// TODO: graphqlvar에 토큰을 담아서 가져 오기
			// authorization: token ? `Bearer ${token}` : ""
		}
	}))

	return forward(operation)
})

function MyApp({ Component, pageProps }: AppProps) {
	const client = new ApolloClient({
		link: concat(authMiddleware, httpLink),
		cache: new InMemoryCache({
			typePolicies: {
				Exercise: {
					fields: {
						isChecked: {
							read(_, {}) {
								return 'heeeeeeeeeeeeeeeeeeeeeeeeeeeey'
							}
						}
					}
				}
			}
		}),
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
					<Component {...pageProps} />
				</Provider>
			</ApolloProvider>
		</>
	)
}

export default MyApp
