import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import { managedUserInfoVar, modalVar } from '../../../graphql/vars'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import Loading from '../../../components/Loading'
import {
	CreateUserCategoryDocument,
	TrainerDocument,
	UpdateUserDocument
} from '../../../graphql/graphql'
import { useRouter } from 'next/dist/client/router'
import BottomBar from '../../../components/BottomBar'
import { io } from 'socket.io-client'

interface Member {
	id: string
	email: string
	userName: string
	phoneNumber: string
	gender: string
}

interface FormInput {
	phone: string
	userCategoryId: number
	userCategoryName: string
}

const socket = io('localhost:5000')
const ManageMember: NextPage = () => {
	const router = useRouter()
	const modal = useReactiveVar(modalVar)
	const [category, setCategory] = useState('관리중')
	const [checkModal, setCheckModal] = useState('addmember')
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})
	const [createUserCategory] = useMutation(CreateUserCategoryDocument)
	const [updateUser] = useMutation(UpdateUserDocument)
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		// 회원 추가 API
		if (checkModal === 'linktraineruser') {
			try {
				// 트레이너와 회원을 연결하는 API
				// update에서는 trainerId 인풋이 없다.
				// 서버에서 전화번호를 가지고 특정 유저를 찾을지?
				// 모든 유저를 받아서 클라이언트에서 찾을지?
				updateUser({
					variables: {
						updateUserInput: {
							id: 2,
							trainerId: 21,
							userCategoryId: +data.userCategoryId
						}
					}
				})
				modalVar(false)
			} catch (error) {
				console.log(error)
			}
		}
		// 카테고리 추가 API
		else if (checkModal === 'addcategory') {
			try {
				await createUserCategory({
					variables: {
						createUserCategoryInput: {
							trainerId: 21,
							name: data.userCategoryName
						}
					},
					refetchQueries: [
						{
							query: TrainerDocument,
							variables: { id: 21 }
						}
					]
				})
				modalVar(false)
			} catch (error) {
				console.log(error)
			}
		}
	}

	const manageMemberObject: Record<string, Member[]> = {}
	if (!loading) {
		const userCategories = data.trainer.userCategories
		for (let i = 0; i < userCategories.length; i++) {
			if (manageMemberObject[userCategories[i].name] === undefined) {
				manageMemberObject[userCategories[i].name] = []
			}
		}
		data.trainer.users.forEach((user: any) => {
			const userCategoryName =
				userCategories[user.userCategoryId - 1]?.name
			manageMemberObject[userCategoryName].push({
				id: user.id,
				email: user.email,
				userName: user.userName,
				phoneNumber: user.phoneNumber,
				gender: user.gender
			})
		})
	}

	useEffect(() => {
		if (category === '졸업') {
			// filter
		} else if (category === '관리') {
		}
	}, [category])

	useEffect(() => {
		socket.emit('joinLounge', 21)
		socket.on('joinedLounge', data => {
			console.log(data)
		})
		// 회원 추가 기능 구현하고 다시 데이터를 봐야 한다.
	}, [])

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[25px]">
						<div
							className={`${
								category === '관리중' ? 'font-bold' : 'text-gray-400'
							} cursor-pointer`}
							onClick={() => setCategory('관리중')}>
							관리중
						</div>
						<div
							className={`ml-2 ${
								category === '졸업' ? 'font-bold' : 'text-gray-400'
							} cursor-pointer`}
							onClick={() => setCategory('졸업')}>
							졸업
						</div>
					</span>
					<span className="flex">
						{!readyDelete ? (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-7 h-7 cursor-pointer"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									data-check-modal="addmember"
									onClick={e => {
										if (e !== null && e.target instanceof SVGSVGElement) {
											setCheckModal(e.target.dataset.checkModal as string)
											modalVar(true)
										}
									}}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
									/>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="ml-2 w-7 h-7 cursor-pointer"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									onClick={() => setReadyDelete(true)}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-7 h-7 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={() => {
									// 회원 삭제 API 2
									// update API 추가 예정
									setReadyDelete(false)
									deleteLists.clear()
								}}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						)}
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
					<span
						className="mr-3 text-gray-400 cursor-pointer"
						data-check-modal="addcategory"
						onClick={e => {
							if (e !== null && e.target instanceof HTMLElement) {
								setCheckModal(e.target.dataset.checkModal as string)
								modalVar(true)
							}
						}}>
						+카테고리
					</span>
				</div>

				{Object.entries(manageMemberObject).map((entry, idx) => {
					return (
						<React.Fragment key={idx}>
							<div className="mt-4">
								<div className="text-[16px]">{entry[0]}</div>
								{entry[1].map(member => {
									return (
										<React.Fragment key={member.id}>
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
														{
															<div className="flex flex-col h-1 ml-1 cursor-pointer">
																<div
																	className="ml-2 hover:cursor-pointer font-thin h-[18px]"
																	onClick={
																		!readyDelete
																			? () => {
																					managedUserInfoVar({
																						userId: +member.id,
																						email:
																							member.email.split('@')[0],
																						userName: member.userName,
																						gender: member.gender
																					})
																					const url = `/trainer/manage-member/${
																						member.email.split('@')[0]
																					}/info`
																					router.push(url)
																			  }
																			: e => {
																					if (
																						e !== null &&
																						e.target instanceof HTMLElement
																					) {
																						// 회원 삭제 API 1
																						if (e.target.dataset.id) {
																							const id =
																								+e.target.dataset.id
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
																									prev =>
																										new Set(prev.add(id))
																								)
																							}
																						}
																					}
																			  }
																	}>
																	{member.userName} 회원님
																</div>
																<div className="text-[5px] ml-2 font-thin">
																	10 / 24회
																</div>
															</div>
														}
													</div>
													{!readyDelete ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="w-6 h-6"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={1.5}
																d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
															/>
														</svg>
													) : deleteLists.has(+member.id) ? (
														<svg
															className="text-green-600"
															viewBox="0 0 15 15"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															width="20"
															height="20">
															<path
																d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 110-14 7 7 0 010 14z"
																stroke="currentColor"></path>
														</svg>
													) : null}
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
					checkModal === 'addmember' ? (
						<div className="fixed max-w-[450px] w-full bottom-0">
							<div
								className="fixed inset-0 z-[-1] bg-black opacity-20"
								onClick={() => modalVar(false)}></div>
							<div className="bg-white flex z-[50] h-full flex-col py-10">
								<Link href="/trainer/manage-member/add-member">
									<div className="font-IBM font-thin text-[12px] rounded-lg border w-full h-12 px-10 bg-gray-400 text-white text-center py-3 cursor-pointer">
										새로운 회원정보 등록
									</div>
								</Link>
								<div
									className="font-IBM font-thin text-[12px] rounded-lg border w-full h-12 px-10 text-center mt-4 py-3 cursor-pointer"
									data-check-modal="linktraineruser"
									onClick={e => {
										if (e !== null && e.target instanceof HTMLElement) {
											setCheckModal(e.target.dataset.checkModal as string)
										}
									}}>
									Bodysign에 가입된 회원
								</div>
							</div>
						</div>
					) : checkModal === 'addcategory' ? (
						<div className="fixed max-w-[450px] w-full bottom-0">
							<div
								className="fixed inset-0 z-[-1] bg-black opacity-20"
								onClick={() => modalVar(false)}></div>
							<div className="bg-white flex z-[50] h-full flex-col py-10">
								<div className="py-3 text-center text-[20px]">
									카테고리 추가
								</div>
								<form
									className="flex flex-col mt-4"
									onSubmit={handleSubmit(onSubmit)}>
									<input
										className="w-full h-12 px-10 border"
										type="text"
										placeholder="새로운 카테고리 이름을 입력해주세요."
										{...register('userCategoryName', {
											required: true
										})}
									/>
									<div className="max-w-[450px] self-end mt-4">
										<button
											className="px-4 py-3 bg-gray-100 border"
											onClick={() => modalVar(false)}>
											취소
										</button>
										<button
											className="px-4 py-3 mx-3 bg-yellow-100 border"
											type="submit">
											추가
										</button>
									</div>
								</form>
							</div>
						</div>
					) : (
						<div className="fixed max-w-[450px] w-full bottom-0">
							<div
								className="fixed inset-0 z-[-1] bg-black opacity-20"
								onClick={() => modalVar(false)}></div>
							<div className="bg-white flex z-[50] h-full flex-col py-10">
								<div className="py-3 text-center text-[20px]">
									회원 추가
								</div>
								<form
									className="flex flex-col mt-4 text-[12px]"
									onSubmit={handleSubmit(onSubmit)}>
									<input
										className="w-full h-12 px-10 border"
										type="text"
										placeholder="휴대폰 번호 7자리 또는 8자리를 입력해주세요."
										{...register('phone', {
											required: true,
											pattern: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/
										})}
									/>
									{errors.phone?.type === 'maxLength' && (
										<div className="text-[16px] text-red-500 mt-1 text-center">
											붙임표(-)를 제외한 휴대폰 번호 7~8자리를
											입력해주세요.
										</div>
									)}
									<select
										className="w-full h-12 px-10 mt-1 bg-white border"
										{...register('userCategoryId', {
											required: true
										})}>
										<option value="">회원 카테고리를 선택해주세요.</option>
										{data.trainer.userCategories.map((category: any) => (
											<option value={category.id} key={category.id}>
												{category.name}
											</option>
										))}
									</select>

									<div className="max-w-[450px] self-end mt-4">
										<button
											className="px-4 py-3 bg-gray-100 border"
											onClick={() => modalVar(false)}>
											취소
										</button>
										<button
											className="px-4 py-3 mx-3 bg-yellow-100 border"
											type="submit">
											추가
										</button>
									</div>
								</form>
							</div>
						</div>
					)
				) : null}
				<BottomBar variant="Trainer" />
			</Layout>
		</>
	)
}

export default ManageMember
