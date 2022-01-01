import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Layout from '../../../../components/Layout'
import { useCreateSessionMutation } from '../../../../generated/graphql'
import { managedUserInfoVar, userDataVar } from '../../../../graphql/vars'

const AddSession: NextPage = () => {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)
	const managedUserInfo = useReactiveVar(managedUserInfoVar)
	const [startDate, setStartDate] = useState(new Date())
	const [createSession] = useCreateSessionMutation()

	return (
		<>
			<Layout>
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
									managedUserInfoVar({
										userId: 0,
										email: '',
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
						className="cursor-pointer w-[3.6rem] h-[3.6rem] text-[#FDAD00]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						onClick={async () => {
							try {
								await createSession({
									variables: {
										createSessionInput: {
											userId: managedUserInfo.userId,
											trainerId: userData?.id as number,
											date: startDate,
											status: 'active',
											feedback: ''
										}
									}
								})
								managedUserInfoVar({
									userId: 0,
									email: '',
									userName: '',
									gender: ''
								})
								router.push('/trainer/session')
							} catch (error) {
								console.log(error)
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
					{managedUserInfo.userName === '' ? (
						<Link
							href="/trainer/session/add-session/select-member"
							passHref>
							<button className="w-full h-[7rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white">
								회원 선택
							</button>
						</Link>
					) : (
						<div className="h-[7rem] flex items-center justify-center mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white ">
							{managedUserInfoVar().gender === 'male' ? (
								<Image src="/man.png" width="25" height="25" alt="image" />
							) : (
								<Image
									src="/woman.png"
									width="25"
									height="25"
									alt="image"
								/>
							)}
							<div className="ml-[0.8rem]">
								{managedUserInfoVar().userName} 회원님
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
			</Layout>
		</>
	)
}

export default AddSession
