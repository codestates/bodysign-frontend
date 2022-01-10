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
import { getCookies } from 'cookies-next'
const axios = require('axios')

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
			authorization: accessTokenVar() ? `Bearer ${accessTokenVar()}` : ''
		}
	}))

	return forward(operation)
})

function MyApp({ Component, pageProps }: AppProps) {

	console.log(pageProps)

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
				{/* <Provider session={pageProps.session}> */}
				<Provider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</ApolloProvider>
		</>
	)
}

//! 여기 아래에서 액세스토큰 전달하기 
//? GET: /auth/profile
//! 그래서 유저 정보 받아오면 var 에 담아두기
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }


MyApp.getInitialProps = async (appContext: any) => {

	// 웹 페이지는 각 페이지마다 사전에 불러와야할 데이터들이 있다. 
	// Data Fectching이라고도 하는 로직은 CSR(Client Side Rendering)에서는 
	// react 로직에 따라 componentDidMount or useEffect로 컴포넌트가 마운트 되고 나서 하는 경우가 많다. 
	// 이 과정을 서버에서 미리 처리하도록 도와주는 것이 바로 getInitialProps이다. 

	const { req, res } = appContext
	// getCookies().accessToken
	let pageProps = { ...req };

	// if (Component.getInitialProps) {
	// 	// Component의 context로 ctx를 넣어주자
	// 	pageProps = await Component.getInitialProps(ctx);
	// }
	//! 토큰을 쿠키에서 받아오기
	//! 여기서 헤더에 토큰 담아서 axios 요청
	// const UserInfo = await axios({
	// 	method: 'get',
	// 	url: 'http://localhost:3000/auth/profile',
	// 	headers: appContext.req ? { cookie: appContext.req.headers.cookie } : undefined
	// })
	return { pageProps }
}
//b8451e4fa0e0fd9e4a97d90133d8f23a8d445fcf68b9df0a111ccd76379e8863%7C58a0dd3125882408b638013929cf7f8247aff737785001408ab2ea1cb499b5e0

export default MyApp

