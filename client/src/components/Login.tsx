import React, { useState } from 'react'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import GoogleLogin from 'react-google-login'
import KaKaoLogin from 'react-kakao-login'
import Layout from '../components/Layout'
import Loading from './Loading'

const googleCliendId =
	'122713240467-oq4tee3gshbdfmodg5b20ljsb9ajfsoe.apps.googleusercontent.com'
const kakaoAppKey = '6e971578908fd66a46f5962ba278215a'

const Login: NextPage = () => {
	const [session, loading] = useSession()

	const [form, setForm] = useState({
		id: '',
		password: ''
	})

	if (loading) {
		return <Loading />
	}

	const onChangeId = (e: any) => {
		const id = e.target.value
		console.log(id)
		setForm({
			...form,
			id: id
		})
		console.log(form)
	}

	const onChangePassword = (e: any) => {
		const password = e.target.value
		setForm({
			...form,
			password: password
		})
	}

	const onSubmit = (e: any) => {
		console.log(form)
	}

	const onSuccessGoogle = (response: any) => {
		console.log(response, 'success')
		console.log(response.accessToken)
		//? 1. 여기서 받아온 액세스토큰을 서버로 넘겨주기
		//? 2. 서버에서 구글 oauth로 요청
		//? 3. 서버나 클라에서 로그인된 화면으로 리디렉션
		//? 휴대폰 번호를 받아야 해서 회원가입 모달창 띄워야 함
	}

	const onFailureGoogle = (response: any) => {
		console.log(response, 'failed')
	}

	const onSuccessKakao = (res: any) => {
		console.log(res)
		//? 1. 여기서 받아온 액세스토큰을 서버로 넘겨주기
		//? 2. 서버에서 카카오 oauth로 요청
		//? 3. 서버나 클라에서 로그인된 화면으로 리디렉션
		//? 휴대폰 번호를 받아야 해서 회원가입 모달창 띄워야 함
	}

	const onFailureKakao = (err: any) => {
		console.log(err)
	}

	const onSignup = () => {
		// 회원가입 링크로 넘기기
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col mx-auto my-5 text-[12px]">
					{!session && (
						<>
							<div className="max-w-screen-md">
								<input
									className="w-4/5 p-1 m-1 font-thin border font-IBM rounded-xl"
									type="text"
									placeholder="이메일"
									onChange={onChangeId}
								/>
								<input
									className="w-4/5 p-1 m-1 font-thin border font-IBM rounded-xl"
									type="text"
									placeholder="비밀번호"
									onChange={onChangePassword}
								/>
								<button
									onClick={onSubmit}
									className="w-4/5 py-1 m-1 font-thin text-gray-800 bg-gray-300 rounded font-IBM hover:bg-gray-400 hover:text-white ">
									로그인
								</button>
								<div className="flex w-4/5 border-0">
									<GoogleLogin
										className="w-1/2 m-1 font-thin font-IBM"
										clientId={googleCliendId}
										buttonText="Login"
										onSuccess={onSuccessGoogle}
										onFailure={onFailureGoogle}
										cookiePolicy={'single_host_origin'}>
										구글로 로그인
									</GoogleLogin>
									<KaKaoLogin
										className="w-1/2 m-1 font-thin font-IBM"
										token={kakaoAppKey}
										onSuccess={onSuccessKakao}
										onFail={onFailureKakao}>
										카카오로 로그인
									</KaKaoLogin>
								</div>
								<button
									onClick={onSignup}
									className="w-4/5 py-1 m-1 font-thin text-gray-500 transition-colors duration-150 border border-gray-300 rounded font-IBM focus:shadow-outline hover:bg-gray-300 hover:text-white">
									회원가입
								</button>
							</div>
						</>
					)}
					{session && (
						<>
							로그인 되었습니다. <br />
							<button onClick={() => signOut()}>Sign out</button>
						</>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Login
