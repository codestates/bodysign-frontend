import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCreateSessionMutation } from '../../../../generated/graphql'
import { userDataVar } from '../../../../graphql/vars'
import useSessionStorage from '../../../../hooks/useSessionStorage'

const AddSession: NextPage = () => {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)
	const [startDate, setStartDate] = useState(new Date())
	const [mangedMemberInfo, setMangedMemberInfo] =
		useSessionStorage('mangedMemberInfo')
	const [createSession] = useCreateSessionMutation()

	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem]">
					<Link href="/trainer/session" passHref>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="self-center w-[2.8rem] h-[2.8rem] cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={() => {
								setMangedMemberInfo({
									userId: 0,
									emailId: '',
									userName: '',
									gender: ''
								})
							}}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</Link>
					<div className="ml-[0.8rem] font-bold">일정 추가</div>
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer w-[3.6rem] h-[3.6rem] text-[#FED06E]"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					onClick={async () => {
						try {
							await createSession({
								variables: {
									createSessionInput: {
										userId: mangedMemberInfo.userId,
										trainerId: userData?.id as number,
										date: startDate,
										status: 'active',
										feedback: ''
									}
								}
							})
							setMangedMemberInfo({
								userId: 0,
								emailId: '',
								userName: '',
								gender: ''
							})
							router.push('/trainer/session')
						} catch (error) {
							alert('세션 추가에 실패했습니다. 다시 시도해 주세요.')
						}
					}}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>

			<div className="mt-[2.4rem]">
				<div className="text-[1.8rem] font-semibold">회원</div>
				{mangedMemberInfo && mangedMemberInfo.userName === '' ? (
					<Link href="/trainer/session/add-session/select-member" passHref>
						<button className="w-full h-[7rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white">
							회원 선택
						</button>
					</Link>
				) : (
					<div className="h-[7rem] flex items-center justify-center mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white ">
						{mangedMemberInfo && mangedMemberInfo.gender === 'male' ? (
							<Image src="/man.png" width="25" height="25" alt="image" />
						) : (
							<Image src="/woman.png" width="25" height="25" alt="image" />
						)}
						<div className="ml-[0.8rem]">
							{mangedMemberInfo && mangedMemberInfo.userName} 회원님
						</div>
					</div>
				)}
			</div>

			<div className="mt-[2.4rem]">
				<div className="text-[1.8rem] font-semibold">날짜 / 시간</div>
				<div className="h-[7rem] flex items-center justify-center mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white">
					<DatePicker
						className="text-center cursor-pointer"
						showTimeSelect
						selected={startDate}
						onChange={date => setStartDate(date as any)}
					/>
				</div>
			</div>
		</>
	)
}

export default AddSession
