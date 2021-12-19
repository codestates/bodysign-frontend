import React, { useState } from 'react'
import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import Layout from '../components/Layout'
import Loading from './Loading'
import { gql, useQuery, useMutation, useReactiveVar } from '@apollo/client'
import { loginTypeVar, accessTokenVar } from '../graphql/vars'
import Link from 'next/link'

// TODO : env로 빼야함
const GOOGLE_CLIENT_ID =
	'228447519514-17eoff0h38vfipbkd7ata2gtt7e2bbo7.apps.googleusercontent.com'

// TODO : 유저/트레이너 타입을 받아서 각각 페이지로 라우팅하기

const LOGIN = gql`
	mutation LoginAuth($loginUserInput: LoginUserInput!) {
		loginAuth(loginUserInput: $loginUserInput) {
			accessToken
		}
	}
`

const Login: NextPage = () => {
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	const [loginAuth, { data, loading, error }] = useMutation(LOGIN)
	const loginType = useReactiveVar(loginTypeVar)

	const [session, pageLoading] = useSession()

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

	const onSubmit = (e: any) => {
		loginAuth({
			variables: {
				loginUserInput: {
					...form
				}
			}
		})

		// TODO: 로그인이 완료 되면 액세스 토큰을 받아와서 쿠키에 저장해서 요청할 때 마다 토큰 보내주기
		// TODO: 토큰이 필요한 요청들을 리스트업
		// TODO: 필요한 요청의 HEADER에 토큰이 들어갈 수 있게 구현
		// TODO: 전역변수에 액세스토큰 담기
		//? 왜 두번 눌러야 들어오지?
		if (loading) {
			console.log('loading')
			console.log(data)
		} else {
			const accessToken = data.loginAuth.accessToken
			console.log('get')
			accessTokenVar(accessToken)
		}
	}

	const onGoogleLogin = () => {
		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:4000/auth/google&response_type=token&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
		include_granted_scopes=true`
	}

    return <>
    <Layout variant="Web">
      <div className="flex flex-col mx-auto my-5 text-[15px]">
        {!session && <>
          <div className="max-w-screen-md">
            <input className="font-IBM font-thin rounded-xl border p-1 m-1 w-4/5" type="text" placeholder="이메일" onChange={onChangeId} />
            <input className="font-IBM font-thin rounded-xl border p-1 m-1 w-4/5" type="password" placeholder="비밀번호" onChange={onChangePassword}/>
            <button onClick={onSubmit} className="font-IBM font-thin py-1 rounded text-gray-800 bg-gray-300 hover:bg-gray-400 hover:text-white m-1 w-4/5 ">
              로그인
            </button>
			<button onClick={onGoogleLogin} className="font-IBM font-thin py-1 rounded text-gray-800 bg-gray-200 hover:bg-gray-400 hover:text-white m-1 w-4/5 ">
              GOOGLE로 로그인
            </button>
            <div className="flex w-4/5 border-0">
            </div>
			<Link href="/signup">
            <button className="font-IBM font-thin m-1 w-4/5 py-1 rounded text-gray-500 transition-colors duration-150 border border-gray-300 focus:shadow-outline hover:bg-gray-300 hover:text-white">회원가입</button>
			</Link>
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
