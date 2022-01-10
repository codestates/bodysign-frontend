import { gql, useMutation, useReactiveVar } from '@apollo/client'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useState } from 'react'
import { accessTokenVar, loginTypeVar } from '../graphql/vars'
import Loading from './Loading'
// import { Cookies } from 'react-cookie'
import axios from 'axios'

// TODO : env로 빼야함
const GOOGLE_CLIENT_ID =
	'228447519514-17eoff0h38vfipbkd7ata2gtt7e2bbo7.apps.googleusercontent.com'

// TODO : 유저/트레이너 타입을 받아서 각각 페이지로 라우팅하기

const LOGIN = gql`
	mutation LoginAuth($loginUserInput: LoginUserInput!) {
		loginAuth(loginUserInput: $loginUserInput) {
			accessToken
			userType
		}
	}
`

const Login: NextPage = () => {
	console.log(process.env.NEXT_PUBLIC_API_DOMAIN)
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const [loginAuth, { data, loading, error }] = useMutation(LOGIN)
	const loginType = useReactiveVar(loginTypeVar)

	const [session, pageLoading] = useSession()

	const router = useRouter()
	if (pageLoading) {
		return <Loading />
	}

	const onChangeId = (e: any) => {
		const email = e.target.value
		setForm({
			...form,
			email: email
		})
	}

	const onChangePassword = (e: any) => {
		const password = e.target.value
		setForm({
			...form,
			password: password
		})
	}

	const onSubmit = async (e: any) => {
		try {
			axios.post("http://localhost:4000/auth/localLogin", {
				email: form.email,
				password: form.password
			},
			{
				withCredentials: true
			}
			).then(function(res){
				console.log(res)
				// window.location.href = res.request.responseURL
				// ! 여기서 유저나 트레이너 페이지로 이동할 떄 해당 유저의 정보를 받아서 이동해야할텐데?
				// ! 쿠키에 담긴 토큰 정보 가져오기
			})
		} catch (error) {
			console.log(error)
		}
	}
	if (!loading && data) {
		const accessToken = data.loginAuth.accessToken
		const userType = data.loginAuth.userType
		accessTokenVar(accessToken)

		if (userType === 'user') {
			router.push(`${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/user`)
		} else if (userType === 'trainer') {
			router.push(`${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/trainer`)
		}
	}

	const onGoogleLogin = () => {
		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:4000/auth/google&response_type=token&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
		include_granted_scopes=true`
	}

	return (
		<>
			<div className="flex flex-col text-[15px] items-center justify-center mx-auto">
				<div className="max-w-screen-md">
					<input
						className="w-4/5 p-1 m-1 font-thin border font-IBM rounded-xl"
						type="text"
						placeholder="이메일"
						onChange={onChangeId}
					/>
					<input
						className="w-4/5 p-1 m-1 font-thin border font-IBM rounded-xl"
						type="password"
						placeholder="비밀번호"
						onChange={onChangePassword}
					/>
					<button
						onClick={onSubmit}
						className="w-4/5 py-1 m-1 font-thin text-gray-800 rounded font-IBM hover:bg-gray-400 hover:text-white bg-[#FED06E]">
						로그인
					</button>
					<button
						onClick={onGoogleLogin}
						className="w-4/5 py-1 m-1 font-thin text-gray-800 bg-gray-200 rounded font-IBM hover:bg-gray-400 hover:text-white ">
						GOOGLE로 로그인
					</button>
					<div className="flex w-4/5 border-0"></div>
					<Link href="/signup" passHref>
						<button className="w-4/5 py-1 m-1 font-thin text-gray-500 transition-colors duration-150 border border-gray-300 rounded font-IBM focus:shadow-outline hover:bg-gray-300 hover:text-white">
							회원가입
						</button>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Login
