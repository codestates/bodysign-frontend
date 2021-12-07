import React, { useState } from 'react'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import GoogleLogin from 'react-google-login'
import KaKaoLogin from 'react-kakao-login'
import Layout from '../components/Layout'
import Loading from './Loading'
import { gql, useQuery, useMutation, useReactiveVar } from '@apollo/client';
import { loginTypeVar } from '../graphql/vars'

const googleCliendId =
	'122713240467-oq4tee3gshbdfmodg5b20ljsb9ajfsoe.apps.googleusercontent.com'
const kakaoAppKey = '6e971578908fd66a46f5962ba278215a'

const LOGIN = gql`
	mutation LoginAuth($loginUserInput: LoginUserInput!) {
		loginUser(loginUserInput: $loginUserInput) {
			email
			password
			type
		}
  }
`;

const Login: NextPage = () => {

	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const [ loginAuth, { loading, error }] = useMutation(LOGIN);
	const loginType = useReactiveVar(loginTypeVar)

	const [session, pageLoading] = useSession() 

    if(pageLoading) {
        return (
          <Loading />
        )
    }

	const onChangeId = (e: any) => {
		const email = e.target.value
		console.log(email)
		setForm({
			...form,
			email: email
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
		loginAuth({
			variables: {
				createTrainerInput: {
					email: form.email,
					password: form.password,
					loginType
				}
			}
		})
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

    return <>
    <Layout variant="Web">
      <div className="flex flex-col mx-auto my-5 text-[12px]">
        {!session && <>
          <div className="max-w-screen-md">
            <input className="font-IBM font-thin rounded-xl border p-1 m-1 w-4/5" type="text" placeholder="이메일" onChange={onChangeId} />
            <input className="font-IBM font-thin rounded-xl border p-1 m-1 w-4/5" type="password" placeholder="비밀번호" onChange={onChangePassword}/>
            <button onClick={onSubmit} className="font-IBM font-thin py-1 rounded text-gray-800 bg-gray-300 hover:bg-gray-400 hover:text-white m-1 w-4/5 ">
              로그인
            </button>
            <div className="flex w-4/5 border-0">
              <GoogleLogin
                className="m-1 w-1/2 font-IBM font-thin"
                clientId={googleCliendId}
                buttonText="Login"
                onSuccess={onSuccessGoogle}
                onFailure={onFailureGoogle}
                cookiePolicy={"single_host_origin"}
              >
                구글로 로그인
              </GoogleLogin>
              <KaKaoLogin
                className="m-1 w-1/2 font-IBM font-thin"
                token={kakaoAppKey}
                onSuccess={onSuccessKakao}
                onFail={onFailureKakao}
              >
                카카오로 로그인
              </KaKaoLogin>
            </div>
            <button onClick={onSignup} className="font-IBM font-thin m-1 w-4/5 py-1 rounded text-gray-500 transition-colors duration-150 border border-gray-300 focus:shadow-outline hover:bg-gray-300 hover:text-white">회원가입</button>
          </div>
    
        </>}
        {session && <>
          로그인 되었습니다. <br/>
          <button onClick={() => signOut()}>Sign out</button>
        </>}
      </div>
    </Layout>
  </>
}

export default Login
