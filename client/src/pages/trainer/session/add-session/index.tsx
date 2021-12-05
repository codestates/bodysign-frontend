import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../../../../components/Layout'
import { useReactiveVar } from '@apollo/client'
import { selectedMemberVar } from '../../../../graphql/vars'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AddSession: NextPage = () => {
	const [startDate, setStartDate] = useState(new Date())
	const selectedMember = useReactiveVar(selectedMemberVar)

	// 수업 추가 API
	// console.log(selectedMember, startDate)

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5 font-IBM">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px] font-bold">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-7 h-7"
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
							<div>수업추가</div>
						</span>
						<span className="flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2 w-7 h-7"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</span>
					</div>

					<div className="mt-4">
						<div className="text-[12px] font-medium">회원</div>
						{selectedMember === '' ? (
							<Link href="/trainer/session/add-session/select-member">
								<button className="text-[12px] w-full p-2 mt-1 border font-thin rounded-3xl">
									회원 선택
								</button>
							</Link>
						) : (
							<div className="w-full p-3 mt-1 border font-thin">
								{selectedMemberVar()} 회원님
							</div>
						)}
					</div>

					<div className="mt-4">
						<div className="text-[12px] font-medium">날짜 / 시간</div>
						<div className="text-[12px] p-2 mt-1 text-center border font-thin rounded-3xl">
							<DatePicker
								className="text-center"
								showTimeSelect
								selected={startDate}
								onChange={date => setStartDate(date as any)}
							/>
						</div>
					</div>

					{/* <div className="mt-4">
						<div className="text-[16px]">날짜</div>
						<input className="w-full p-3 mt-1 border" type="date" />
					</div>

					<div className="mt-4">
						<div className="text-[16px]">시간</div>
						<input className="w-full p-3 mt-1 border" type="time" />
					</div> */}
				</div>
			</Layout>
		</>
	)
}

export default AddSession
