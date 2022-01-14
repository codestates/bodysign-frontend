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
				// ! 요청을 어떤 상황에 보내는지 조건을 잘 작성하기 (기본 화면에서의 401 에러 방지 / 토큰이 유효하다면? 유효한지 아닌지 어케 확인하지)
				// 액세스 토큰 전달해서 받아온 유저 정보를 userDataVar 에 저장
				axios({
					method: 'get',
					url: 'http://localhost:4000/auth/profile',
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
									'http://localhost:4000/auth/accessToken',
									{
										refreshToken: getCookies().refreshToken
									},
									{
										withCredentials: true
									}
								)
								.then(function (res) {
									// response body로 accessToken 과 refreshToken 이 들어올 예정인데
									//! 404가 뜨네..
									// 이걸 쿠키에 !?
									axios({
										method: 'get',
										url: 'http://localhost:4000/auth/profile',
										headers: {
											Authorization: `Bearer ${getCookies().accessToken}`
										}
									})
										.then(function (res) {
											userDataVar(res.data)
										})
										.catch(function (error) {
											// 여기는 auth/profile 요청에 대한 에러
											console.log(error.request)
										})
								})
								.catch(function (error) {
									// 여기는 auth/accessToken 요청에 대한 에러
									console.log(error.request.response)
								})
						}
					})
			} catch (error) {
				console.log(error)
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

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

// MyApp.getInitialProps = async (appContext: any) => {

// 	// 웹 페이지는 각 페이지마다 사전에 불러와야할 데이터들이 있다.
// 	// Data Fectching이라고도 하는 로직은 CSR(Client Side Rendering)에서는
// 	// react 로직에 따라 componentDidMount or useEffect로 컴포넌트가 마운트 되고 나서 하는 경우가 많다.
// 	// 이 과정을 서버에서 미리 처리하도록 도와주는 것이 바로 getInitialProps이다.

// 	const { req, res } = appContext
// 	// getCookies().accessToken
// 	let pageProps = { accessTokenVar };

// 	// if (Component.getInitialProps) {
// 	// 	// Component의 context로 ctx를 넣어주자
// 	// 	pageProps = await Component.getInitialProps(ctx);
// 	// }
// 	//! 토큰을 쿠키에서 받아오기
// 	//! 여기서 헤더에 토큰 담아서 axios 요청

// 	return { pageProps }
// }

export default MyApp
