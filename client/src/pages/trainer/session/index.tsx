import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import session_dummy from '../../../../session_dummy.json'
import { modalVar } from '../../../graphql/vars'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import BottomBar from '../../../components/BottomBar'
import {
	TrainerDocument,
	UpdateSessionDocument,
	RemoveSessionDocument
} from '../../../graphql/graphql'
import Loading from '../../../components/Loading'

interface MemberSession {
	id: number
	userId: string
	gender: string
	date: string
}

const Session: NextPage = () => {
	const modal = useReactiveVar(modalVar)
	const [category, setCategory] = useState('일정')
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})
	const [updateSession] = useMutation(UpdateSessionDocument)
	const [removeSession] = useMutation(RemoveSessionDocument)

	const sessionObject: Record<string, MemberSession[]> = {}
	if (!loading && data) {
		let $Data = [...data.trainer.sessions]
		$Data
			.sort((a, b) => {
				const aDate = new Date(a.date).getTime()
				const bDate = new Date(b.date).getTime()
				return aDate > bDate ? 1 : -1
			})
			.forEach(session => {
				const date = session.date.split('T')[0]
				if (sessionObject[date] === undefined) {
					sessionObject[date] = []
				}
				sessionObject[date].push({
					id: session.id,
					userId: session.userId,
					gender: session.gender,
					date: session.date
				})
			})
	}

	useEffect(() => {
		if (category === '피드백') {
			// filter
		} else if (category === '일정') {
		}
	}, [category])

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[25px]">
						<div
							className={`${category === '일정' ? 'font-bold' : ''}`}
							onClick={() => setCategory('일정')}>
							일정
						</div>
						<div
							className={`ml-2 ${
								category === '피드백' ? 'font-bold' : ''
							}`}
							onClick={() => setCategory('피드백')}>
							피드백
						</div>
					</span>
					<span className="flex">
						<Link href="/trainer/session/add-session">
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
									d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
								/>
							</svg>
						</Link>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="ml-2 w-7 h-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</span>
				</div>

				{Object.entries(sessionObject).map((entry, idx) => {
					return (
						<React.Fragment key={idx}>
							<div
								className="mt-4"
								onClick={() => {
									modalVar(true)
								}}>
								<div className="text-[16px]">{entry[0]}</div>
								{entry[1].map((member, idx2) => {
									const date = new Date(member.date)
									let hours = date.getHours() + ''
									if (hours.length === 1) {
										hours = 0 + hours
									}
									const minutes = date.getMinutes()
									return (
										<React.Fragment key={idx2}>
											<div className="text-[16px] mt-2">
												<div className="flex justify-between p-3 border font-thin rounded-3xl">
													<div className="flex">
														{member.gender === 'male' ? (
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
														<div className="ml-1">
															{member.userId} 회원님
														</div>
													</div>
													<div className="ml-3 font-medium">
														{`${hours}시 ${minutes}분`}
													</div>
												</div>
											</div>
										</React.Fragment>
									)
								})}
							</div>
						</React.Fragment>
					)
				})}

				{modal ? (
					<div className="font-IBM font-thin fixed max-w-[450px] w-full bottom-0">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-[200px] flex-col justify-center">
							<div className="py-3 text-center text-[20px]">
								수업을 완료하셨습니까?
							</div>
							<div className="max-w-[450px] self-end mt-4">
								<button
									className="px-4 py-3 bg-gray-100 border font-thin"
									onClick={() => modalVar(false)}>
									취소
								</button>
								<button
									className="px-4 py-3 mx-3 bg-yellow-100 border"
									onClick={async () => {
										try {
											await updateSession({
												variables: {
													updateSessionInput: {
														// ...inputs
													}
												}
											})
											modalVar(false)
										} catch (error) {
											console.log(error)
										}
									}}>
									완료
								</button>
							</div>
						</div>
					</div>
				) : null}
				<BottomBar variant="Trainer" />
			</Layout>
		</>
	)
}

export default Session
