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
		// 아래에 회원 정보 보여주기
	}

	return (
		<>
		<div onClick={addMemberModalHandler} className="modal-overlay absolute w-full h-full top-0 left-0 bg-black opacity-70 font-IBM font-thin"></div>
			<div className="modal-container text-center bg-white w-8/12 mx-auto rounded shadow-lg z-999 overflow-y-auto p-3">
				<div className="font-IBM text-[12px] font-bold">회원 검색</div>
				<div className=""> 
					<input onChange={inputPhoneNumberHandler} placeholder="회원의 전화번호를 기입해 주세요." className="font-thin text-[12px] w-8/12 border rounded-2xl p-1 px-2 m-1" type="text" />
					<button onClick={findUserHandler} className="text-[10px] border bg-gray-300 p-1.5 rounded-xl">검색</button>
				</div>
				{
					findUser ? 
					<div className="text-green-600 text-[5px] m-1">검색 완료</div> 
					// 여기에 회원 정보 보여주기
					: 
					<div className="text-red-600 text-[5px] m-1">회원님을 찾을 수 없습니다.</div>
				}
				<div className="flex justify-between mt-7 text-[12px]">
					<span className="text-[8px]">카테고리</span>
					<select
						className="bg-white border text-[8px]"
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
		</>
	)
}

export default SearchMemberModal
