import React, { useState } from 'react'
import type { NextPage } from 'next'
import { gql, useQuery, useMutation, useReactiveVar } from '@apollo/client';

export const UpdateUserPassword = gql`
	mutation UpdatePasswordUserInput($updatePasswordUserInput: UpdatePasswordUserInput!) {
		updatePasswordUser(updatePasswordUserInput: $updatePasswordUserInput) {
			id
			prevPassword
            nowPassword
		}
	}
`

const ChangePasswordModal: NextPage = ({ passwordModalOpenhandler, isOpen }) => {
    const [ updateUserPassword ] = useMutation(UpdateUserPassword)

    const [ passwordData, setPasswordData ] = useState({
        prevPassword: "",
        nowPassword: ""
    })

    const setOldPasswordInput = (e: any) => {
        let prevPassword = e.target.value

        setPasswordData({
            ...passwordData,
            prevPassword: prevPassword
        })
    }

    const setNewPasswordInput = (e: any) => {
        let nowPassword = e.target.value

        setPasswordData({
            ...passwordData,
            nowPassword: nowPassword
        })
    }

    const checkNewPassword = (e: any) => {
        let confirmPassword = e.target.value
        
        if(passwordData.nowPassword === confirmPassword) {
            let confirmPasswordInput = document.querySelector(".confirm-password")
            confirmPasswordInput?.classList.add("border-green-600")
            confirmPasswordInput?.classList.remove("border-red-400")
        } else {
            let confirmPasswordInput = document.querySelector(".confirm-password")
            confirmPasswordInput?.classList.add("border-red-400")
            confirmPasswordInput?.classList.remove("border-green-600")
        }
        
    }

    const savePasswordData = () => {
        // TODO: 뮤테이션 사용
        updateUserPassword({
			variables: {
				updateUserInput: {
                    id: 2,
					password: passwordData.prevPassword,
                    nowPassword: passwordData.nowPassword
				}
		    }
        })
    }

	const modalCloseHandler = () => {
		passwordModalOpenhandler(!isOpen)
	}

	return (
		<>
			<div
				onClick={modalCloseHandler}
				className="modal-overlay absolute w-full h-full top-0 left-0 bg-black opacity-70 font-IBM font-thin"></div>
			<div className="modal-container absolute item-center bg-white w-8/12 mx-auto right-0 left-0 rounded shadow-lg z-50 overflow-y-auto p-3">
				<div className="text-center mb-2">비밀번호 변경</div>
				<div className="text-center items-center mb-2">
					<input
						onChange={setOldPasswordInput}
						className="current-password text-xs rounded-xl border p-1 px-3 m-1 w-4/5 outline-none"
						type="text"
						placeholder="현재 비밀번호"
					/>
					<input
						onChange={setNewPasswordInput}
						className="new-password text-xs rounded-xl border p-1 px-3 m-1 w-4/5 outline-none"
						type="password"
						placeholder="새 비밀번호"
					/>
					<input
						onChange={checkNewPassword}
						className="confirm-password text-xs rounded-xl border p-1 px-3 m-1 w-4/5 outline-none"
						type="password"
						placeholder="비밀번호 확인"
					/>
				</div>
				<div className="flex float-right">
					<button
						onClick={modalCloseHandler}
						className="text-xs w-10 flex items-center justify-center py-1.5 border rounded hover:bg-gray-300 mx-1">
						취소
					</button>
					<button
						onClick={savePasswordData}
						className="text-xs w-10 flex items-center justify-center py-1.5 border rounded mx-1 text-white bg-gray-500 hover:bg-white hover:text-black">
						등록
					</button>
				</div>
			</div>
		</>
	)
}

export default ChangePasswordModal
