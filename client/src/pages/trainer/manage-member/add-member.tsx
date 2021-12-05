import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import { useReactiveVar } from '@apollo/client'

interface FormInput {
	session_date: string
	cost: string
	times: number
	permission: number
}

const Info: NextPage = () => {

    const [ inputName, setInputName ] = useState("")
    const [ inputPhoneNumber, setInputPhoneNumber ] = useState("")
    const [ gender, setGender ] = useState("")

    const member_category_dummy = ['다이어트', '바디프로필', '스트렝스']

    const inputNameHandler = (e) => {
        let name = e.target.value
        setInputName(name)
    }

    const inputPhoneNumberHandler = (e) => {
        let phoneNumber = e.target.value
        setInputPhoneNumber(phoneNumber)
    }

    const addMemberHandler = () => {
        // 서버로 회원 정보 데이터 보내서 저장하기
    }


	return (
		<>
			<Layout variant="Web">
				<div className="font-IBM flex flex-col justify-center mx-4 my-5">
					<div className="flex flex-col justify-between">
						<div className="flex text-[20px]">
                            <span className="flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="self-center w-6 h-6"
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
                            </span>
							<span className="font-bold flex">
								회원정보등록
							</span>
                            <span className="flex mr-3">
                                <svg onClick={addMemberHandler} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
						</div>
					</div>
                    <div className="flex flex-col mt-5 mx-2">
                        <div>
                            <div className="text-[10px] mx-1 mt-1">이름</div>
                            <input onChange={inputNameHandler} className="border bg-gray-100 rounded-2xl px-3 w-full" />
                            <div className="text-[10px] mx-1 mt-1">전화번호</div>
                            <input onChange={inputPhoneNumberHandler} className="border bg-gray-100 rounded-2xl px-3 w-full" />
                        </div>
                        <div className="flex justify-center mt-1 w-full">
                            <div onClick={() => setGender("male")} className="bg-gray-100 w-1/2 border mr-1 mt-1 text-center p-1 text-[12px] rounded-2xl font-thin hover:bg-gray-200">남</div>
                            <div onClick={() => setGender("female")} className="bg-gray-100 w-1/2 border ml-1 mt-1 text-center p-1 text-[12px] rounded-2xl font-thin hover:bg-gray-200">녀</div>
                        </div>
					</div>
                    <div className="flex justify-between mt-3 mx-3 text-[10px]">
                        <span>카테고리</span>
                        <select
                            className="bg-white border"
                            onChange={e => {
                                // 회원 카테고리 변경 API
                                // e.target.value
                            }}>
                            <option value="">회원 카테고리</option>
                            {member_category_dummy.map((category, idx) => (
                                <option key={idx}>{category}</option>
                            ))}
                        </select>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Info
