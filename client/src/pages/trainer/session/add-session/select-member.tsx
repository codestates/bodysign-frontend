import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../../components/Layout'
import { managedUserInfoVar } from '../../../../graphql/vars'
import { useQuery } from '@apollo/client'
import { TrainerDocument } from '../../../../graphql/graphql'
import Loading from '../../../../components/Loading'

interface MemberSession {
	id: number
	email: string
	userName: string
	gender: string
	usedCount: number
	totalCount: number
}

const SelectMember: NextPage = () => {
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})

	const selectMemberObject: Record<string, MemberSession[]> = {}
	if (!loading) {
		const userCategories = data.trainer.userCategories
		for (let i = 0; i < userCategories.length; i++) {
			if (selectMemberObject[userCategories[i].name] === undefined) {
				selectMemberObject[userCategories[i].name] = []
			}
		}
		data.trainer.users.forEach((user: any) => {
			const userCategoryName =
				userCategories[user.userCategoryId - 1]?.name
			const userSessionHistory = user.sessionHistories[0]
			// 식별이 필요하다. 진행중, 완료, 취소 등

			selectMemberObject[userCategoryName].push({
				id: user.id,
				email: user.email,
				userName: user.userName,
				gender: user.gender,
				usedCount: userSessionHistory.usedCount,
				totalCount: userSessionHistory.totalCount
			})
		})
	}

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[3.2rem]">
						<Link href="/trainer/session/add-session">
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
					<Link href="/trainer/session/add-session">
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

				{Object.entries(selectMemberObject).map((entry, idx) => {
					return (
						<React.Fragment key={idx}>
							<div className="mt-[2.4rem]">
								<div className="text-[1.8rem] font-semibold">
									{entry[0]}
								</div>
								{entry[1].map((member, idx2) => {
									return (
										<React.Fragment key={idx2}>
											<div
												className="h-[7rem] flex justify-between items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white hover:ring-4 hover:ring-[#FDAD00] cursor-pointer"
												data-id={member.id}
												onClick={e => {
													if (
														e !== null &&
														e.target instanceof HTMLElement
													) {
														const userId = e.target.dataset.id as string
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
														<img
															src="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/man-raising-hand-light-skin-tone.png"
															width="36"
															height="30"
														/>
													) : (
														<img
															src="http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/woman-raising-hand-light-skin-tone.png"
															width="36"
															height="30"
														/>
													)}
													<div className="self-center ml-[1.2rem]">
														{member.userName} 회원
													</div>
												</div>
												<div>
													{`${member.usedCount} / ${member.totalCount}`}
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
		</>
	)
}

export default SelectMember
