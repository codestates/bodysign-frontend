import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../../components/Layout'
import Loading from '../../../../components/Loading'
import { useTrainerQuery } from '../../../../generated/graphql'
import { managedUserInfoVar, userDataVar } from '../../../../graphql/vars'

interface MemberSession {
	id: number
	email: string
	userName: string
	gender: string
	usedCount: number
	totalCount: number
}

const SelectMember: NextPage = () => {
	const userData = useReactiveVar(userDataVar)
	const { loading, data } = useTrainerQuery({
		variables: { id: userData?.id as number }
	})

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[3.2rem]">
						<Link href="/trainer/session/add-session" passHref>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="self-center w-[2.8rem] h-[2.8rem] cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
						</Link>
						<div className="ml-[0.8rem] font-bold">회원선택</div>
					</span>
					<Link href="/trainer/session/add-session" passHref>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="cursor-pointer w-[3.6rem] h-[3.6rem] text-[#FDAD00]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</Link>
				</div>

				{/* 
				<div className="flex justify-between mt-4">
					<span>
						{data.trainer.userCategories.map((category: any) => {
							return (
								<React.Fragment key={category.id}>
									<span className="ml-2 font-thin first:ml-0">
										{category.name}
									</span>
								</React.Fragment>
							)
						})}
					</span>
				</div> */}

				{data &&
					data.trainer.userCategories &&
					data.trainer.userCategories.map((userCategory, idx) => {
						return (
							<React.Fragment key={idx}>
								<div className="mt-[2.4rem]">
									<div className="text-[1.8rem] font-semibold">
										{userCategory?.name}
									</div>
									{userCategory?.users &&
										userCategory.users.map(member => {
											if (member) {
												return (
													<React.Fragment key={member.id}>
														<div
															className={`
													${managedUserInfoVar().userId === member.id ? 'bg-[#FDAD00]' : 'bg-black'}
													h-[7rem] flex justify-between items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white hover:ring-2`}
															data-id={member.id}
															onClick={e => {
																if (
																	e !== null &&
																	e.target instanceof HTMLElement
																) {
																	const userId = e.target.dataset
																		.id as string
																	console.log(userId)

																	managedUserInfoVar({
																		userId: +userId,
																		email: member.email,
																		userName: member.userName,
																		gender: member.gender
																	})
																}
															}}>
															<div className="flex">
																{member.gender === 'male' ? (
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
																<div className="self-center ml-[1.2rem] cursor-pointer ">
																	{member.userName} 회원
																</div>
															</div>
															<div>
																{member.sessionHistories.length
																	? `${member.sessionHistories[0].usedCount} / ${member.sessionHistories[0].totalCount}`
																	: null}
															</div>
														</div>
													</React.Fragment>
												)
											}
										})}
								</div>
							</React.Fragment>
						)
					})}
			</Layout>
		</>
	)
}

export default SelectMember
