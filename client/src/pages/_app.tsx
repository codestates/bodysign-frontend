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
	concat,
	useReactiveVar
} from '@apollo/client'
import '../components/loading.css'
import { chatTargetUserIdVar } from '../graphql/vars'
import { accessTokenVar } from '../graphql/vars'

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
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
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						chatTargetUserId: {
							read(_, {}) {
								return chatTargetUserIdVar()
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
