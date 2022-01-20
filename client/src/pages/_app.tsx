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
import type { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import '../components/loading.css'
import { userDataVar } from '../graphql/vars'
import '../styles/globals.css'

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_API_DOMAIN_GRAPHQL,
	// credentials: 'same-origin'
	credentials: 'include'
})

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			// TODO: 액세스토큰을 여기 담아서 요청들에 보내기 완료. 제대로 작동하는지 체크 필요
			Authorization: getCookies().accessToken
				? `Bearer ${getCookies().accessToken}`
				: ''
		}
	}))

	return forward(operation)
})

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)
	
	useEffect(() => {
		if (router.pathname === '/') return
		if (router.pathname === '/signup') return
		if (!getCookies().accessToken) router.push('/')
		if (userData) return
		else {
			try {
				// 요청을 어떤 상황에 보내는지 조건 작성 (토큰이 유효하다면?)
				// 액세스 토큰 전달해서 받아온 유저 정보를 userDataVar 에 저장
				axios({
					method: 'get',
					url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/profile`,
					headers: { Authorization: `Bearer ${getCookies().accessToken}` }
				})
					.then(function (res) {
						userDataVar(res.data)
					})
					.catch(function (err) {
						if (err.request.status === 401) {
							// 리프레쉬 토큰으로 액세스 토큰 요청하기
							axios
								.post( 
									`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/accessToken`,
									{
										refreshToken: getCookies().refreshToken
									},
									{
										withCredentials: true
									}
								)
								.then(function (res) {
									axios({
										method: 'get',
										url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/profile`,
										headers: {
											Authorization: `Bearer ${getCookies().accessToken}`
										}
									})
										.then(function (res) {
											userDataVar(res.data)
										})
										.catch(function (error) {
											// 여기는 auth/profile 요청에 대한 에러
											alert('유저 정보를 불러오지 못했습니다.')
										})
								})
								.catch(function (error) {
									// 여기는 auth/accessToken 요청에 대한 에러
									alert('다시 로그인 해주세요.')
								})
						}
					})
			} catch (error) {
				alert('다시 로그인 해주세요.')
			}
		}
	}, [router])

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
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ApolloProvider>
		</>
	)
}

export default MyApp
