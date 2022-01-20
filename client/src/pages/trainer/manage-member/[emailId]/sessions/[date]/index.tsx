import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loading from '../../../../../../components/Loading'
import {
	SessionDocument,
	useCreateSessionExerciseVolumeMutation,
	UserDocument,
	useRemoveSessionExerciseMutation,
	useSessionLazyQuery,
	useUpdateSessionMutation
} from '../../../../../../generated/graphql'
import { modalVar } from '../../../../../../graphql/vars'
import useSessionStorage from '../../../../../../hooks/useSessionStorage'

interface FormInput {
	weight: string
	reps: string
	sets: string
}

const Detail: NextPage = () => {
	const router = useRouter()
	const modal = useReactiveVar(modalVar)
	const [mangedMemberInfo, _] = useSessionStorage('mangedMemberInfo')
	const [sessionExerciseInput, setSessionExerciseInput] =
		useSessionStorage('sessionExerciseInput')
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const [sessionLazyQuery, { loading, data }] = useSessionLazyQuery()
	const [createSessionExerciseVolume] =
		useCreateSessionExerciseVolumeMutation()
	const [updateSession] = useUpdateSessionMutation()
	const [removeSessionExercise] = useRemoveSessionExerciseMutation()
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		// 볼륨 작성 API
		try {
			createSessionExerciseVolume({
				variables: {
					createSessionExerciseVolumeInput: {
						sessionExerciseId: sessionExerciseInput.sessionExerciseId,
						reps: +data.reps,
						sets: +data.sets,
						weight: +data.weight
					}
				},
				refetchQueries: [
					{
						query: UserDocument,
						variables: { id: mangedMemberInfo.userId }
					}
				]
			})
			setSessionExerciseInput({
				...sessionExerciseInput,
				sessionExerciseId: 0
			})
			modalVar(false)
		} catch (error) {
			alert('운동이 추가되지 않았습니다.')
		}
	}

	useEffect(() => {
		sessionLazyQuery({
			variables: { id: sessionExerciseInput.sessionId }
		})
	}, [sessionExerciseInput])

	if (loading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem]">
					<Link href={router.asPath.split('20')[0]} passHref>
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
						{typeof router.query.date === 'string'
							? router.query.date.replace(/-/g, '.')
							: ''}
					</div>
				</span>
				<span className="flex">
					{!readyDelete ? (
						<>
							<span className="relative inline-block w-[4rem] align-middle select-none">
								<input
									className="absolute block w-[2.8rem] h-[2.8rem] bg-white border-4 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-[#FED06E] peer"
									type="checkbox"
									name="toggle"
									id="toggle"
									checked={data && data.session.completedSession}
									onChange={async e => {
										// 수업 완료 API
										try {
											await updateSession({
												variables: {
													updateSessionInput: {
														id: sessionExerciseInput.sessionId,
														completedSession: e.target.checked
													}
												},
												refetchQueries: [
													{
														query: SessionDocument,
														variables: {
															id: sessionExerciseInput.sessionId
														}
													}
												]
											})
										} catch (error) {
											alert('수업이 완료 처리되지 못했습니다. 다시 시도해 주세요.')
										}
									}}
								/>
								<label
									className="block h-[2.8rem]	bg-gray-200 rounded-full cursor-pointer peer peer-checked:bg-[#FED06E] overflow-hidden"
									htmlFor="toggle"
								/>
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="ml-[0.8rem] cursor-pointer w-[2.8rem] h-[2.8rem]"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={() => setReadyDelete(true)}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="cursor-pointer w-[3.6rem] h-[3.6rem] text-[#FDAD00]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={async () => {
								// 운동 종목 삭제 step 2
								const deleteItemId = Array.from(deleteLists)[0]
								if (deleteItemId) {
									try {
										await removeSessionExercise({
											variables: {
												id: deleteItemId
											},
											refetchQueries: [
												{
													query: SessionDocument,
													variables: {
														id: sessionExerciseInput.sessionId
													}
												}
											]
										})
									} catch (error) {
										alert('운동이 삭제되지 않았습니다. 다시 시도해 주세요.')
									}
									deleteLists.clear()
								}
								setReadyDelete(false)
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

				{/* <span className="text-[1.6rem] text-right">
								{mangedMemberInfo.userName} 회원
							</span> */}
			</div>

			<div className="flex flex-col mt-[2.4rem]">
				{data &&
					data.session.sessionExercises &&
					data.session.sessionExercises.map(exercise => {
						if (exercise) {
							return (
								<React.Fragment key={exercise.id}>
									<div
										className={`${
											exercise.id === deleteLists.keys().next().value
												? 'ring-2 ring-[#FED06E]'
												: ''
										} mt-[2.4rem] p-[1.6rem] border rounded-3xl first:mt-0 text-[1.8rem] flex-col items-center text-[#9F9F9F] hover:ring-2 hover:ring-[#FED06E]`}
										data-id={exercise.id}
										onClick={
											readyDelete
												? e => {
														if (
															e !== null &&
															e.target instanceof HTMLElement
														) {
															// 운동 종목 삭제 step 1
															if (e.target.dataset.id) {
																const id = +e.target.dataset.id
																// 하나만 가능한 조건
																if (deleteLists.size > 0) {
																	setDeleteLists(prev => new Set())
																}
																if (deleteLists.has(id)) {
																	setDeleteLists(
																		prev =>
																			new Set(
																				[...prev].filter(el => el !== id)
																			)
																	)
																} else {
																	setDeleteLists(
																		prev => new Set(prev.add(id))
																	)
																}
															}
														}
												  }
												: undefined
										}>
										<div
											className={`${
												readyDelete ? 'pointer-events-none poin' : ''
											} grid grid-cols-3 justify-items-center items-center w-full text-center border rounded-3xl py-[2rem] px-[0.8rem] bg-gray-50`}>
											<span className="text-[1.6rem] col-span-2">
												{exercise.exerciseCategoryName}
											</span>
											<span className="font-semibold text-black col-span-2">
												{exercise.name}
											</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="col-start-3 row-start-1 row-end-3 w-[2.8rem] h-[2.8rem] text-[#9F9F9F] cursor-pointer"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												onClick={
													!readyDelete
														? () => {
																setSessionExerciseInput({
																	...sessionExerciseInput,
																	exerciseName: exercise.name,
																	sessionExerciseId: exercise.id
																})
																modalVar(true)
														  }
														: undefined
												}>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 4v16m8-8H4"
												/>
											</svg>
										</div>
										{exercise &&
											exercise.sessionExerciseVolumes &&
											exercise.sessionExerciseVolumes.map(
												(volume: any, index: any) => {
													return (
														<div
															key={index}
															className={`${
																readyDelete ? 'pointer-events-none' : ''
															} text-black text-[1.6rem] grid grid-cols-3 justify-items-center items-center w-full py-[0.8rem] px-[0.8rem] border-b last:border-b-0`}>
															<span>{volume.weight}kg</span>
															<span>{volume.reps}회</span>
															<span>{volume.sets}세트</span>
														</div>
													)
												}
											)}
									</div>
								</React.Fragment>
							)
						}
					})}
				<div className="flex justify-center mt-[2.4rem]">
					<Link href={`${router.asPath}/select-exercise`} passHref>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-[3.2rem] h-[3.2rem] text-black self-center cursor-pointer "
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</Link>
				</div>
			</div>

			<textarea
				className="text-[1.8rem] w-full h-[10rem] border px-[2rem] py-[1.2rem] mt-[2.4rem] resize-none font-IBM"
				autoFocus
				autoSave="true"
				placeholder="수업 피드백을 입력해주세요."
				defaultValue={data && (data.session.feedback as string)}
				onBlur={e => {
					// 피드백 작성 API
					// e.target.value
					try {
						updateSession({
							variables: {
								updateSessionInput: {
									id: sessionExerciseInput.sessionId,
									feedback: e.target.value,
									sentFeedback: e.target.value === '' ? false : true
								}
							}
						})
					} catch (error) {
						alert('피드백을 다시 작성해 주세요.')
					}
				}}
			/>

			{modal ? (
				<div className="fixed bottom-0 right-0 w-full font-IBM">
					<div
						className="fixed inset-0 z-[-1] bg-black opacity-20"
						onClick={() => modalVar(false)}></div>
					<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
						<div className="text-[3.2rem] font-bold">볼륨 추가</div>
						<form
							className="flex flex-col mt-[2.4rem]"
							onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col justify-between">
								<label className="text-[1.4rem]">중량(kg)</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="weight"
									{...register('weight', {
										required: true
									})}
								/>
								{errors.weight && (
									<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
										중량(kg)를 입력해주세요.
									</div>
								)}
							</div>
							<div className="flex flex-col justify-between mt-[1.6rem]">
								<label className="text-[1.4rem]">횟수</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="reps"
									{...register('reps', {
										required: true
									})}
								/>
								{errors.reps && (
									<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
										횟수를 입력해주세요.
									</div>
								)}
							</div>
							<div className="flex flex-col justify-between mt-[1.6rem]">
								<label className="text-[1.4rem]">세트</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="sets"
									{...register('sets', {
										required: true,
										minLength: 1
									})}
								/>
							</div>
							{errors.sets && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									세트를 입력해주세요.
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

export default Detail
