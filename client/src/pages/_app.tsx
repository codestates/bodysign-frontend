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
import { accessTokenVar, refreshTokenVar, userDataVar } from '../graphql/vars'
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
			Authorization: getCookies().accessToken ? `Bearer ${getCookies().accessToken}` : ''
		}
	}))

	return forward(operation)
})

function MyApp({ Component, pageProps }: AppProps) {
		try {
			// ! 요청을 어떤 상황에 보내는지 조건을 잘 작성하기 (기본 화면에서의 401 에러 방지 / 토큰이 유효하다면? 유효한지 아닌지 어케 확인하지)
			// 액세스 토큰 전달해서 받아온 유저 정보를 userDataVar 에 저장
			axios({
				method: 'get',
				url: 'http://localhost:4000/auth/profile',
				headers: { 'Authorization': `Bearer ${getCookies().accessToken}` }
			}).then(function(res){
				userDataVar({
					id: res.data.id,
					email: res.data.email,
					userName: res.data.userName,
					userCategoryId: res.data.userCategoryId,
					birthDate: res.data.birthDate,
					phoneNumber: res.data.phoneNumber,
					gender: res.data.gender,
					graduate: res.data.graduate,
					trainerId: res.data.trainerId,
					loginType: res.data.loginType,
					status: res.data.status,
					createdAt: res.data.createdAt,
					updatedAt: res.data.updatedAt,
				})
			}).catch(function(err) {
				// console.log(err.request)
				if(err.request.status === 401) {
					// 리프레쉬 토큰으로 액세스 토큰 요청하기
					axios({
						method: 'post',
						url: 'http://localhost:4000/auth/accessToken',
						data: {
							refreshToken: getCookies().refreshToken
						}
					}).then(function(res){
						console.log(res.accessToken)
						console.log(res.refreshToken)
						// response body로 accessToken 과 refreshToken 이 들어올 예정인데
						//! 404가 뜨네..
						// 이걸 쿠키에 !?
					}).catch(function(error) {
						console.log(error.request)
					})
				}
			})
		} catch (error) {
			console.log(error)
		}
		
	// console.log(pageProps)

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

