import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../components/Layout'

const SearchMemberModal: NextPage = ({ addMemberModalHandler, searchMemberModalHandler }) => {

	const [ inputPhoneNumber, setInputPhoneNumber ] = useState('')
	const [ findUser, setFindUser ] = useState(false)
	const member_category_dummy = ['다이어트', '바디프로필', '스트렝스']


	const inputPhoneNumberHandler = (e) => {
		let phoneNumber = ''
		phoneNumber = e.target.value

		setInputPhoneNumber(phoneNumber)
	}

	const findUserHandler = () => {
		// 돋보기 클릭하면 이 함수 실행
		// inputPhoneNumber 정보를 서버로 쿼리 날려서 있는지 없는지 확인
		// 있으면? findUser state 변경
	}

	return (
		<>
			<Layout variant="Web">
			<div onClick={addMemberModalHandler} className="modal-overlay absolute w-full h-full top-0 left-0 bg-black opacity-70 font-IBM font-thin"></div>
				<div className="modal-container text-center bg-white w-8/12 mx-auto rounded shadow-lg z-999 overflow-y-auto p-3">
					<div className="font-IBM text-[12px] font-bold">회원 검색</div>
					<div className=""> 
						<input onChange={inputPhoneNumberHandler} placeholder="회원의 전화번호를 기입해 주세요." className="text-[12px] w-8/12 border rounded-2xl p-1 px-2 m-1" type="text" />
						<svg onClick={findUserHandler} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 left-15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
					{
						findUser ? 
						<div className="text-green-600 text-[5px] m-1">검색 완료</div> 
						: 
						<div className="text-red-600 text-[5px] m-1">회원님을 찾을 수 없습니다.</div>
					}
					<div className="flex justify-between mt-7 text-[12px]">
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

export default SearchMemberModal
