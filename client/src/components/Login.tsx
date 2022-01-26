import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useState } from 'react'
import {
	accessTokenVar,
	loginTypeVar,
	refreshTokenVar
} from '../graphql/vars'

const Login: NextPage = () => {
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const router = useRouter()

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
		loginTypeVar('local')
		try {
			axios
				.post(
					`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/localLogin`,
					{
						email: form.email,
						password: form.password
					},
					{
						withCredentials: true
					}
				)
				.then(function (res) {
					// 액세스 토큰과 리프레쉬 토큰을 var 에 담아두기
					accessTokenVar(res.data.accessToken)
					refreshTokenVar(res.data.refereshToken)

					// ! 여기서 유저나 트레이너 페이지로 이동할 때 해당 유저의 정보를 받아서 이동 (app.tsx에서)
					router.push(res.data.redirectUrl)
				})
		} catch (error) {
			alert('다시 로그인 해주세요')
		}
	}

	const onGoogleLogin = () => {
		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=228447519514-17eoff0h38vfipbkd7ata2gtt7e2bbo7.apps.googleusercontent.com&redirect_uri=https://api.bodysign.link/auth/google&response_type=token&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
		include_granted_scopes=true`
	}

	return (
		<>
			<div className="flex flex-col text-[15px] items-center justify-center mx-auto mb-[5rem] p-[3rem] border rounded-[2rem] shadow">
				<div className="max-w-screen-md">
					<input
						className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
						type="text"
						placeholder="이메일"
						onChange={onChangeId}
					/>
					<input
						className="w-full p-[1.2rem] mt-[1.5rem] border shadow-md h-[4.8rem] rounded-[2rem]"
						type="password"
						placeholder="비밀번호"
						onChange={onChangePassword}
					/>
					<button
						onClick={onSubmit}
						className={`w-full h-[4.8rem] mt-[2rem] text-black bg-[#FDAD00] cursor-pointer disabled:opacity-50 rounded-[2rem]`}
					>
						로그인
					</button>
					<button
						onClick={onGoogleLogin}
						className={`w-full h-[4.8rem] mt-[0.7rem] text-black bg-gray-200 cursor-pointer disabled:opacity-50 rounded-[2rem]`}
					>
						GOOGLE로 로그인
					</button>
					<div className="flex ml-[1rem]">
						<div className="flex border-0 mt-[2rem]">처음이신가요?</div>
						<Link href="/signup" passHref>
							<div className="underline mt-[2rem] text-[#FDAD00] ml-[0.5rem]">회원가입</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
