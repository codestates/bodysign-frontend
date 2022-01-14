import { useReactiveVar } from '@apollo/client'
import { removeCookies } from 'cookies-next'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loading from '../../../components/Loading'
import {
	useRemoveTrainerMutation,
	useTrainerLazyQuery,
	useUpdatePasswordTrainerMutation,
	useUpdateTrainerMutation
} from '../../../generated/graphql'
import { modalVar, userDataVar } from '../../../graphql/vars'

interface FormInput {
	prevPassword: string
	nowPassword: string
	checkPassword: string
}

const TrainerInfo: NextPage = () => {
	const router = useRouter()
	const modal = useReactiveVar(modalVar)
	const userData = useReactiveVar(userDataVar)
	const [checkModal, setCheckModal] = useState('changepassword')
	const [isModify, setIsmodify] = useState(false)
	const [updateTrainerInput, setUpdateTrainerInput] = useState({
		phoneNumber: ''
	})
	const [trainerLazyQuery, { loading, data }] = useTrainerLazyQuery()
	const [updateTrainer] = useUpdateTrainerMutation()
	const [removeTrainer] = useRemoveTrainerMutation()
	const [updatePasswordTrainer] = useUpdatePasswordTrainerMutation()
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<FormInput>()
	const nowPassword = watch('nowPassword', '')
	const onSubmit: SubmitHandler<FormInput> = async data => {
		// 비밀번호 변경 API
		try {
			await updatePasswordTrainer({
				variables: {
					updatePasswordTrainerInput: {
						id: userData?.id as number,
						prevPassword: data.prevPassword,
						nowPassword: data.nowPassword
					}
				}
			})
			modalVar(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (userData) {
			trainerLazyQuery({
				variables: { id: userData?.id as number }
			})
		}
	}, [userData])

	if (loading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem]">
					<Link href="/trainer/menu" passHref>
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
					<div className="ml-[0.8rem] font-bold">내 정보</div>
				</span>
				<span className="flex">
					{!isModify ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-[2.8rem] h-[2.8rem]"
							viewBox="0 0 20 20"
							fill="currentColor"
							onClick={async () => {
								setIsmodify(true)
							}}>
							<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
							<path
								fillRule="evenodd"
								d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
								clipRule="evenodd"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="ml-[0.8rem] w-[2.8rem] h-[2.8rem]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={async () => {
								// 정보 수정 API
								try {
									await updateTrainer({
										variables: {
											updateTrainerInput: {
												...updateTrainerInput,
												id: userData?.id as number
											}
										}
									})
								} catch (error) {
									console.log(error)
								}
								setIsmodify(false)
							}}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					)}
				</span>
			</div>

			<div className="mt-[1.6rem] text-[1.8rem]">
				{data && data.trainer && (
					<div className="flex flex-col justify-between">
						<div className="flex justify-between">
							<span>이름</span>
							<span className="font-thin">{data.trainer.userName}</span>
						</div>
						<div className="flex justify-between mt-[0.4rem]">
							<span>성별</span>
							<span className="font-thin">{data.trainer.gender}</span>
						</div>
						<div className="flex justify-between mt-[0.4rem]">
							<span>이메일</span>
							<span className="font-thin">{data.trainer.email}</span>
						</div>
						<div className="flex justify-between mt-[0.4rem]">
							<span>생년월일</span>
							<span className="font-thin">
								{data.trainer.birthDate.split('T')[0]}
							</span>
						</div>
						<div className="flex justify-between mt-[0.4rem]">
							<span>전화번호</span>
							{!isModify ? (
								<span className="font-thin">
									{data.trainer.phoneNumber}
								</span>
							) : (
								<input
									type="text"
									defaultValue={
										data.trainer.phoneNumber
											? data.trainer.phoneNumber
											: undefined
									}
									onChange={e => {
										setUpdateTrainerInput({
											...updateTrainerInput,
											phoneNumber: e.target.value
										})
									}}
								/>
							)}
						</div>
					</div>
				)}
				<div className="flex flex-col items-end mt-[0.8rem]">
					<button
						className="font-thin w-[14rem] p-[1.2rem] text-[1.4rem] border"
						data-check-modal="changepassword"
						onClick={e => {
							if (e !== null && e.target instanceof HTMLButtonElement) {
								{
									setCheckModal(e.target.dataset.checkModal as string)
								}
							}
							modalVar(true)
						}}>
						비밀번호 변경
					</button>
					<button
						className="font-thin w-[14rem] p-[1.2rem] mt-[0.4rem] text-[1.4rem] border"
						onClick={() => {
							removeCookies('accessToken')
							removeCookies('refreshToken')
							router.push('/')
						}}>
						로그아웃
					</button>
				</div>
			</div>
			<div
				className="text-[1.8rem] text-red-600 hover:text-gray-400 cursor-pointer absolute bottom-[2rem]"
				data-check-modal="deleteaccount"
				onClick={e => {
					if (e !== null && e.target instanceof HTMLElement) {
						{
							setCheckModal(e.target.dataset.checkModal as string)
						}
					}
					modalVar(true)
				}}>
				회원탈퇴
			</div>

			{modal ? (
				checkModal === 'changepassword' ? (
					<div className="fixed bottom-0 right-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
							<div className="text-[3.2rem] font-bold">비밀번호 변경</div>
							<form
								className="flex flex-col mt-[2.4rem]"
								onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col justify-between">
									<label className="text-[1.4rem]">현재 비밀번호</label>
									<input
										className="w-full text-center border rounded-3xl shadow-md h-[5.5rem]"
										type="password"
										placeholder="기존 비밀번호"
										{...register('prevPassword', {
											required: true
										})}
									/>{' '}
								</div>
								<div className="flex flex-col justify-between mt-[1.6rem]">
									<label className="text-[1.4rem]">새 비밀번호</label>
									<input
										className="w-full text-center border rounded-3xl shadow-md h-[5.5rem]"
										type="password"
										placeholder="새 비밀번호"
										{...register('nowPassword', {
											required: true,
											minLength: 8
										})}
									/>{' '}
								</div>
								{errors.nowPassword?.type === 'minLength' && (
									<p className="text-[16px] text-red-500 mt-[0.8rem] text-center">
										비밀번호는 최소 8자 이상으로 입력해주세요.
									</p>
								)}
								<div className="flex flex-col justify-between mt-[1.6rem]">
									<label className="text-[1.4rem]">비밀번호 확인</label>
									<input
										className="w-full text-center border rounded-3xl shadow-md h-[5.5rem]"
										type="password"
										placeholder="비밀번호 확인"
										{...register('checkPassword', {
											required: true,
											// minLength: 8
											validate: value => value === nowPassword
										})}
									/>{' '}
								</div>
								{errors.checkPassword && (
									<p className="text-[16px] text-red-500 mt-[0.8rem] text-center">
										비밀번호가 일치하지 않습니다.
									</p>
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
				) : (
					<div className="fixed bottom-0 right-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
							<div className="text-[2.4rem] font-bold">
								회원탈퇴를 진행하시겠습니까?
							</div>

							<div className="flex flex-col justify-between mt-[2.4rem]">
								<button
									className="w-full text-center border rounded-3xl shadow-md cursor-pointer h-[5.5rem]"
									type="submit"
									onClick={() => modalVar(false)}>
									취소
								</button>
								<button
									className="w-full mt-[1.6rem] text-center border rounded-3xl shadow-md cursor-pointer h-[5.5rem] bg-[#FED06E]"
									type="submit"
									onClick={async () => {
										// 회원탈퇴 API
										try {
											await removeTrainer({
												variables: {
													id: 1
												}
											})
										} catch (error) {
											console.log(error)
										}
										modalVar(false)
									}}>
									완료
								</button>
							</div>
						</div>
					</div>
				)
			) : null}
		</>
	)
}

export default TrainerInfo
