import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import Avatar from '../../../components/atoms/Avatar'
import AddCategoryIcon from '../../../components/atoms/icons/AddCategoryIcon'
import AddMemberIcon from '../../../components/atoms/icons/AddMemberIcon'
import CheckIcon from '../../../components/atoms/icons/CheckIcon'
import DeleteIcon from '../../../components/atoms/icons/DeleteIcon'
import Layout from '../../../components/Layout'
import Loading from '../../../components/Loading'
import ColMemberGroup from '../../../components/molecules/Entities/ColMemberGroup'
import RowMemberItem from '../../../components/molecules/Entities/RowMemberItem'
import ChatLink from '../../../components/molecules/Link/ChatLink'
import BottomBar from '../../../components/organisms/BottomBar'
import Entities from '../../../components/organisms/Entities'
import Header from '../../../components/organisms/Header'
import {
	TrainerDocument,
	useCreateUserCategoryMutation,
	useFindOneUserByPhoneNumberMutation,
	useTrainerQuery,
	useUpdateUserMutation
} from '../../../generated/graphql'
import {
	managedUserInfoVar,
	modalVar,
	userDataVar
} from '../../../graphql/vars'

interface Member {
	id: string
	email: string
	userName: string
	gender: string
	count: string
}

interface FormInput {
	phoneNumber: string
	userCategoryId: number
	userCategoryName: string
}

const ManageMember: NextPage = () => {
	const router = useRouter()
	const modal = useReactiveVar(modalVar)
	const userData = useReactiveVar(userDataVar)
	const [category, setCategory] = useState('관리중')
	const [checkModal, setCheckModal] = useState('addmember')
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const [phoneNumber, setPhoneNumber] = useState('')
	const { loading, data } = useTrainerQuery({
		variables: { id: userData?.id as number }
	})
	const [createUserCategory] = useCreateUserCategoryMutation()
	const [updateUser] = useUpdateUserMutation()
	const [
		findOneUserByPhoneNumber,
		{ loading: isUserLoading, data: isUserData }
	] = useFindOneUserByPhoneNumberMutation()
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		// 회원 추가 API
		if (checkModal === 'linktraineruser') {
			try {
				await updateUser({
					variables: {
						updateUserInput: {
							id: isUserData?.findOneUserByPhoneNumber.id as number,
							trainerId: userData?.id,
							userCategoryId: +data.userCategoryId
						}
					},
					refetchQueries: [
						{
							query: TrainerDocument,
							variables: { id: userData?.id }
						}
					]
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
							trainerId: userData?.id as number,
							name: data.userCategoryName
						}
					},
					refetchQueries: [
						{
							query: TrainerDocument,
							variables: { id: userData?.id }
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
	const graduateManageMemberObject: Record<string, Member[]> = {}
	if (!loading && data) {
		const userCategories = data.trainer.userCategories
		if (userCategories) {
			for (let i = 0; i < userCategories.length; i++) {
				const userCategoryName = userCategories[i]?.name as string
				if (graduateManageMemberObject[userCategoryName] === undefined) {
					graduateManageMemberObject[userCategoryName] = []
				}
				if (manageMemberObject[userCategoryName] === undefined) {
					manageMemberObject[userCategoryName] = []
				}
			}
		}

		if (userCategories && data.trainer.users) {
			data.trainer.users.forEach((user: any) => {
				let sumUsedCount = 0
				let sumTotalCount = 0
				for (let i = 0; i < user.sessionHistories.length; i++) {
					sumUsedCount = sumUsedCount + user.sessionHistories[i].usedCount
					sumTotalCount =
						sumTotalCount + user.sessionHistories[i].totalCount
				}

				const userCategoryName = userCategories[user.userCategoryId - 1]
					?.name as string
				// userCategories의 갯수는 각 트레이너마다 0번부터 시작인데,
				// user.userCategoryId 값은 전체(모든 트레이너) 유저 카테고리의 row id값이라서 일치하지 않는다.
				// console.log(userCategories, user.userCategoryId)

				if (user.graduate) {
					graduateManageMemberObject[userCategoryName].push({
						id: user.id,
						email: user.email,
						userName: user.userName,

						gender: user.gender,
						count: `${sumUsedCount} / ${sumTotalCount}`
					})
				} else {
					manageMemberObject[userCategoryName].push({
						id: user.id,
						email: user.email,
						userName: user.userName,

						gender: user.gender,
						count: `${sumUsedCount} / ${sumTotalCount}`
					})
				}
			})
		}
	}

	const socket = io(process.env.NEXT_PUBLIC_API_DOMAIN_SOCKET as string)
	useEffect(() => {
		socket.emit('joinLounge', 21)
		socket.on('joinedLounge', data => {
			// console.log(data)
			// 회원 추가 기능 구현하고 다시 데이터를 봐야 한다.
		})
	}, [socket])

	const handleCategory = (category: string) => {
		setCategory(category)
	}

	const handleModal = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		if (e !== null && e.target instanceof SVGElement) {
			setCheckModal(e.target.dataset.checkModal as string)
			modalVar(true)
		}
	}

	const handleReadyDelete = () => {
		setReadyDelete(true)
	}

	const handleDelete = async () => {
		const deleteItemId = Array.from(deleteLists)[0]
		if (deleteItemId) {
			try {
				await updateUser({
					variables: {
						updateUserInput: {
							id: deleteItemId,
							trainerId: null
						}
					},
					refetchQueries: [
						{
							query: TrainerDocument,
							variables: { id: userData?.id as number }
						}
					]
				})
				deleteLists.clear()
			} catch (error) {
				console.log(error)
			}
		}
		setReadyDelete(false)
	}

	const handleManagedMember = (
		member: {
			id: string
			email: string
			userName: string
			gender: string
		},
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (!readyDelete) {
			managedUserInfoVar({
				userId: +member.id,
				email: member.email.split('@')[0],
				userName: member.userName,
				gender: member.gender
			})
			const url = `/trainer/manage-member/${
				member.email.split('@')[0]
			}/info`
			router.push(url)
		} else {
			if (e !== null && e.target instanceof HTMLElement) {
				// 회원 삭제 step 1
				if (e.target.dataset.id) {
					const id = +e.target.dataset.id
					// 하나만 가능한 조건
					if (deleteLists.size > 0) {
						setDeleteLists(prev => new Set())
					}
					if (deleteLists.has(id)) {
						setDeleteLists(
							prev => new Set([...prev].filter(el => el !== id))
						)
					} else {
						setDeleteLists(prev => new Set(prev.add(id)))
					}
				}
			}
		}
	}

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<Header category={category} handleSetCategory={handleCategory}>
					{!readyDelete ? (
						<>
							<AddMemberIcon handleModal={handleModal} />
							<AddCategoryIcon handleModal={handleModal} />
							<DeleteIcon handleReadyDelete={handleReadyDelete} />
						</>
					) : (
						<CheckIcon handleDelete={handleDelete} />
					)}
				</Header>

				{Object.entries(
					category === '관리중'
						? manageMemberObject
						: graduateManageMemberObject
				).map((entry, idx) => {
					return (
						<Entities idx={idx} userCategory={entry[0]}>
							{entry[1].map(member => {
								return (
									<>
										<RowMemberItem memberId={member.id}>
											<div className="flex">
												<Avatar gender={member.gender} />
												<ColMemberGroup>
													<div
														className="text-left cursor-pointer"
														data-id={member.id}
														onClick={e => handleManagedMember(member, e)}>
														{member.userName} 회원
													</div>
													<div className="text-[1.4rem] text-left text-[#9F9F9F]">
														{member.count}회
													</div>
												</ColMemberGroup>
											</div>
											{!readyDelete ? (
												<ChatLink />
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
										</RowMemberItem>
									</>
								)
							})}
						</Entities>
					)
				})}
			</Layout>
			<BottomBar variant="Trainer" />

			{modal ? (
				checkModal === 'addmember' ? (
					<div className="fixed bottom-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[2rem]">
							<div className="text-[3.2rem] text-bold">회원 추가</div>
							<Link href="/trainer/manage-member/add-member" passHref>
								<div className="w-full py-[1.2rem] text-center mt-[2.4rem] border rounded-3xl shadow-md cursor-pointer h-[5.5rem]">
									새로운 회원정보 등록
								</div>
							</Link>
							<div
								className="bg-[#FED06E] w-full py-[1.2rem] mt-[1.6rem] text-center border rounded-3xl shadow-md cursor-pointer h-[5.5rem]"
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
					<div className="fixed bottom-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
							<div className="text-[3.2rem] text-bold">카테고리 추가</div>
							<form
								className="flex flex-col mt-[2.4rem]"
								onSubmit={handleSubmit(onSubmit)}>
								<input
									className="w-full text-center border rounded-3xl shadow-md h-[5.5rem]"
									type="text"
									placeholder="새로운 카테고리 이름"
									{...register('userCategoryName', {
										required: true
									})}
								/>

								{/* <button
									className="w-full mt-[2.4rem] text-center border rounded-3xl shadow-md cursor-pointer h-[5.5rem] bg-[#FED06E]"
									type="submit">
									확인
								</button> */}
								<div className="flex justify-between mt-[2.4rem]">
									<button
										className="w-[45%] p-[1.2rem] border shadow-md rounded-3xl"
										onClick={() => modalVar(false)}>
										취소
									</button>
									<button
										className="w-[45%] p-[1.2rem] bg-[#FED06E] border shadow-md rounded-3xl "
										type="submit">
										추가
									</button>
								</div>
							</form>
						</div>
					</div>
				) : null
			) : null}

			{modal ? (
				checkModal === 'linktraineruser' ? (
					<div className="fixed bottom-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
							<div className="text-[3.2rem] text-bold">회원 검색</div>
							<form
								className="flex flex-col mt-[2.4rem]"
								onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col justify-between">
									<label className="text-[1.4rem]">휴대폰 번호</label>
									<div className="flex items-center justify-between">
										<input
											className="w-[75%] py-[1.2rem] px-[2rem] border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
											type="text"
											placeholder="회원님의 휴대폰 번호를 입력해주세요."
											{...register('phoneNumber', {
												// required: true
												// pattern: /^([0-9]{3,4})([0-9]{4})$/
											})}
											onChange={e => {
												setPhoneNumber(e.target.value)
											}}
										/>
										<button
											className="w-[20%] p-[1rem] bg-[#FED06E] border shadow-md rounded-3xl h-[5.5rem] mt-[0.4rem]"
											// disabled={isUserData ? false : true}
											type="submit"
											onClick={async e => {
												// 트레이너와 회원을 연결하는 API
												// 값이 트루인지 확인하고 추가 버튼 disabled
												// setPhoneNumber(e.target.value)
												try {
													if (
														e !== null &&
														e.target instanceof HTMLElement
													) {
														await findOneUserByPhoneNumber({
															variables: {
																phoneNumber: phoneNumber
															}
														})
													}
												} catch (error) {
													console.log(error)
												}
											}}>
											검색
										</button>
									</div>
								</div>
								{errors.phoneNumber && (
									<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
										휴대폰 번호 10~11자리를 입력해주세요.
									</div>
								)}
								{!isUserLoading && isUserData !== undefined && (
									<div className="text-[16px] text-blue-500 mt-[0.8rem] text-left">
										{`검색완료: ${isUserData?.findOneUserByPhoneNumber.userName}`}
									</div>
								)}
								{!isUserLoading && isUserData === undefined && (
									<div className="text-[16px] text-red-500 mt-[0.8rem] text-left">
										회원님을 찾을 수 없습니다.
									</div>
								)}
								<div className="flex flex-col justify-between mt-[1.6rem]">
									<label className="text-[1.4rem]">카테고리</label>
									<select
										className="w-full bg-white p-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
										{...register('userCategoryId', {
											required: true
										})}>
										{data && data.trainer && data.trainer.userCategories
											? data.trainer.userCategories.map(
													(category: any) => (
														<option value={category.id} key={category.id}>
															{category.name}
														</option>
													)
											  )
											: null}
									</select>
								</div>
								<div className="flex justify-between mt-[2.4rem]">
									<button
										className="w-[45%] p-[1.2rem] border shadow-md rounded-3xl"
										onClick={() => modalVar(false)}>
										취소
									</button>
									<button
										className="w-[45%] p-[1.2rem] bg-[#FED06E] border shadow-md rounded-3xl disabled:opacity-50"
										disabled={!isUserLoading && isUserData ? false : true}
										type="submit">
										추가
									</button>
								</div>
							</form>
						</div>
					</div>
				) : null
			) : null}
		</>
	)
}

export default ManageMember
