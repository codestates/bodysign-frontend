import { useQuery, useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loading from '../../../../components/Loading'
import {
	useCreateSessionHistoryMutation,
	useNonRegisteredUserQuery,
	useTrainerQuery,
	useUpdateUserMutation
} from '../../../../generated/graphql'
import { UserDocument } from '../../../../graphql/graphql'
import {
	chatTargetUserIdVar,
	managedUserInfoVar,
	modalVar,
	userDataVar
} from '../../../../graphql/vars'
import useSessionStorage from '../../../../hooks/useSessionStorage'

interface FormInput {
	date: string
	costPerSession: number
	totalCount: number
	commission: number
	isGraduate: boolean
}

// const labelProperties =
// 	'after:absolute after:border after:h-[2.9rem] after:bg-[#FDAD00] after:w-full after:-top-0 after:z-[-1] after:transition-[left] after:duration-500 after:rounded-[2rem] peer-checked:cursor-default peer-checked:text-black peer-checked:after:left-0'

const Info: NextPage = () => {
	const modal = useReactiveVar(modalVar)
	const userData = useReactiveVar(userDataVar)
	const managedUserInfo = useReactiveVar(managedUserInfoVar)
	// const [isGraduate, setIsGraduate] = useState<boolean | null>(null)
	const [isUser, _] = useSessionStorage('isUser')
	const { loading, data } = useTrainerQuery({
		variables: { id: userData?.id as number }
	})
	const { loading: memberLoading, data: memberData } = useQuery(
		UserDocument,
		{
			variables: { id: managedUserInfo.userId }
		}
	)
	const {
		loading: nonRegisteredUserLoading,
		data: nonRegisteredUserData
	} = useNonRegisteredUserQuery({
		variables: { id: managedUserInfo.userId }
	})
	const [updateUser] = useUpdateUserMutation()
	const [createSessionHistory] = useCreateSessionHistoryMutation()
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		// 세션 추가 API
		try {
			await createSessionHistory({
				variables: {
					createSessionHistoryInput: {
						userId: managedUserInfo.userId,
						date: data.date,
						costPerSession: +data.costPerSession,
						totalCount: +data.totalCount,
						commission: +data.commission
					}
				},
				refetchQueries: [
					{
						query: UserDocument,
						variables: { id: managedUserInfo.userId }
					}
				]
			})
			modalVar(false)
		} catch (error) {
			console.log(error)
		}
	}

	// console.log(isGraduate)
	// useEffect(() => {
	// 	if (!loading && memberData) {
	// 		setIsGraduate(memberData.user.graduate)
	// 	}
	// }, [])

	// useEffect(() => {
	// 	// 졸업 유무 변경 API
	// 	try {
	// 		updateUser({
	// 			variables: {
	// 				updateUserInput: {
	// 					id: managedUserInfo.userId,
	// 					graduate: isGraduate
	// 				}
	// 			},
	// 			refetchQueries: [
	// 				{
	// 					query: UserDocument,
	// 					variables: { id: managedUserInfo.userId }
	// 				}
	// 			]
	// 		})
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }, [updateUser, isGraduate, managedUserInfo.userId])

	useEffect(() => {
		if (isUser) {
			window.sessionStorage.setItem('isUser', 'true')
		} else {
			window.sessionStorage.setItem('isUser', 'false')
		}
	}, [isUser])

	if (loading) return <Loading />
	if (memberLoading) return <Loading />
	if (nonRegisteredUserLoading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem] items-center">
					<Link href="/trainer/manage-member" passHref>
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
					<div className="ml-[0.8rem] font-bold">
						{isUser
							? memberData.user.userName
							: nonRegisteredUserData?.nonRegisteredUser.userName}{' '}
						회원
					</div>
				</span>
				<Link href={`/trainer/manage-member/chat`} passHref>
					<svg
						className="w-[2.8rem] h-[2.8rem] cursor-pointer"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 25 25"
						stroke="currentColor"
						onClick={() => {
							chatTargetUserIdVar(memberData.user.id)
						}}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
						/>
					</svg>
				</Link>
			</div>

			<div className="flex justify-between mt-[2.4rem] text-[2.2rem]">
				<Link
					href={`/trainer/manage-member/${managedUserInfo.email}/info`}
					passHref>
					<span className="pb-[0.4rem] border-b-[3px] border-[#FED06E] cursor-pointer">
						회원정보
					</span>
				</Link>
				<Link
					href={`/trainer/manage-member/${managedUserInfo.email}/inbody`}
					passHref>
					<span className="ml-[0.8rem] cursor-pointer">인바디</span>
				</Link>
				<Link
					href={`/trainer/manage-member/${managedUserInfo.email}/sessions`}
					passHref>
					<span className="ml-[0.8rem] cursor-pointer">수업기록</span>
				</Link>
			</div>

			<div className="mt-[2.4rem]">
				<div className="flex flex-col justify-between text-[1.8rem]">
					<div className="flex justify-between">
						<span>이름</span>
						<span>
							{isUser
								? memberData.user.userName
								: nonRegisteredUserData?.nonRegisteredUser.userName}
						</span>
					</div>
					<div className="flex justify-between mt-[0.8rem]">
						<span>성별</span>
						<span>
							{isUser
								? memberData.user.gender
								: nonRegisteredUserData?.nonRegisteredUser.gender}
						</span>
					</div>
					{isUser ? (
						<div className="flex justify-between mt-[0.8rem]">
							<span>생년월일</span>
							<span>
								{memberData.user.birthDate
									.split('T')[0]
									.replace(/\-/g, '.')}
							</span>
						</div>
					) : null}
					<div className="flex justify-between mt-[0.8rem]">
						<span>전화번호</span>
						<span>
							{isUser
								? memberData.user.phoneNumber
								: nonRegisteredUserData?.nonRegisteredUser.phoneNumber}
						</span>
					</div>
					<div className="flex justify-between mt-[2rem]">
						<label>카테고리</label>
						{loading ? (
							<Loading />
						) : (
							<select
								className="p-[0.4rem] w-[15rem] rounded-[2rem] bg-white border "
								onChange={e => {
									// 회원 카테고리 변경 API
									// e.target.value
									try {
										updateUser({
											variables: {
												updateUserInput: {
													id: managedUserInfo.userId,
													userCategoryId: +e.target.value
												}
											},
											refetchQueries: [
												{
													query: UserDocument,
													variables: { id: managedUserInfo.userId }
												}
											]
										})
									} catch (error) {
										console.log(error)
									}
								}}>
								<option
									value={`${
										isUser
											? memberData.user.userCategoryId
											: nonRegisteredUserData?.nonRegisteredUser
													.userCategoryId
									}`}>
									{data &&
										data.trainer.userCategories &&
										data.trainer.userCategories.filter(category => {
											let userCategoryId
											if (isUser) {
												userCategoryId = memberData.user.userCategoryId
											} else {
												userCategoryId = nonRegisteredUserData
													?.nonRegisteredUser.userCategoryId as number
											}
											if (category && category.id === userCategoryId) {
												return category
											}
										})[0]?.name}
								</option>
								{data &&
									data.trainer.userCategories &&
									data.trainer.userCategories.map(category => {
										let userCategoryId
										if (isUser) {
											userCategoryId = memberData.user.userCategoryId
										} else {
											userCategoryId = nonRegisteredUserData
												?.nonRegisteredUser.userCategoryId as number
										}
										if (category && category.id !== userCategoryId) {
											return (
												<option key={category.id} value={`${category.id}`}>
													{category.name}
												</option>
											)
										}
									})}
							</select>
						)}
					</div>
					<div className="flex justify-between mt-[0.8rem]">
						<span>졸업유무</span>
						<span className="relative inline-block w-[4rem] align-middle select-none">
							<input
								className="absolute block w-[2.8rem] h-[2.8rem] bg-white border-4 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-[#FED06E] peer"
								type="checkbox"
								name="toggle"
								id="toggle"
								checked={
									isUser
										? memberData.user.graduate
										: nonRegisteredUserData?.nonRegisteredUser.graduate
								}
								onChange={async e => {
									// 졸업 여부 API
									try {
										await updateUser({
											variables: {
												updateUserInput: {
													id: managedUserInfo.userId,
													graduate: e.target.checked
												}
											},
											refetchQueries: [
												{
													query: UserDocument,
													variables: { id: managedUserInfo.userId }
												}
											]
										})
									} catch (error) {
										console.log(error)
									}
								}}
							/>
							<label
								className="block h-[2.8rem]	bg-gray-200 rounded-full cursor-pointer peer peer-checked:bg-[#FED06E] overflow-hidden"
								htmlFor="toggle"
							/>
						</span>
						{/* <div className="w-[15rem]">
								<span>
									<input
										className="hidden peer"
										type="radio"
										id="false"
										value="false"
										checked={!isGraduate}
										{...register('isGraduate', {
											required: true
										})}
										onClick={() => {
											setIsGraduate(false)
										}}
									/>
									<label
										className={`${labelProperties} py-[0.4rem] h-[2.9rem] rounded-l-[2rem] w-1/2 text-center inline-block relative border border-r-0 cursor-pointer after:left-full`}
										htmlFor="false">
										관리중
									</label>
								</span>
								<span>
									<input
										className="hidden peer"
										type="radio"
										id="true"
										value="true"
										defaultChecked
										checked={isGraduate}
										{...register('isGraduate', {
											required: true
										})}
										onClick={() => {
											setIsGraduate(true)
										}}
									/>
									<label
										className={`${labelProperties} py-[0.4rem] h-[2.9rem] rounded-r-[2rem] w-1/2 text-center inline-block relative border border-l-0 cursor-pointer after:-left-full`}
										htmlFor="true">
										졸업
									</label>
								</span>
							</div> */}
					</div>
				</div>
			</div>

			{isUser ? (
				<div className="flex flex-col mt-[2.4rem] text-[1.4rem] font-thin font-IBM">
					<div className="border-b border-gray-200">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="p-[1.2rem] text-left text-gray-500">
										날짜
									</th>
									<th className="p-[1.2rem] text-left text-gray-500">
										단가
									</th>
									<th className="p-[1.2rem] text-left text-gray-500">
										횟수
									</th>
									<th className="p-[1.2rem] text-left text-gray-500">
										총액
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{[...memberData.user.sessionHistories]
									.sort((a: any, b: any) => {
										const dateA = new Date(a.date).getTime()
										const dateB = new Date(b.date).getTime()
										if (dateA > dateB) return 1
										if (dateA < dateB) return -1
										return 0
									})
									.map((sessionHistory: any) => {
										return (
											<React.Fragment key={sessionHistory.id}>
												<tr>
													<td className="p-[1.2rem] font-thin text-gray-500">
														{sessionHistory.date.split('T')[0]}
													</td>
													<td className="p-[1.2rem] font-thin text-gray-500">
														{sessionHistory.costPerSession}원
													</td>
													<td className="p-[1.2rem] font-thin text-gray-500">
														{sessionHistory.totalCount}회
													</td>
													<td className="p-[1.2rem] text-gray-500">
														{sessionHistory.costPerSession *
															sessionHistory.totalCount}
														원
													</td>
												</tr>
											</React.Fragment>
										)
									})}
							</tbody>
						</table>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-[3.2rem] h-[3.2rem] mt-[2.4rem] text-black self-center cursor-pointer "
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						onClick={() => modalVar(true)}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
			) : null}

			{modal ? (
				<div className="fixed bottom-[6.3rem] right-0 w-full font-IBM">
					<div
						className="fixed inset-0 z-[-1] bg-black opacity-20"
						onClick={() => modalVar(false)}></div>
					<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[2rem]">
						<div className="text-[3.2rem] font-bold">계약 등록</div>
						<form
							className="flex flex-col mt-[2.4rem]"
							onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col justify-between">
								<label className="text-[1.4rem]">날짜</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem] bg-white"
									type="date"
									placeholder="날짜"
									{...register('date', {
										required: true
									})}
								/>
							</div>
							{errors.date && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									세션 날짜를 선택해주세요.
								</div>
							)}
							<div className="flex flex-col justify-between mt-[1.6rem]">
								<label className="text-[1.4rem]">세션 횟수</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="세션 횟수"
									{...register('totalCount', {
										required: true,
										minLength: 1
									})}
								/>
							</div>
							{errors.totalCount && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									세션 횟수를 입력해주세요.
								</div>
							)}
							<div className="flex flex-col justify-between mt-[1.6rem]">
								<label className="text-[1.4rem]">회당 수업 단가(원)</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="회당 수업 단가(원)"
									{...register('costPerSession', {
										required: true
									})}
								/>
							</div>
							{errors.costPerSession && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									세션 회당 수업 단가(원)를 입력해주세요.
								</div>
							)}
							<div className="flex flex-col justify-between mt-[1.6rem]">
								<label className="text-[1.4rem]">수수료</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="수수료(%)"
									{...register('commission', {
										required: false
									})}
								/>
							</div>
							{errors.commission && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									수수료(%)을 입력해주세요.
								</div>
							)}
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
			) : null}
		</>
	)
}

export default Info
