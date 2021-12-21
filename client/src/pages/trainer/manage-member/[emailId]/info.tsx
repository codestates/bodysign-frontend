import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../../components/Layout'
import { managedUserInfoVar, modalVar } from '../../../../graphql/vars'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import {
	CreateSessionHistoryDocument,
	TrainerDocument,
	UpdateUserDocument,
	UserDocument
} from '../../../../graphql/graphql'
import Loading from '../../../../components/Loading'
import { useRouter } from 'next/dist/client/router'

interface FormInput {
	date: string
	costPerSession: number
	totalCount: number
	commission: number
}

const Info: NextPage = () => {
	const router = useRouter()
	const modal = useReactiveVar(modalVar)
	const managedUserInfo = useReactiveVar(managedUserInfoVar)
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})
	const { loading: userLoading, data: userData } = useQuery(UserDocument, {
		variables: { id: managedUserInfo.userId }
	})
	const [updateUser] = useMutation(UpdateUserDocument)
	const [createSessionHistory] = useMutation(CreateSessionHistoryDocument)

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		// 세션 추가 API
		createSessionHistory({
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
				{ query: UserDocument, variables: { id: managedUserInfo.userId } }
			]
		})
	}

	if (loading) return <Loading />
	if (userLoading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[25px]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="self-center w-6 h-6 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={() => router.push('/trainer/manage-member')}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<div className="font-bold">
							{userData.user.userName} 회원님
						</div>
					</span>
					<span className="flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mr-3"
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
					</span>
				</div>

				<div className="flex justify-between pr-3 mt-4 text-[12px]">
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/info`}
						passHref
					>
						<span className="pb-1 ml-0 border-b border-black cursor-pointer">
							회원정보
						</span>
					</Link>
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/sessions`}
						passHref
					>
						<span className="ml-2 cursor-pointer">수업기록</span>
					</Link>
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/inbody`}
						passHref
					>
						<span className="ml-2 cursor-pointer">인바디</span>
					</Link>
				</div>

				<div className="mt-4">
					<div className="flex flex-col justify-between px-3 py-3 text-[15px]">
						<div className="flex justify-between">
							<span>이름</span>
							<span>{userData.user.userName}</span>
						</div>
						<div className="flex justify-between mt-1">
							<span>성별</span>
							<span>{userData.user.gender}</span>
						</div>
						<div className="flex justify-between mt-1">
							<span>생년월일</span>
							<span>{userData.user.birthDate.split('T')[0]}</span>
						</div>
						<div className="flex justify-between mt-1">
							<span>전화번호</span>
							<span>{userData.user.phoneNumber}</span>
						</div>
						<div className="flex justify-between mt-1">
							<span>졸업유무</span>
							<span className="relative inline-block w-10 align-middle select-none">
								<input
									className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-[#fde68a] peer"
									type="checkbox"
									name="toggle"
									id="toggle"
									checked={userData.user.graduate}
									onChange={e => {
										// 졸업 유무 변경 API
										try {
											updateUser({
												variables: {
													updateUserInput: {
														id: managedUserInfo.userId,
														graduate: e.target.checked
													}
												}
											})
										} catch (error) {
											console.log(error)
										}
									}}
								/>
								<label
									className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer peer peer-checked:bg-[#fde68a]"
									htmlFor="toggle"
								/>
							</span>
						</div>
						<div className="flex justify-between mt-1">
							<label>회원 카테고리</label>
							{loading ? (
								<Loading />
							) : (
								<select
									className="bg-white border"
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
												}
											})
										} catch (error) {
											console.log(error)
										}
									}}>
									<option value={`${userData.user.userCategoryId}`}>
										{
											data.trainer.userCategories.filter(
												(category: any) =>
													category.id === userData.user.userCategoryId
											)[0].name
										}
									</option>
									{data.trainer.userCategories.map((category: any) => {
										if (category.id !== userData.user.userCategoryId) {
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
					</div>
				</div>
				<div className="flex flex-col mt-4 text-[12px]">
					<div className="border-b border-gray-200">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="p-3 text-left text-gray-500">날짜</th>
									<th className="p-3 text-left text-gray-500">단가</th>
									<th className="p-3 text-left text-gray-500">횟수</th>
									<th className="p-3 text-left text-gray-500">총액</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{[...userData.user.sessionHistories]
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
													<td className="p-3 font-thin text-gray-500">
														{sessionHistory.date.split('T')[0]}
													</td>
													<td className="p-3 font-thin text-gray-500">
														{sessionHistory.costPerSession}원
													</td>
													<td className="p-3 font-thin text-gray-500">
														{sessionHistory.totalCount}회
													</td>
													<td className="p-3 text-gray-500">
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
						className="self-center w-6 h-6 mt-4 text-gray-500 cursor-pointer"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						onClick={() => modalVar(true)}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</div>

				{modal ? (
					<div className="font-IBM fixed max-w-[450px] w-full bottom-0">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col py-10">
							<div className="py-3 text-center text-[20px]">세션 추가</div>
							<form
								className="flex flex-col mt-4"
								onSubmit={handleSubmit(onSubmit)}>
								<input
									className="w-full h-12 px-10 border"
									type="date"
									placeholder="날짜"
									{...register('date', {
										required: true
									})}
								/>
								{errors.date && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										세션 날짜를 선택해주세요.
									</div>
								)}
								<input
									className="w-full h-12 px-10 mt-1 border"
									type="text"
									placeholder="회당 수업 단가(원)"
									{...register('costPerSession', {
										required: true
									})}
								/>
								{errors.costPerSession && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										세션 회당 수업 단가(원)를 입력해주세요.
									</div>
								)}
								<input
									className="w-full h-12 px-10 mt-1 border"
									type="text"
									placeholder="세션 횟수"
									{...register('totalCount', {
										required: true,
										minLength: 1
									})}
								/>
								{errors.totalCount && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										세션 횟수를 입력해주세요.
									</div>
								)}
								<input
									className="w-full h-12 px-10 mt-1 border"
									type="text"
									placeholder="정산 금액(원)"
									{...register('commission', {
										required: false
									})}
								/>
								{errors.commission && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										정산 금액(원)을 입력해주세요.
									</div>
								)}

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
				) : null}
			</Layout>
		</>
	)
}

export default Info
