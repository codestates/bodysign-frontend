import React, { useState } from 'react'
import type { NextPage } from 'next'

const ChangePasswordModal: NextPage = ({ passwordModalOpenhandler, isOpen }) => {

    const [ passwordData, setPasswordData ] = useState({
        oldPasswordInput: "",
        newPasswordInput: ""
    })

    const setOldPasswordInput = (e: any) => {
        let oldPasswordInput = e.target.value

        setPasswordData({
            ...passwordData,
            oldPasswordInput: oldPasswordInput
        })
    }

    const setNewPasswordInput = (e: any) => {
        let newPasswordInput = e.target.value

        setPasswordData({
            ...passwordData,
            newPasswordInput: newPasswordInput
        })
    }

    const checkNewPassword = (e: any) => {
        let confirmPassword = e.target.value
        
        if(passwordData.newPasswordInput === confirmPassword) {
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
        // oldPasswordInput 데이터를 서버로 보내주기
        // oldPasswordInput 정보가 맞는지 체크
        // 맞으면? newPasswordInput 으로 패스워드 교체
        // 틀리면? 틀렸다 메시지 보내기
    }

    const modalCloseHandler = () => {
        passwordModalOpenhandler(!isOpen)
    }

	return (
        <>
        <div onClick={modalCloseHandler} className="modal-overlay absolute w-full h-full top-0 left-0 bg-black opacity-70"></div>
        <div className="modal-container absolute item-center bg-white w-8/12 mx-auto right-0 left-0 rounded shadow-lg z-50 overflow-y-auto p-3">
            <div className="text-center mb-2">비밀번호 변경</div>
            <div className="text-center items-center mb-2">
                <input onChange={setOldPasswordInput} className="current-password text-xs rounded-xl border p-1 px-3 m-1 w-4/5 outline-none" type="text" placeholder="현재 비밀번호" />
                <input onChange={setNewPasswordInput} className="new-password text-xs rounded-xl border p-1 px-3 m-1 w-4/5 outline-none" type="password" placeholder="새 비밀번호" />
                <input onChange={checkNewPassword} className="confirm-password text-xs rounded-xl border p-1 px-3 m-1 w-4/5 outline-none" type="password" placeholder="비밀번호 확인" />
            </div>
            <div className="flex float-right">
                <button onClick={modalCloseHandler} className="text-xs w-10 flex items-center justify-center py-1.5 border rounded hover:bg-gray-300 mx-1">취소</button>
                <button onClick={savePasswordData} className="text-xs w-10 flex items-center justify-center py-1.5 border rounded mx-1 text-white bg-gray-500 hover:bg-white hover:text-black">등록</button>
            </div>
		</div>
        </>
	)
}

export default ChangePasswordModal