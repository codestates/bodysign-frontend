import type { NextPage } from 'next'
import { useState } from 'react'
import ChangePasswordModal from './changePasswordModal'
import Layout from '../../../components/Layout'

const userInfo: NextPage = () => {
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

	const editUserInfo = () => {
		// 클릭하면 정보 수정 화면으로 라우팅
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

				<div className="flex items-center mb-10">
					<svg
						className="m-2"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15">
						<path
							d="M6.854 5.854l.353-.354-.707-.707-.354.353.708.708zM4.5 7.5l-.354-.354-.353.354.353.354L4.5 7.5zm1.646 2.354l.354.353.707-.707-.353-.354-.708.708zM7.5.5V0v.5zm7 7h.5-.5zm-14 0H1 .5zm7 7V14v.5zM6.146 5.146l-2 2 .708.708 2-2-.708-.708zm-2 2.708l2 2 .708-.708-2-2-.708.708zM4.5 8H11V7H4.5v1zm3-7A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zM1 7.5A6.5 6.5 0 017.5 1V0A7.5 7.5 0 000 7.5h1zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zm0 1A7.5 7.5 0 0015 7.5h-1A6.5 6.5 0 017.5 14v1z"
							fill="currentColor"></path>
					</svg>
					<div className="font-bold text-[20px]">내 정보</div>
					<svg
						onClick={editUserInfo}
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15">
						<path
							d="M.5 9.5l-.354-.354L0 9.293V9.5h.5zm9-9l.354-.354a.5.5 0 00-.708 0L9.5.5zm5 5l.354.354a.5.5 0 000-.708L14.5 5.5zm-9 9v.5h.207l.147-.146L5.5 14.5zm-5 0H0a.5.5 0 00.5.5v-.5zm.354-4.646l9-9-.708-.708-9 9 .708.708zm8.292-9l5 5 .708-.708-5-5-.708.708zm5 4.292l-9 9 .708.708 9-9-.708-.708zM5.5 14h-5v1h5v-1zm-4.5.5v-5H0v5h1zM6.146 3.854l5 5 .708-.708-5-5-.708.708zM8 15h7v-1H8v1z"
							fill="currentColor"></path>
					</svg>
				</div>
				<table>
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
					className="w-20 p-1 m-1 text-xs border">
					비밀번호 변경
				</button>
				<div
					onClick={deleteUserHandler}
					className="m-1 text-xs text-red-600">
					회원탈퇴
				</div>
			</div>
		</Layout>
	)
}

export default userInfo
