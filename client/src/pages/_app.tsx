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
		cache: new InMemoryCache({
			addTypename: true
			// typePolicies: {
			// 	Query: {
			// 		fields: {
			// 			chatTargetUserId: {
			// 				read(_, {}) {
			// 					return chatTargetUserIdVar()
			// 				}
			// 			}
			// 		}
			// 	}
			// }
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

// This also gets called at build time
export async function getStaticProps() {
	// params contains the post `id`.
	// If the route is like /posts/1, then params.id is 1
	// const res = await fetch(`https://.../posts/${params.id}`)
	// const post = await res.json()

	// Pass post data to the page via props
	return { props: {} }
}

export default MyApp
