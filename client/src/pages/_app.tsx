import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	concat,
	HttpLink,
	InMemoryCache,
	useReactiveVar
} from '@apollo/client'
import axios from 'axios'
import { getCookies } from 'cookies-next'
import { Provider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import '../components/loading.css'
import { accessTokenVar, userDataVar } from '../graphql/vars'
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
			authorization: accessTokenVar() ? `Bearer ${accessTokenVar()}` : ''
		}
	}))

	return forward(operation)
})

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)
	const accessToken = getCookies().accessToken
	const refreshToken = getCookies().refreshToken

	const client = new ApolloClient({
		link: concat(authMiddleware, httpLink),
		cache: new InMemoryCache({}),
		connectToDevTools: true
	})

	const initializeUserData = async () => {
		if (router.pathname === '/') return
		if (!accessToken) {
			router.push('/')
		}

		if (userData) return
		else {
			await axios
				.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/profile`, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
				.then(res => {
					userDataVar(res.data)
				})
				.catch(async error => {
					console.log(error)
					if (error.message === 'Request failed with status code 401') {
						await axios
							.post(
								`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/accessToken`,
								{
									refreshToken
								}
							)
							.then(res => {
								console.log(res)
								// 토큰이 body로 넘어와서
								// localStorage를 쓰지 않는 지금은 그냥 로그인 화면으로 돌린다.
								router.push('/')
							})
							.catch(error => {
								console.log(error)
								router.push('/')
							})
					}
				})
		}
	}

	useEffect(() => {
		initializeUserData()
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
