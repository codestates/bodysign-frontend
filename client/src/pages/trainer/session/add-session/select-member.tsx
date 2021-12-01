import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../../components/Layout'
import session_dummy from '../../../../../session_dummy.json'
import { selectedMemberVar } from '../../../../graphql/vars'

interface MemberSession {
	id: string
	name: string
	gender: string
	times: string
}

const SelectMember: NextPage = () => {
	const sessionObject: Record<string, MemberSession[]> = {}
	session_dummy.forEach(el => {
		if (sessionObject[el.membercategory] === undefined) {
			sessionObject[el.membercategory] = []
		}
		sessionObject[el.membercategory].push({
			id: el.id,
			name: el.name,
			gender: el.gender,
			times: el.times
		})
	})

	// 카테고리 필터 및 정렬

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px] font-semibold">
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
							<div>회원선택</div>
						</span>
					</div>

					<div className="flex justify-between mt-4">
						<span>
							{Object.keys(sessionObject).map((category, idx) => {
								return (
									<React.Fragment key={idx}>
										<span className="ml-2 first:ml-0">{category}</span>
									</React.Fragment>
								)
							})}
						</span>
					</div>

					{Object.entries(sessionObject).map((entry, idx) => {
						return (
							<React.Fragment key={idx}>
								<div className="mt-4">
									<div className="text-[16px]">{entry[0]}</div>
									{entry[1].map((member, idx2) => {
										return (
											<React.Fragment key={idx2}>
												<div className="text-[16px] mt-1">
													<div className="flex justify-between px-3 py-3 border">
														<div className="flex">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className={`w-6 h-6 ${
																	member.gender === 'male'
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
															<Link href="/trainer/session/add-session">
																<div
																	className="ml-1 hover:cursor-pointer"
																	data-id={member.id}
																	onClick={e => {
																		if (
																			e !== null &&
																			e.target instanceof HTMLElement
																		) {
																			let id = e.target.dataset.id
																			const target = session_dummy.filter(
																				member => member.id === id
																			)
																			selectedMemberVar(target[0].name)
																		}
																	}}>
																	{member.name} 회원님
																</div>
															</Link>
														</div>
														<div className="ml-3">{member.times}</div>
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
			</Layout>
		</>
	)
}

export default SelectMember
