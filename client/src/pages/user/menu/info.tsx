import type { NextPage } from 'next'
import { useState } from 'react'
import ChangePasswordModal from '../../../components/changePasswordModal'
import Layout from '../../../components/Layout'
import Link from 'next/link'

const Info: NextPage = () => {
	const [userInfo, setUserInfo] = useState({
		name: '홍길동',
		sex: '남',
		email: 'c.designer@kakao',
		birth: '2000.01.01',
		phone: '010-1234-5678'
	})
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

	const changePasswordModal = () => {
		setIsPasswordModalOpen(!isPasswordModalOpen)
	}

	const deleteUserHandler = () => {
		alert('정말 탈퇴하시겠습니까?')
		// 서버로 탈퇴 요청 보내기
	}

	return (
		<Layout variant="Web">
			<div className="flex flex-col m-5 mx-4 my-5 text-[12px]">
				{isPasswordModalOpen ? (
					<ChangePasswordModal
						isOpen={isPasswordModalOpen}
						passwordModalOpenhandler={changePasswordModal}
					/>
				) : null}

				<div className="flex content-center mb-10 mx-4 my-5 text-[12px] items-center">
					<Link href="/user/menu">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
					</Link>
					<div className="font-bold text-[20px] mx-1">내 정보</div>
					<Link href="/user/menu/modify">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
						<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
						<path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
						</svg>
					</Link>
				</div>
				<div className="flex-col mx-5">
					<table className="mx-auto w-3/4">
						<tbody>
							<tr className="flex">
								<td className="flex-auto font-bold">이름</td>
								<td className="text-right">{userInfo.name}</td>
							</tr>
							<tr className="flex">
								<td className="flex-auto font-bold">성별</td>
								<td className="text-right">{userInfo.sex}</td>
							</tr>
							<tr className="flex">
								<td className="flex-auto font-bold">이메일</td>
								<td className="text-right">{userInfo.email}</td>
							</tr>
							<tr className="flex">
								<td className="flex-auto font-bold">생년월일</td>
								<td className="text-right">{userInfo.birth}</td>
							</tr>
							<tr className="flex">
								<td className="flex-auto font-bold">전화번호</td>
								<td className="text-right">{userInfo.phone}</td>
							</tr>
						</tbody>
					</table>
					<button
						onClick={changePasswordModal}
						className="w-20 p-1 mx-10 my-3 text-xs border float-right">
						비밀번호 변경
					</button>
					<div
						onClick={deleteUserHandler}
						className="mx-10 mt-20 text-[8px] text-red-600">
						회원탈퇴
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Info
