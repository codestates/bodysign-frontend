import React, { useState } from 'react'
import type { NextPage } from 'next'

const AddInbody: NextPage = ({ inbodyModalOpenhandler, isOpen }) => {

    const [ newInbodyData, setNewInbodyData ] = useState({
        date: "2021.01.01",
        weight: 0,
        muscle_mass: 0,
        body_fat: 0
    })

    const addDate = (e: any) => {
        let date = e.target.value

        setNewInbodyData({
            ...newInbodyData,
            date: date
        })
    }

    const addWeight = (e: any) => {
        let weight = e.target.value

        setNewInbodyData({
            ...newInbodyData,
            weight: weight
        })
    }

    const addMuscleMass = (e: any) => {
        let muscleMass = e.target.value

        setNewInbodyData({
            ...newInbodyData,
            muscle_mass: muscleMass
        })
    }

    const addBodyFat = (e: any) => {
        let bodyFat = e.target.value

        setNewInbodyData({
            ...newInbodyData,
            body_fat: bodyFat
        })
    }

    const saveInbodyData = () => {
        // 서버로 입력한 인바디 데이터(newInbodyData) 보내주기
    }

    const modalCloseHandler = () => {
        inbodyModalOpenhandler(!isOpen)
    }

	return (
        <>
        <div onClick={modalCloseHandler} className="modal-overlay absolute w-full h-full top-0 left-0 bg-black opacity-70"></div>
        <div className="modal-container absolute item-center bg-white w-8/12 mx-auto right-0 left-0 rounded shadow-lg z-50 overflow-y-auto p-3">
            <div className="text-center mb-2">인바디 등록</div>
            <div className="text-center items-center mb-2">
                <input onChange={addDate} className="text-xs rounded-xl border p-1 px-3 m-1 w-4/5" type="text" placeholder="날짜" />
                <input onChange={addWeight} className="text-xs rounded-xl border p-1 px-3 m-1 w-4/5" type="text" placeholder="체중 (kg)" />
                <input onChange={addMuscleMass} className="text-xs rounded-xl border p-1 px-3 m-1 w-4/5" type="text" placeholder="골격근량 (kg)" />
                <input onChange={addBodyFat} className="text-xs rounded-xl border p-1 px-3 m-1 w-4/5" type="text" placeholder="체지방량 (kg)" />
            </div>
            <div className="flex float-right">
                <button onClick={modalCloseHandler} className="text-xs w-10 flex items-center justify-center py-1.5 border rounded hover:bg-gray-300 mx-1">취소</button>
                <button onClick={saveInbodyData} className="text-xs w-10 flex items-center justify-center py-1.5 border rounded mx-1 text-white bg-gray-500 hover:bg-white hover:text-black">등록</button>
            </div>
		</div>
        </>
	)
}

export default AddInbody