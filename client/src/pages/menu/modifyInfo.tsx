import type { NextPage } from 'next'
import { useState } from 'react'

const modifyInfo: NextPage = () => {

    const [ userInfo, setUserInfo ] = useState({
        name: "홍길동",
        sex: "남",
        email: "c.designer@kakao",
        birth: "2000.01.01",
        phone: "010-1234-5678"
    })

    const getNewName = (e :any) => {
        let name = e.target.value

        setUserInfo({
            ...userInfo,
            name: name
        })
    }

    const getNewSex = (e :any) => {
        let sex = e.target.value

        setUserInfo({
            ...userInfo,
            sex: sex
        })
    }

    const getNewEmail = (e :any) => {
        let email = e.target.value

        setUserInfo({
            ...userInfo,
            email: email
        })
    }

    const getNewPhone = (e :any) => {
        let phone = e.target.value

        setUserInfo({
            ...userInfo,
            phone: phone
        })
    }

    const getNewBirth = (e :any) => {
        let birth = e.target.value

        setUserInfo({
            ...userInfo,
            birth: birth
        })
    }

    const saveInfo = () => {
        // 서버로 저장된 정보 보내주기
        alert('수정이 완료되었습니다.')
        // 이전 페이지로 이동
        console.log(userInfo)
    }

	return (
		<div className="flex flex-col m-5">
            <div className="flex mb-10 items-center">
                <svg className="m-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M6.854 5.854l.353-.354-.707-.707-.354.353.708.708zM4.5 7.5l-.354-.354-.353.354.353.354L4.5 7.5zm1.646 2.354l.354.353.707-.707-.353-.354-.708.708zM7.5.5V0v.5zm7 7h.5-.5zm-14 0H1 .5zm7 7V14v.5zM6.146 5.146l-2 2 .708.708 2-2-.708-.708zm-2 2.708l2 2 .708-.708-2-2-.708.708zM4.5 8H11V7H4.5v1zm3-7A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zM1 7.5A6.5 6.5 0 017.5 1V0A7.5 7.5 0 000 7.5h1zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zm0 1A7.5 7.5 0 0015 7.5h-1A6.5 6.5 0 017.5 14v1z" fill="currentColor"></path></svg>
                <div className="font-bold">
                    정보 수정
                </div>
                <svg onClick={saveInfo} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M1 7l4.5 4.5L14 3" stroke="currentColor" stroke-linecap="square"></path></svg>
            </div>
            <table>
                <tbody>
                    <tr className="flex">
                        <td className="flex-auto font-bold">이름</td>
                        <td className="text-right"><input value={userInfo.name} onChange={getNewName} /></td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-auto font-bold">성별</td>
                        <td className="text-right"><input value={userInfo.sex} onChange={getNewSex} /></td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-auto font-bold">이메일</td>
                        <td className="text-right"><input value={userInfo.email} onChange={getNewEmail} /></td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-auto font-bold">생년월일</td>
                        <td className="text-right"><input value={userInfo.birth} onChange={getNewBirth} /></td>
                    </tr>
                    <tr className="flex">
                        <td className="flex-auto font-bold">전화번호</td>
                        <td className="text-right"><input value={userInfo.phone} onChange={getNewPhone} /></td>
                    </tr>
                </tbody>
            </table>
		</div>
	)
}

export default modifyInfo