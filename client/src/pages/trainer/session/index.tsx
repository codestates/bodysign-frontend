import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import { modalVar, userDataVar } from '../../../graphql/vars'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import BottomBar from '../../../components/BottomBar'
import {
	TrainerDocument,
	UpdateSessionDocument,
	RemoveSessionDocument
} from '../../../graphql/graphql'
import Loading from '../../../components/Loading'
import Image from 'next/image'

interface MemberSession {
	id: number
	date: string
	userName: string
	gender: string
}

const Session: NextPage = () => {
	const modal = useReactiveVar(modalVar)
	const userData = useReactiveVar(userDataVar)
	const [category, setCategory] = useState('일정')
	const [sessionId, setSessionId] = useState<number>()
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: userData?.id }
	})
	const [updateSession] = useMutation(UpdateSessionDocument)
	const [removeSession] = useMutation(RemoveSessionDocument)

	// console.log(sessionId)
	const sessionObject: Record<string, MemberSession[]> = {}
	const completedSessionObject: Record<string, MemberSession[]> = {}
	if (!loading && data) {
		let $Data = [...data.trainer.sessions]
		$Data
			.sort((a, b) => {
				const aDate = new Date(a.date).getTime()
				const bDate = new Date(b.date).getTime()
				return aDate > bDate ? -1 : 1
			})
			.forEach(session => {
				const date = session.date.split('T')[0]
				if (session.completedSession) {
					if (completedSessionObject[date] === undefined) {
						completedSessionObject[date] = []
					}
					completedSessionObject[date].push({
						id: session.id,
						date: session.date,
						userName: session.user.userName,
						gender: session.user.gender
					})
				} else {
					if (sessionObject[date] === undefined) {
						sessionObject[date] = []
					}
					sessionObject[date].push({
						id: session.id,
						date: session.date,
						userName: session.user.userName,
						gender: session.user.gender
					})
				}
			})
	}

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[3.2rem]">
						<div
							className={`${
								category === '일정' ? 'font-bold' : 'text-[#9F9F9F]'
							} cursor-pointer`}
							onClick={() => setCategory('일정')}>
							일정
						</div>
						<div
							className={`ml-[0.8rem] ${
								category === '피드백' ? 'font-bold' : 'text-[#9F9F9F]'
							} cursor-pointer`}
							onClick={() => setCategory('피드백')}>
							피드백
						</div>
					</span>
					<span className="flex">
						{!readyDelete ? (
							<>
								<Link href="/trainer/session/add-session" passHref>
									<svg
										className="cursor-pointer w-[2.8rem] h-[2.8rem]"
										viewBox="-2 -1.5 18 18"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										width="28"
										height="28">
										<path
											d="M3.5 0v5m8-5v5m-4 1v5M5 8.5h5m-8.5-6h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
											stroke="currentColor"></path>
									</svg>
								</Link>
								<svg
									className="ml-[0.8rem] cursor-pointer w-[2.8rem] h-[2.8rem]"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									onClick={() => setReadyDelete(true)}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="cursor-pointer w-[3.6rem] h-[3.6rem] text-[#FDAD00]"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={async () => {
									// 수업 삭제 step 2
									const deleteItemId = Array.from(deleteLists)[0]
									console.log(deleteItemId)

									if (deleteItemId) {
										try {
											await removeSession({
												variables: {
													id: deleteItemId
												},
												refetchQueries: [
													{
														query: TrainerDocument,
														variables: {
															id: userData?.id
														}
													}
												]
											})
											deleteLists.clear()
										} catch (error) {
											console.log(error)
										}
									}
									setReadyDelete(false)
								}}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						)}
					</span>
				</div>

				{Object.entries(
					category === '일정' ? sessionObject : completedSessionObject
				).map((entry, idx) => {
					const deleteItemId = Array.from(deleteLists)[0]
					const date = entry[0].split('-')
					return (
						<React.Fragment key={idx}>
							<div className="mt-[2.4rem]">
								<div className="text-[1.8rem] font-semibold">
									{`${date[1]}월 ${date[2]}일`}
								</div>
								{entry[1].map(session => {
									const date = new Date(session.date)
									let hours = date.getHours() + ''
									if (hours.length === 1) {
										hours = 0 + hours
									}
									let minutes = date.getMinutes() + ''
									if (minutes.length === 1) {
										minutes = 0 + minutes
									}
									return (
										<React.Fragment key={session.id}>
											<div
												className={`h-[7rem] flex justify-between items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white ${
													session.id === deleteItemId ? 'ring-2' : ''
												}`}>
												<div className="flex">
													{session.gender === 'male' ? (
														<Image
															src="/man.png"
															width="36"
															height="30"
															alt="image"
														/>
													) : (
														<Image
															src="/woman.png"
															width="36"
															height="30"
															alt="image"
														/>
													)}
													<div
														className={`self-center ml-[1.2rem] ${
															!readyDelete
																? category === '일정'
																	? 'cursor-pointer'
																	: ''
																: 'cursor-pointer'
														}`}
														data-id={session.id}
														onClick={
															!readyDelete
																? category === '일정'
																	? () => {
																			// console.log(session.id)

																			setSessionId(session.id)
																			modalVar(true)
																	  }
																	: undefined
																: e => {
																		if (
																			e !== null &&
																			e.target instanceof HTMLElement
																		) {
																			// 수업 삭제 step 1
																			if (e.target.dataset.id) {
																				const id = +e.target.dataset.id
																				// 하나만 가능한 조건
																				console.log(id)

																				if (deleteLists.size > 0) {
																					setDeleteLists(prev => new Set())
																				}
																				if (deleteLists.has(id)) {
																					setDeleteLists(
																						prev =>
																							new Set(
																								[...prev].filter(
																									el => el !== id
																								)
																							)
																					)
																				} else {
																					setDeleteLists(
																						prev => new Set(prev.add(id))
																					)
																				}
																			}
																		}
																  }
														}>
														{session.userName} 회원
													</div>
												</div>
												<div>
													{`${hours}:${minutes === '0' ? '00' : minutes}`}
												</div>
											</div>
										</React.Fragment>
									)
								})}
							</div>
						</React.Fragment>
					)
				})}
			</Layout>
			<BottomBar variant="Trainer" />

			{modal ? (
				<div className="fixed bottom-0 w-full font-IBM">
					<div
						className="fixed inset-0 z-[-1] bg-black opacity-20"
						onClick={() => modalVar(false)}></div>
					<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
						<div className="text-[3.2rem] text-bold">수업을 하셨나요?</div>
						<div className="flex flex-col justify-between mt-[2.4rem]">
							<button
								className="w-full text-center border rounded-3xl shadow-md cursor-pointer h-[5.5rem]"
								type="submit"
								onClick={() => modalVar(false)}>
								노쇼 (No show)
							</button>
							<button
								className="w-full mt-[1.6rem] text-center border rounded-3xl shadow-md cursor-pointer h-[5.5rem] bg-[#FED06E]"
								type="submit"
								onClick={async () => {
									console.log(sessionId)

									try {
										await updateSession({
											variables: {
												updateSessionInput: {
													id: sessionId,
													completedSession: true
												}
											},
											refetchQueries: [
												{
													query: TrainerDocument,
													variables: {
														id: userData?.id
													}
												}
											]
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
		</>
	)
}

export default Session
