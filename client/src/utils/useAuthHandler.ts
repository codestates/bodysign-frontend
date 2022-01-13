import { useReactiveVar } from '@apollo/client'
import axios from 'axios'
import { getCookies, removeCookies } from 'cookies-next'
import { useRouter } from 'next/dist/client/router'
import { userDataVar } from '../graphql/vars'

const useAuthHandler = async () => {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)

	const getProfile = async () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/profile`, {
				headers: {
					Authorization: `Bearer ${getCookies().accessToken}`
				}
			})
			.then(res => {
				userDataVar(res.data)
			})
			.catch(async error => {
				console.log(error)
				removeCookies('accessToken')

				// 새로고침 = userData 없다. 쿠키에 accessToken은 있지만 유효하지 않다.
				// ==> 가지고 있는 refreshToken으로 새로운 accessToken을 요청한다.
				// refreshToken의 시간은?
				// removeCookies('refreshToken')
				await getAccessToken()
			})
	}

	const getAccessToken = async () => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/accessToken`,
				{
					refreshToken: getCookies().refreshToken
				},
				{ withCredentials: true }
			)
			.then(async res => {
				console.log('새로운 쿠키는 잘 받았다.')

				// await getProfile()
				//
				//

				axios
					.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/profile`, {
						headers: {
							Authorization: `Bearer ${getCookies().accessToken}`
						}
					})
					.then(res => {
						userDataVar(res.data)
					})
					.catch(async error => {
						console.log(error)
					})
			})
			.catch(error => {
				console.log(error)
				router.push('/')
			})
	}

	if (router.pathname === '/') return
	if (!getCookies().accessToken) router.push('/')
	if (userData) return
	else {
		getProfile()
	}
}

export default useAuthHandler
