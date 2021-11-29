import React, { useState } from 'react'
import type { NextPage } from 'next'
import AddInbody from '../addInbody'

// TODO: 인바디 차트 라이브러리 찾기

const inbody: NextPage = () => {

    const [ isInbodyModalOpen, setIsInbodyModalOpen ] = useState(false)

    const [ inbodyDataList, setInbodyDataList ] = useState([
        {
            date: "2021.01.01",
            weight: 0,
            muscle_mass: 0,
            body_fat: 0
        },
    ])

    const moveBack = () => {
        // 뒤로가기
    }

    const getInbodyDate = () => {
        // 인바디 가져오기
    }

    const addInbodyData = () => {
        // 인바디 추가하기
        setIsInbodyModalOpen(!isInbodyModalOpen)
        // 추가하고 나면 서버에서 다시 인바디 데이터 받아오기
    }

	return (
		<div className="flex flex-col m-5">
            <div className="flex mb-10 items-center">
            <svg onClick={moveBack} className="m-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M6.854 5.854l.353-.354-.707-.707-.354.353.708.708zM4.5 7.5l-.354-.354-.353.354.353.354L4.5 7.5zm1.646 2.354l.354.353.707-.707-.353-.354-.708.708zM7.5.5V0v.5zm7 7h.5-.5zm-14 0H1 .5zm7 7V14v.5zM6.146 5.146l-2 2 .708.708 2-2-.708-.708zm-2 2.708l2 2 .708-.708-2-2-.708.708zM4.5 8H11V7H4.5v1zm3-7A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zM1 7.5A6.5 6.5 0 017.5 1V0A7.5 7.5 0 000 7.5h1zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zm0 1A7.5 7.5 0 0015 7.5h-1A6.5 6.5 0 017.5 14v1z" fill="currentColor"></path></svg>
                <div className="font-bold">
                    인바디
                </div>
            </div>
            <div className="h-50 bg-gray-300 mb-3">인바디 차트 그림 삽입 예정</div>
            <table className="text-center border text-xs">
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>체중</th>
                        <th>골격근량</th>
                        <th>체지방</th>
                    </tr>
                </thead>
                <tbody>
                    {inbodyDataList.map((inbodyData) => {
                        return (
                            <tr>
                                <td>{inbodyData.date}</td>
                                <td>{inbodyData.weight}</td>
                                <td>{inbodyData.muscle_mass}</td>
                                <td>{inbodyData.body_fat}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <svg onClick={addInbodyData} className="self-center m-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7.5 4v7M4 7.5h7m-3.5 7a7 7 0 110-14 7 7 0 010 14z" stroke="currentColor"></path></svg>
            { isInbodyModalOpen ? <AddInbody inbodyModalOpenhandler={setIsInbodyModalOpen} isOpen={isInbodyModalOpen} /> : null }
		</div>
	)
}

export default inbody