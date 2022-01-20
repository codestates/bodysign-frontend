import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Avatar from '../../../components/atoms/Avatar'
import AddCategoryIcon from '../../../components/atoms/icons/AddCategoryIcon'
import CheckIcon from '../../../components/atoms/icons/CheckIcon'
import DeleteIcon from '../../../components/atoms/icons/DeleteIcon'
import Loading from '../../../components/Loading'
import AddItem from '../../../components/molecules/Entities/AddItem'
import ColMemberGroup from '../../../components/molecules/Entities/ColMemberGroup'
import RowMemberItem from '../../../components/molecules/Entities/RowMemberItem'
import ChatLink from '../../../components/molecules/Link/ChatLink'
import Entities from '../../../components/organisms/Entities'
import Header from '../../../components/organisms/Header'
import {
	TrainerDocument,
	useCreateUserCategoryMutation,
	useFindOneUserByPhoneNumberLazyQuery,
	useTrainerLazyQuery,
	useUpdateUserMutation
} from '../../../generated/graphql'
import { modalVar, userDataVar } from '../../../graphql/vars'
import useSessionStorage from '../../../hooks/useSessionStorage'

interface FormInput {
	phoneNumber: string
	userCategoryId: number
	userCategoryName: string
}

const ManageMember: NextPage = () => {
	const router = useRouter()
	const modal = useReactiveVar(modalVar)
	const userData = useReactiveVar(userDataVar)
	const [_, setIsUser] = useSessionStorage('isUser')
	const [__, setMangedMemberInfo] = useSessionStorage('mangedMemberInfo')
	const [category, setCategory] = useState('관리중')
	const [checkModal, setCheckModal] = useState('addmember')
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const [phoneNumber, setPhoneNumber] = useState('')
	const [trainerLazyQuery, { loading, data }] = useTrainerLazyQuery()
	const [createUserCategory] = useCreateUserCategoryMutation()
	const [updateUser] = useUpdateUserMutation()
	const [
		findOneUserByPhoneNumberLazyQuery,
		{ loading: isUserLoading, data: isUserData }
	] = useFindOneUserByPhoneNumberLazyQuery()
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
				alert('다시 시도해 주세요.')
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
				alert('다시 시도해 주세요.')
			}
		}
	}

	useEffect(() => {
		if (userData) {
			trainerLazyQuery({
				variables: { id: userData?.id as number }
			})
		}
	}, [userData])

	// const socket = io(process.env.NEXT_PUBLIC_API_DOMAIN_SOCKET as string)
	// useEffect(() => {
	// 	socket.emit('joinLounge', userData?.id)
	// 	socket.on('joinedLounge', data => {
	// 		// console.log(data)
	// 		// 배포 이후 소켓 통신에 문제가 없는지부터 확인.
	// 	})
	// }, [socket])

	const handleCategory = (category: string) => {
		setCategory(category)
	}

	const handleModal = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e !== null && e.target instanceof HTMLDivElement) {
			setCheckModal(e.target.dataset.checkModal as string)
			modalVar(true)
		}
	}

	const handleReadyDelete = () => {
		setReadyDelete(true)
	}

	const handleDelete = async () => {
		// 회원 삭제 step 2
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
			} catch (error) {
				alert('다시 시도해 주세요.')
			}
			deleteLists.clear()
		}
		setReadyDelete(false)
	}

	const handleManagedMember = (
		member: {
			id: number
			email: string
			userName: string
			gender: string
		},
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (!readyDelete) {
			if (!member.email) {
				setIsUser(false)
				setMangedMemberInfo({
					userId: +member.id,
					emailId: '',
					userName: member.userName,
					gender: member.gender
				})
				// const url = `/trainer/manage-member/${member.id}/info`
				// router.push(url)
			} else {
				setIsUser(true)
				setMangedMemberInfo({
					userId: +member.id,
					emailId: member.email.split('@')[0],
					userName: member.userName,
					gender: member.gender
				})
				const url = `/trainer/manage-member/${
					member.email.split('@')[0]
				}/info`
				router.push(url)
			}
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
			<Header category={category} handleSetCategory={handleCategory}>
				{!readyDelete ? (
					<>
						{/* <AddMemberIcon handleModal={handleModal} /> */}
						<AddCategoryIcon handleModal={handleModal} />
						<DeleteIcon handleReadyDelete={handleReadyDelete} />
					</>
				) : (
					<CheckIcon handleDelete={handleDelete} />
				)}
			</Header>

			{data &&
				data.trainer.userCategories &&
				data.trainer.userCategories.map(userCategory => {
					return (
						<Entities
							key={userCategory?.id as number}
							userCategory={userCategory?.name as string}>
							{userCategory?.users &&
								userCategory.users
									.filter(member => {
										if (category === '관리중' && !member?.graduate) {
											return member
										} else if (category === '졸업' && member?.graduate) {
											return member
										}
									})
									.map(member => {
										if (member) {
											let sumUsedCount = 0
											let sumTotalCount = 0
											for (
												let i = 0;
												i < member.sessionHistories.length;
												i++
											) {
												sumUsedCount =
													sumUsedCount +
													member.sessionHistories[i].usedCount
												sumTotalCount =
													sumTotalCount +
													member.sessionHistories[i].totalCount
											}

											return (
												<>
													<RowMemberItem
														member={member}
														deleteLists={deleteLists}
														handleManagedMember={handleManagedMember}>
														<div className="flex">
															<Avatar gender={member.gender} />
															<ColMemberGroup>
																<div className="text-left">
																	{member.userName} 회원
																</div>
																<div className="text-[1.4rem] text-right text-[#9F9F9F]">
																	{`${sumUsedCount} / ${sumTotalCount}`}회
																</div>
															</ColMemberGroup>
														</div>
														{!readyDelete ? (
															<ChatLink memberId={member.id} />
														) : null}
													</RowMemberItem>
												</>
											)
										}
									})}

							{userCategory?.nonRegisteredUsers &&
								userCategory?.nonRegisteredUsers
									.filter(nonRegisteredMember => {
										if (
											category === '관리중' &&
											!nonRegisteredMember?.graduate
										) {
											return nonRegisteredMember
										} else if (
											category === '졸업' &&
											nonRegisteredMember?.graduate
										) {
											return nonRegisteredMember
										}
									})
									.map(nonRegisteredMember => {
										if (nonRegisteredMember) {
											return (
												<>
													<RowMemberItem
														member={nonRegisteredMember}
														deleteLists={deleteLists}
														handleManagedMember={handleManagedMember}>
														<div className="flex">
															<Avatar
																gender={nonRegisteredMember.gender}
															/>
															<ColMemberGroup>
																<div className="text-left">
																	{nonRegisteredMember.userName} 회원
																</div>
																{/* <div className="text-[1.4rem] text-right text-[#9F9F9F]">
																	{`${sumUsedCount} / ${sumTotalCount}`}회
																</div> */}
															</ColMemberGroup>
														</div>
													</RowMemberItem>
												</>
											)
										}
									})}
							{!readyDelete ? (
								<AddItem
									dataCheckModal="addmember"
									handleModal={handleModal}
								/>
							) : null}
						</Entities>
					)
				})}

			{modal ? (
				checkModal === 'addmember' ? (
					<div className="fixed bottom-[6.3rem] right-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[2rem]">
							<div className="text-[3.2rem] font-bold">회원 추가</div>
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
					<div className="fixed bottom-[6.3rem] right-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
							<div className="text-[3.2rem] font-bold">카테고리 추가</div>
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
					<div className="fixed bottom-[6.3rem] right-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
							<div className="text-[3.2rem] font-bold">회원 검색</div>
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
											// disabled={isUserData && isUserData ? false : true}
											type="button"
											onClick={async e => {
												// 트레이너와 회원을 연결하는 API
												try {
													if (
														e !== null &&
														e.target instanceof HTMLElement
													) {
														await findOneUserByPhoneNumberLazyQuery({
															variables: {
																phoneNumber: phoneNumber
															}
														})
													}
												} catch (error) {
													alert('다시 시도해 주세요.')
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
