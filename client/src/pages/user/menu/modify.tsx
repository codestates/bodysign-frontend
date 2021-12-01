import type { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'

const Modify: NextPage = () => {
	const [userInfo, setUserInfo] = useState({
		name: '홍길동',
		sex: '남',
		email: 'c.designer@kakao',
		birth: '2000.01.01',
		phone: '010-1234-5678'
	})

	const getNewName = (e: any) => {
		let name = e.target.value

		setUserInfo({
			...userInfo,
			name: name
		})
	}

	const getNewSex = (e: any) => {
		let sex = e.target.value

		setUserInfo({
			...userInfo,
			sex: sex
		})
	}

	const getNewEmail = (e: any) => {
		let email = e.target.value

		setUserInfo({
			...userInfo,
			email: email
		})
	}

	const getNewPhone = (e: any) => {
		let phone = e.target.value

		setUserInfo({
			...userInfo,
			phone: phone
		})
	}

	const getNewBirth = (e: any) => {
		let birth = e.target.value

		setUserInfo({
			...userInfo,
			birth: birth
		})
	}

	const saveInfo = () => {
		// 서버로 저장된 정보 보내주기
		alert('수정이 완료되었습니다.')
		window.location.href = "/user/menu/info"
	}

	return (
		<Layout variant="Web">
		<div className="flex flex-col m-5 mx-4 my-5 text-[12px]">
			<div className="flex items-center mb-10">
				<Link href="/user/menu/info">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				</Link>
				<div className="font-bold text-[20px]">정보 수정</div>
				<svg onClick={saveInfo} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<table>
				<tbody>
					<tr className="flex">
						<td className="flex-auto font-bold">이름</td>
						<td className="text-right">
							<input value={userInfo.name} onChange={getNewName} />
						</td>
					</tr>
					<tr className="flex">
						<td className="flex-auto font-bold">성별</td>
						<td className="text-right">
							<input value={userInfo.sex} onChange={getNewSex} />
						</td>
					</tr>
					<tr className="flex">
						<td className="flex-auto font-bold">이메일</td>
						<td className="text-right">
							<input value={userInfo.email} onChange={getNewEmail} />
						</td>
					</tr>
					<tr className="flex">
						<td className="flex-auto font-bold">생년월일</td>
						<td className="text-right">
							<input value={userInfo.birth} onChange={getNewBirth} />
						</td>
					</tr>
					<tr className="flex">
						<td className="flex-auto font-bold">전화번호</td>
						<td className="text-right">
							<input value={userInfo.phone} onChange={getNewPhone} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		</Layout>
	)
}

export default Modify
