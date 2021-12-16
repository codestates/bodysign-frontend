import { NextPage } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../../../../components/Layout'
import dummydata from '../../../../../../../dummydata.json'
import {
	managedUserIdrVar,
	modalVar
} from '../../../../../../graphql/vars'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import {
	RemoveSessionExerciseDocument,
	UpdateSessionDocument,
	UpdateSessionExerciseDocument,
	UserDocument
} from '../../../../../../graphql/graphql'

interface FormInput {
	weight: string
	reps: string
	sets: string
}

const Detail: NextPage = () => {
	const router = useRouter()
	const managedUserId = useReactiveVar(managedUserIdrVar)
	const modal = useReactiveVar(modalVar)
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const { loading, data } = useQuery(UserDocument, {
		variables: { id: managedUserId }
	})
	const [updateSessionExercise] = useMutation(
		UpdateSessionExerciseDocument
	)
	const [removeSessionExercise] = useMutation(
		RemoveSessionExerciseDocument
	)
	const [updateSession] = useMutation(UpdateSessionDocument)

	const exercises = [
		{
			id: 1,
			name: '스쿼트',
			volumes: [
				{
					id: 1,
					weight: 85,
					reps: 5,
					sets: 1
				}
			]
		},
		{
			id: 2,
			name: '데드리프트',
			volumes: [
				{
					id: 1,
					weight: 85,
					reps: 3,
					sets: 1
				},
				{
					id: 2,
					weight: 90,
					reps: 1,
					sets: 1
				}
			]
		},
		{
			id: 3,
			name: '벤치프레스',
			volumes: [
				{
					id: 1,
					weight: 55,
					reps: 3,
					sets: 1
				},
				{
					id: 2,
					weight: 60,
					reps: 1,
					sets: 1
				}
			]
		}
		// {
		// 	id: 4,
		// 	name: '오버헤드프레스',
		// 	volumes: [
		// 		{ id: 1, weight: 30, reps: 5, sets: 1 },
		// 		{
		// 			id: 2,
		// 			weight: 32.5,
		// 			reps: 3,
		// 			sets: 1
		// 		},
		// 		{
		// 			id: 3,
		// 			weight: 35,
		// 			reps: 1,
		// 			sets: 1
		// 		}
		// 	]
		// },
		// {
		// 	id: 5,
		// 	name: '친업',
		// 	volumes: [
		// 		{
		// 			id: 1,
		// 			weight: 30,
		// 			reps: 5,
		// 			sets: 1
		// 		},
		// 		{
		// 			id: 2,
		// 			weight: 32.5,
		// 			reps: 3,
		// 			sets: 1
		// 		},
		// 		{
		// 			id: 3,
		// 			weight: 35,
		// 			reps: 1,
		// 			sets: 1
		// 		}
		// 	]
		// },
		// {
		// 	id: 6,
		// 	name: '풀업',
		// 	volumes: [
		// 		{
		// 			id: 1,
		// 			weight: 55,
		// 			reps: 5,
		// 			sets: 3
		// 		}
		// 	]
		// }
	]

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		// 볼륨 작성 API
		// try {
		// 	updateSessionExercise({
		// 		variables: {
		// 			updateSessionExerciseInput: {
		// 				id: 2,
		// 				trainerId: 21
		// 			}
		// 		}
		// 	})
		// } catch (error) {
		// 	console.log(error)
		// }
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5 font-IBM">
					<div className="flex items-center justify-between">
						<span className="flex text-[25px] font-bold">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="self-center w-6 h-6 cursor-pointer"
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
							<div className="font-bold">{dummydata[0].date}</div>
						</span>
						<span className="flex items-center">
							{!readyDelete ? (
								<>
									<span className="relative inline-block w-10 align-middle select-none">
										<input
											className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer checked:right-0 checked:border-[#fde68a] peer"
											type="checkbox"
											name="toggle"
											id="toggle"
											// checked={userData.user.graduate}
											onChange={e => {
												// 피드백 완료 여부 API
												// 데이터를 받고 checked 상태를 변경한다.
												// e.target.checked을 가지고 mutation
												// try {
												// 	updateSession({
												// 		variables: {
												// 			updateSessionInput: {
												// 				id: managedUserId,
												// 				graduate: e.target.checked
												// 			}
												// 		}
												// 	})
												// } catch (error) {
												// 	console.log(error)
												// }
											}}
										/>
										<label
											className="block h-6 bg-gray-300 rounded-full cursor-pointer peer peer-checked:bg-[#fde68a] overflow-hidden"
											htmlFor="toggle"
										/>
									</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="mx-3 w-7 h-7 cursor-pointer"
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
									className="mx-3 w-7 h-7 cursor-pointer"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									onClick={() => {
										// 운동 종목 삭제 API 2
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

					<div className="flex flex-col mt-4">
						{exercises.map(exercise => {
							return (
								<React.Fragment key={exercise.id}>
									<div className="font-thin flex px-3 py-3 mt-1 border first:mt-0 text-[16px] flex-col items-center">
										<div
											className="w-full p-3 text-center border bg-gray-50 cursor-pointer"
											onClick={
												!readyDelete
													? () => modalVar(true)
													: e => {
															if (
																e !== null &&
																e.target instanceof HTMLElement
															) {
																// 운동 종목 삭제 API 1
																// console.log(e.target.dataset.id)
																// if (e.target.dataset.id) {
																// 	const id = +e.target.dataset.id
																// 	if (deleteLists.has(id)) {
																// 		setDeleteLists(
																// 			prev =>
																// 				new Set(
																// 					[...prev].filter(el => el !== id)
																// 				)
																// 		)
																// 	} else {
																// 		setDeleteLists(
																// 			prev => new Set(prev.add(id))
																// 		)
																// 	}
																// }
															}
													  }
											}>
											{exercise.name}
										</div>
										{exercise.volumes.map(volume => {
											return (
												<React.Fragment key={volume.id}>
													<div className="flex justify-around w-full py-1 border-b last:border-b-0">
														<span className="w-full text-center">
															{volume.weight}kg
														</span>
														<span className="w-full text-center">
															{volume.reps}회
														</span>
														<span className="w-full text-center">
															{volume.sets}세트
														</span>
													</div>
												</React.Fragment>
											)
										})}
									</div>
								</React.Fragment>
							)
						})}
					</div>

					<Link
						href={`/trainer/manage-member/${
							dummydata[0].email.split('@')[0]
						}/sessions/${dummydata[0].date}/select-exercise`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="self-center w-6 h-6 mt-4 text-gray-500 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</Link>

					<textarea
						className="w-full px-10 py-3 mt-4 font-thin text-gray-400 font-IBM"
						autoFocus
						autoSave="true"
						defaultValue={'피드백을 입력해주세요.'}
						onChange={e => {
							// 피드백 작성 API
							// e.target.value
							// try {
							// 	updateSession({
							// 		variables: {
							// 			updateSessionInput: {
							// 				id: managedUserId,
							// 				feedback: e.target.value
							// 			}
							// 		}
							// 	})
							// } catch (error) {
							// 	console.log(error)
							// }
						}}></textarea>
				</div>

				{modal ? (
					<div className="font-IBM fixed max-w-[450px] w-full bottom-0">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col py-10">
							<div className="py-3 text-center text-[20px]">볼륨 작성</div>
							<form
								className="flex flex-col mt-4"
								onSubmit={handleSubmit(onSubmit)}>
								<input
									className="w-full h-12 px-10 border"
									type="text"
									placeholder="weight"
									{...register('weight', {
										required: true
									})}
								/>
								{errors.weight && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										중량(kg)를 입력해주세요.
									</div>
								)}
								<input
									className="w-full h-12 px-10 mt-1 border"
									type="text"
									placeholder="reps"
									{...register('reps', {
										required: true
									})}
								/>
								{errors.reps && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										반복수를 입력해주세요.
									</div>
								)}
								<input
									className="w-full h-12 px-10 mt-1 border"
									type="text"
									placeholder="sets"
									{...register('sets', {
										required: true,
										minLength: 1
									})}
								/>
								{errors.sets && (
									<div className="text-[16px] text-red-500 mt-1 text-center">
										세트 수를 입력해주세요.
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

export default Detail
