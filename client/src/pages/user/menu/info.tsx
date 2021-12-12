import type { NextPage } from 'next'
import { useState } from 'react'
import ChangePasswordModal from '../../../components/changePasswordModal'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { gql, useQuery, useMutation, useReactiveVar } from '@apollo/client';

// TODO: 회원 탈퇴
// TODO: 비밀번호 변경

export const UserDocument = gql`
	query User($id: Int!) {
		user(id: $id) {
			__typename
			id
			email
			userName
			birthDate
			phoneNumber
			gender
			graduate
		}
	}
`

const Info: NextPage = () => {
	const { loading, data } = useQuery(UserDocument)
	
	const [userInfo, setUserInfo] = useState({
		name: '홍길동',
		gender: '남',
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
			<div className="font-IBM flex flex-col justify-center mx-4 my-5 text-[12px]">
				{isPasswordModalOpen ? (
					<ChangePasswordModal
						isOpen={isPasswordModalOpen}
						passwordModalOpenhandler={changePasswordModal}
					/>
				) : null}
				<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
							<Link href="/user/menu">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="self-center w-6 h-6 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							</Link>
							<div className="font-bold">
								내 정보
							</div>
						</span>
						<Link href="/user/menu/modify">
						<span className="flex">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
							<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
							<path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
							</svg>
						</span>
						</Link>
					</div>
					<div className="mt-4">
						<div className="flex flex-col justify-between px-3 py-3">
							<div className="flex justify-between">
								<span>이름</span>
								<span className="font-thin">{userInfo.name}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>성별</span>
								<span className="font-thin">{userInfo.gender}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>이메일</span>
								<span className="font-thin">{userInfo.email}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>생년월일</span>
								<span className="font-thin">{userInfo.birth}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>전화번호</span>
								<span className="font-thin">{userInfo.phone}</span>
							</div>

							<div className="flex-col mx-5 mt-4">
								<button
									onClick={changePasswordModal}
									className="font-thin w-20 p-1 my-2 text-[10px] border float-right hover:bg-gray-50">
									비밀번호 변경
								</button>
								<div
									onClick={deleteUserHandler}
									className="inline-block mt-10 text-[6px] text-red-600 hover:text-gray-400 hover:cursor-pointer">
									회원탈퇴
								</div>
							</div>
						</div>
					</div>
			</div>
		</Layout>
	)
}

export default Info
