import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../../components/Layout'
import { modalVar } from '../../../../graphql/vars'
import { useReactiveVar } from '@apollo/client'
import dummytotalsession from '../../../../../dummyTotalSession.json'

interface FormInput {
	session_date: string
	cost: string
	times: number
	permission: number
}

const Info: NextPage = () => {
	const modal = useReactiveVar(modalVar)

	const member_dummy = {
		id: '1',
		email: 'jsmsumin1234@naver.com',
		name: 'Alice',
		birth: '2020.11.13',
		phone: '12345678',
		gender: 'male',
		graduate: 'false',
		time: '14:00',
		times: '8/10',
		date: '2021-11-05',
		membercategory: '바디프로필'
	}
	const member_category_dummy = ['다이어트', '바디프로필', '스트렝스']

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		let test = { ...data }
		console.log(test)
		// 세션 추가 API
	}

	return (
		<>
			<Layout variant="Web">
				<div className="font-IBM flex flex-col justify-center mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
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
							<div className="font-bold">
								{member_dummy.name} 회원님
							</div>
						</span>
						<span className="flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 mr-3"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
								/>
							</svg>
						</span>
					</div>

					<div className="flex justify-between pr-3 mt-4 text-[12px]">
						<span className="pb-1 ml-0 border-b border-black cursor-pointer">
							회원정보
						</span>
						<Link href="/trainer/manage-member/emailId/sessions">
							<span className="ml-2 cursor-pointer">수업기록</span>
						</Link>
						<Link href="/trainer/manage-member/emailId/inbody">
							<span className="ml-2 cursor-pointer">인바디</span>
						</Link>
					</div>

					<div className="mt-4">
						<div className="flex flex-col justify-between px-3 py-3 border text-[12px]">
							<div className="flex justify-between">
								<span>이름</span>
								<span>{member_dummy.name}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>성별</span>
								<span>{member_dummy.gender}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>생년월일</span>
								<span>{member_dummy.birth}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>전화번호</span>
								<span>{member_dummy.phone}</span>
							</div>
							<div className="flex justify-between mt-1">
								<span>졸업유무</span>
								<span className="relative inline-block w-10 align-middle select-none">
									<input
										className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox"
										type="checkbox"
										name="toggle"
										id="toggle"
										onChange={e => {
											// 졸업 유무 변경 API
											// 데이터를 받고 checked 상태를 변경한다.
											// e.target.checked을 가지고 mutation
										}}
									/>
									<label
										className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"
										htmlFor="toggle"
									/>
								</span>
							</div>
							<div className="flex justify-between mt-1">
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
					</div>
					<div className="flex flex-col mt-4 text-[12px]">
						<div className="p-3 text-center">세션</div>
						<div className="border-b border-gray-200">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="p-3 text-[12px] text-left text-gray-500">
											날짜
										</th>
										<th className="p-3 text-[12px] text-left text-gray-500">
											단가
										</th>
										<th className="p-3 text-[12px] text-left text-gray-500">
											횟수
										</th>
										<th className="p-3 text-[12px] text-left text-gray-500">
											총액
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{dummytotalsession
										.sort((a, b): any => {
											const dateA = new Date(a.session_date).getTime()
											const dateB = new Date(b.session_date).getTime()
											if (dateA > dateB) return 1
											if (dateA < dateB) return -1
											return 0
										})
										.map(session => {
											return (
												<React.Fragment key={session.id}>
													<tr>
														<td className="p-2 text-[12px] text-gray-500 font-thin">
															{session.session_date}
														</td>
														<td className="p-2 text-[12px] text-gray-500 font-thin">
															{session.cost}원
														</td>
														<td className="p-2 text-[12px] text-gray-500 font-thin">
															{session.times}회
														</td>
														<td className="p-2 text-[12px] text-gray-500">
															{session.cost * session.times}원
														</td>
													</tr>
												</React.Fragment>
											)
										})}
								</tbody>
							</table>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="self-center w-6 h-6 mt-4 text-gray-500 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={() => modalVar(true)}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</div>
				</div>

				{modal ? (
					<div className="font-IBM fixed max-w-[450px] w-full bottom-0">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col py-10">
							<div className="py-3 text-center text-[20px]">세션 추가</div>
							<form
								className="flex flex-col mt-4"
								onSubmit={handleSubmit(onSubmit)}>
								<input
									className="w-full h-12 px-10 border"
									type="date"
									placeholder="날짜"
									{...register('session_date', {
										required: true
									})}
								/>
								{errors.session_date && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										세션 날짜를 선택해주세요.
									</div>
								)}
								<input
									className="w-full h-12 px-10 mt-1 border"
									type="text"
									placeholder="회당 수업 단가(원)"
									{...register('cost', {
										required: true
									})}
								/>
								{errors.cost && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										세션 회당 수업 단가(원)를 입력해주세요.
									</div>
								)}
								<input
									className="w-full h-12 px-10 mt-1 border"
									type="text"
									placeholder="세션 횟수"
									{...register('times', {
										required: true,
										minLength: 1
									})}
								/>
								{errors.times && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										세션 횟수를 입력해주세요.
									</div>
								)}
								<input
									className="w-full h-12 px-10 mt-1 border"
									type="text"
									placeholder="정산 금액(원)"
									{...register('permission', {
										required: true
									})}
								/>
								{errors.permission && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										정산 금액(원)을 입력해주세요.
									</div>
								)}

								<div className="max-w-[450px] self-end mt-4">
									<button
										className="px-4 py-3 bg-gray-100 border"
										onClick={() => modalVar(false)}>
										취소
									</button>
									<button
										className="px-4 py-3 mx-3 bg-yellow-100 border"
										type="submit">
										추가
									</button>
								</div>
							</form>
						</div>
					</div>
				) : null}
			</Layout>
		</>
	)
}

export default Info
