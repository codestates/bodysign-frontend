import { NextPage } from 'next'
import React, { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import { modalVar } from '../../../graphql/vars'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import {
	RemoveTrainerDocument,
	TrainerDocument,
	UpdateTrainerDocument
} from '../../../graphql/graphql'
import Loading from '../../../components/Loading'
import { useRouter } from 'next/dist/client/router'

interface FormInput {
	password: string
	newPassword: string
	checkPassword: string
}

const TrainerInfo: NextPage = () => {
	const router = useRouter()
	const modal = useReactiveVar(modalVar)
	const [checkModal, setCheckModal] = useState('changepassword')
	const [isModify, setIsmodify] = useState(false)
	const [updateTrainerInput, setUpdateTrainerInput] = useState({
		email: '',
		phoneNumber: ''
	})
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})
	const [updateTrainer] = useMutation(UpdateTrainerDocument)
	const [removeTrainer] = useMutation(RemoveTrainerDocument)

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<FormInput>()
	const newPassword = watch('newPassword', '')
	const onSubmit: SubmitHandler<FormInput> = async data => {
		// 비밀번호 변경 API
		try {
			await updateTrainer({
				variables: {
					updateTrainerInput: {
						id: 21,
						password: data.newPassword
					}
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[20px]">
						<svg
							className="w-6 h-6 cursor-pointer"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={() => router.back()}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<div className="font-bold">{data.trainer.userName} 회원님</div>
					</span>
					<span className="flex">
						{!isModify ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
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
								className="w-7 h-7"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={async () => {
									// 정보 수정 API
									console.log(updateTrainerInput)

									try {
										await updateTrainer({
											variables: {
												updateTrainerInput: {
													...updateTrainerInput,
													id: 21
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
									strokeWidth={1.5}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						)}
					</span>
				</div>

				<div className="mt-4">
					<div className="flex flex-col justify-between px-3 py-3">
						<div className="flex justify-between">
							<span>이름</span>
							<span className="font-thin">{data.trainer.userName}</span>
						</div>
						<div className="flex justify-between mt-1">
							<span>성별</span>
							<span className="font-thin">{data.trainer.gender}</span>
						</div>
						<div className="flex justify-between mt-1">
							<span>이메일</span>
							{!isModify ? (
								<span className="font-thin">{data.trainer.email}</span>
							) : (
								<input
									type="text"
									defaultValue={data.trainer.email}
									onChange={e => {
										setUpdateTrainerInput({
											...updateTrainerInput,
											email: e.target.value
										})
									}}
								/>
							)}
						</div>
						<div className="flex justify-between mt-1">
							<span>생년월일</span>
							<span className="font-thin">
								{data.trainer.birthDate.split('T')[0]}
							</span>
						</div>
						<div className="flex justify-between mt-1">
							<span>전화번호</span>
							{!isModify ? (
								<span className="font-thin">
									{data.trainer.phoneNumber}
								</span>
							) : (
								<input
									type="text"
									defaultValue={data.trainer.phoneNumber}
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
				</div>

				<div className="mx-5 mt-4">
					<button
						data-check-modal="changepassword"
						onClick={e => {
							if (e !== null && e.target instanceof HTMLButtonElement) {
								{
									setCheckModal(e.target.dataset.checkModal as string)
								}
							}
							modalVar(true)
						}}
						className="font-thin w-[100px] p-1 my-2 text-[10px] border float-right hover:bg-gray-50 self-end">
						비밀번호 변경
					</button>
					<div
						data-check-modal="deleteaccount"
						onClick={e => {
							if (e !== null && e.target instanceof HTMLElement) {
								{
									setCheckModal(e.target.dataset.checkModal as string)
								}
							}
							modalVar(true)
						}}
						className="inline-block mt-10 text-[6px] text-red-600 hover:text-gray-400 hover:cursor-pointer">
						회원탈퇴
					</div>
				</div>

				{modal ? (
					checkModal === 'changepassword' ? (
						<div className="fixed max-w-[450px] w-full bottom-0">
							<div
								className="fixed inset-0 z-[-1] bg-black opacity-20"
								onClick={() => modalVar(false)}></div>
							<div className="bg-white flex z-[50] h-full flex-col py-10">
								<div className="py-3 text-center text-[20px]">
									비밀번호 변경
								</div>
								<form
									className="flex flex-col mt-4"
									onSubmit={handleSubmit(onSubmit)}>
									<input
										className="w-full h-12 px-10 border"
										type="password"
										placeholder="기존 비밀번호"
										{...register('password', {
											required: true
										})}
									/>
									<input
										className="w-full h-12 px-10 mt-1 border"
										type="password"
										placeholder="새 비밀번호"
										{...register('newPassword', {
											required: true,
											minLength: 8
										})}
									/>
									{errors.newPassword?.type === 'minLength' && (
										<p className="text-[16px] text-red-500 mt-1 text-center">
											비밀번호는 최소 8자 이상으로 입력해주세요.
										</p>
									)}
									<input
										className="w-full h-12 px-10 mt-1 border"
										type="password"
										placeholder="비밀번호 확인"
										{...register('checkPassword', {
											required: true,
											// minLength: 8
											validate: value => value === newPassword
										})}
									/>
									{errors.checkPassword && (
										<p className="text-[16px] text-red-500 mt-1 text-center">
											비밀번호가 일치하지 않습니다.
										</p>
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
					) : (
						<div className="fixed max-w-[450px] w-full bottom-0">
							<div
								className="fixed inset-0 z-[-1] bg-black opacity-20"
								onClick={() => modalVar(false)}></div>
							<div className="bg-white flex z-[50] h-full flex-col py-10">
								<div className="py-3 text-center text-[20px]">
									회원탈퇴를 진행하시겠습니까?
								</div>
								<div className="max-w-[450px] self-end mt-4">
									<button
										className="px-4 py-3 bg-gray-100 border"
										onClick={() => modalVar(false)}>
										취소
									</button>
									<button
										className="px-4 py-3 mx-3 bg-red-100 border"
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
										확인
									</button>
								</div>
							</div>
						</div>
					)
				) : null}
			</Layout>
		</>
	)
}

export default TrainerInfo
