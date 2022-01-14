import { useReactiveVar } from '@apollo/client'
import axios from 'axios'
import { getCookies, removeCookies } from 'cookies-next'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { userDataVar } from '../graphql/vars'

const AuthHandler = async () => {
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
				await getProfile()
			})
			.catch(error => {
				console.log(error)
				router.push('/')
			})
	}

	useEffect(() => {
		if (router.pathname === '/') return
		if (!getCookies().accessToken) router.push('/')
		if (userData) return
		else {
			getProfile()
		}
	}, [router])
}

export default AuthHandler
