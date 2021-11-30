import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import session_dummy from '../../../../session_dummy.json'
import { modalVar } from '../../../graphql/vars'
import { useReactiveVar } from '@apollo/client'

interface MemberSession {
	id: string
	name: string
	gender: string
	time: string
}

const Session: NextPage = () => {
	const [category, setCategory] = useState('일정')
	const modal = useReactiveVar(modalVar)

	const sessionObject: Record<string, MemberSession[]> = {}
	session_dummy
		.sort((a, b) => {
			const aDate = new Date(`${a.date} ${a.time}`).getTime()
			const bDate = new Date(`${b.date} ${b.time}`).getTime()
			return aDate > bDate ? -1 : 1
		})
		.forEach(el => {
			if (sessionObject[el.date] === undefined) {
				sessionObject[el.date] = []
			}
			sessionObject[el.date].push({
				id: el.id,
				name: el.name,
				gender: el.gender,
				time: el.time
			})
		})

	// 카테고리 필터 및 정렬
	// 수업 완료 API
	// 수업 삭제 API

	useEffect(() => {
		if (category === '피드백') {
			// filter
		} else if (category === '일정') {
		}
	}, [category])

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center w-full mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
							<div
								className={`${category === '일정' ? 'font-semibold' : ''}`}
								onClick={() => setCategory('일정')}>
								일정
							</div>
							<div
								className={`ml-3 ${
									category === '피드백' ? 'font-semibold' : ''
								}`}
								onClick={() => setCategory('피드백')}>
								피드백
							</div>
						</span>
						<span className="flex">
							<Link href="/session/add-session">
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
								className="mx-2 w-7 h-7"
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
									{entry[1].reverse().map((session, idx2) => {
										return (
											<React.Fragment key={idx2}>
												<div className="text-[16px] mt-1">
													<div className="flex justify-between px-3 py-3 border">
														<div className="flex">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className={`w-6 h-6 ${
																	session.gender === 'male'
																		? 'text-blue-300'
																		: 'text-pink-300'
																}`}
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor">
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={1.5}
																	d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
																/>
															</svg>
															<div className="ml-1">
																{session.name} 회원님
															</div>
														</div>
														<div className="ml-3">{session.time}</div>
													</div>
												</div>
											</React.Fragment>
										)
									})}
								</div>
							</React.Fragment>
						)
					})}
				</div>

				{modal ? (
					<div className="fixed max-w-[450px] w-full bottom-0">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-[200px] flex-col justify-center">
							<div className="py-3 text-center text-[20px]">
								수업을 완료하였습니까?
							</div>
							<div className="max-w-[450px] self-end mt-4">
								<button
									className="px-4 py-3 bg-gray-100 border"
									onClick={() => modalVar(false)}>
									취소
								</button>
								<button className="px-4 py-3 mx-3 bg-yellow-100 border">
									완료
								</button>
							</div>
						</div>
					</div>
				) : null}
			</Layout>
		</>
	)
}

export default Session
