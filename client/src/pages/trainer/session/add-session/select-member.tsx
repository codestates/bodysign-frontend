import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../../components/Layout'
import { managedUserInfoVar } from '../../../../graphql/vars'
import { useQuery } from '@apollo/client'
import { TrainerDocument } from '../../../../graphql/graphql'
import Loading from '../../../../components/Loading'
import { useRouter } from 'next/dist/client/router'

interface MemberSession {
	id: number
	email: string
	userName: string
	gender: string
	usedCount: number
	totalCount: number
}

const SelectMember: NextPage = () => {
	const router = useRouter()
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
					<span className="flex text-[20px] font-bold">
						<Link href="/trainer/session/add-session">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-7 h-7 cursor-pointer"
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
						</Link>
						<div>회원선택</div>
					</span>
				</div>

				<div className="flex justify-between mt-4">
					<span>
						{data.trainer.userCategories.map((category: any) => {
							return (
								<React.Fragment key={category.id}>
									<span className="ml-2 first:ml-0 font-thin">
										{category.name}
									</span>
								</React.Fragment>
							)
						})}
					</span>
				</div>

				{Object.entries(selectMemberObject).map((entry, idx) => {
					return (
						<React.Fragment key={idx}>
							<div className="mt-4">
								<div className="text-[16px] font-bold">{entry[0]}</div>
								{entry[1].map((member, idx2) => {
									return (
										<React.Fragment key={idx2}>
											<div className="text-[16px] mt-1">
												<div className="flex justify-between px-3 py-3 border rounded-3xl">
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
														<Link href="/trainer/session/add-session">
															<div
																className="ml-1 font-thin hover:cursor-pointer"
																data-id={member.id}
																onClick={e => {
																	if (
																		e !== null &&
																		e.target instanceof HTMLElement
																	) {
																		const userId = e.target.dataset
																			.id as string
																		managedUserInfoVar({
																			userId: +userId,
																			email: member.email,
																			userName: member.userName,
																			gender: member.gender
																		})
																	}
																}}>
																{member.userName} 회원님
															</div>
														</Link>
													</div>
													<div className="font-thin">
														{`${member.usedCount} / ${member.totalCount}`}
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
			</Layout>
		</>
	)
}

export default SelectMember
