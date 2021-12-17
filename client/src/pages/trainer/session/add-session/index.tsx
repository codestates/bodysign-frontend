import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../../../../components/Layout'
import { useMutation, useReactiveVar } from '@apollo/client'
import { selectedUserVar } from '../../../../graphql/vars'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/dist/client/router'
import { CreateSessionDocument } from '../../../../graphql/graphql'

const AddSession: NextPage = () => {
	const router = useRouter()
	const selectedUser = useReactiveVar(selectedUserVar)
	const [startDate, setStartDate] = useState(new Date())
	const [createSession] = useMutation(CreateSessionDocument)

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5 font-IBM">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px] font-bold">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-7 h-7 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={() => {
									selectedUserVar({
										userId: 0,
										userName: '',
										gender: ''
									})
									router.push('/trainer/session')
								}}>
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
								className="mr-2 w-7 h-7 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={async () => {
									try {
										await createSession({
											variables: {
												createSessionInput: {
													userId: selectedUser.userId,
													trainerId: 21,
													date: startDate,
													status: 'active',
													feedback: ''
												}
											}
										})
										selectedUserVar({
											userId: 0,
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
									strokeWidth={1.5}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</span>
					</div>

					<div className="mt-4">
						<div className="text-[12px] font-medium">회원</div>
						{selectedUser.userName === '' ? (
							<Link href="/trainer/session/add-session/select-member">
								<button className="text-[12px] w-full p-2 mt-1 border font-thin rounded-3xl">
									회원 선택
								</button>
							</Link>
						) : (
							<div className="w-full p-3 mt-1 font-thin border flex">
								{selectedUserVar().gender === 'male' ? (
									<img
										src="https://img.icons8.com/emoji/48/000000/man-raising-hand.png"
										width="25"
										height="25"
									/>
								) : (
									<img
										src="https://img.icons8.com/emoji/48/000000/woman-raising-hand.png"
										width="25"
										height="25"
									/>
								)}
								<div className="ml-2">
									{selectedUserVar().userName} 회원님
								</div>
							</div>
						)}
					</div>

					<div className="mt-4">
						<div className="text-[12px] font-medium">날짜 / 시간</div>
						<div className="text-[12px] p-2 mt-1 text-center border font-thin rounded-3xl">
							<DatePicker
								className="text-center cursor-pointer"
								showTimeSelect
								selected={startDate}
								onChange={date => setStartDate(date as any)}
							/>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default AddSession
