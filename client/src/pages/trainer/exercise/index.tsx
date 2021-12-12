import { NextPage } from 'next'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import { modalVar } from '../../../graphql/vars'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import {
	CreateExerciseCategoryDocument,
	CreateExerciseDocument,
	RemoveExerciseDocument,
	TrainerDocument
} from '../../../graphql/graphql'
import Loading from '../../../components/Loading'
import BottomBar from '../../../components/BottomBar'

interface Exercise {
	id: number
	name: string
	isChecked: boolean
}

interface FormInput {
	exerciseName: string
	exerciseCategoryId: number
	exerciseCategoryName: string
}

const Exercise: NextPage = () => {
	const modal = useReactiveVar(modalVar)
	const [checkModal, setCheckModal] = useState('addexercise')
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})
	const [createExerciseCategory] = useMutation(
		CreateExerciseCategoryDocument
	)
	const [createExercise] = useMutation(CreateExerciseDocument)
	const [removeExercise] = useMutation(RemoveExerciseDocument)
	const { register, handleSubmit } = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		// 운동 추가 API
		if (checkModal === 'addexercise') {
			try {
				createExercise({
					variables: {
						createExerciseInput: {
							name: data.exerciseName,
							exerciseCategoryId: +data.exerciseCategoryId
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
		// 운동 카테고리 추가 API
		else if (checkModal === 'addcategory') {
			try {
				await createExerciseCategory({
					variables: {
						createExerciseCategoryInput: {
							trainerId: 21,
							name: data.exerciseCategoryName
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

	const exerciseObject: Record<string, Exercise[]> = {}
	if (!loading) {
		const exerciseCategories = data.trainer.exerciseCategories
		for (let i = 0; i < exerciseCategories.length; i++) {
			if (exerciseObject[exerciseCategories[i].name] === undefined) {
				exerciseObject[exerciseCategories[i].name] = [
					...exerciseCategories[i].exercises
				]
			}
		}
	}

	if (loading) return <Loading />
	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[25px] font-bold">
							<div>운동</div>
						</span>
						<span className="flex">
							{!readyDelete ? (
								<>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="self-center w-6 h-6 cursor-pointer"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										data-check-modal="addexercise"
										onClick={e => {
											modalVar(true)
											if (
												e !== null &&
												e.target instanceof SVGSVGElement
											) {
												{
													setCheckModal(
														e.target.dataset.checkModal as string
													)
												}
											}
										}}>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M12 4v16m8-8H4"
										/>
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="mx-3 cursor-pointer w-7 h-7"
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
									className="mx-3 cursor-pointer w-7 h-7"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									onClick={() => {
										// 운동 삭제 API 2
										console.log(...deleteLists)
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
							{data.trainer.exerciseCategories.map((category: any) => {
								return (
									<React.Fragment key={category.id}>
										<span className="ml-2 font-thin first:ml-0">
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
								modalVar(true)
								if (e !== null && e.target instanceof HTMLElement) {
									{
										setCheckModal(e.target.dataset.checkModal as string)
									}
								}
							}}>
							+카테고리
						</span>
					</div>

					{Object.entries(exerciseObject).map((category, idx) => {
						return (
							<React.Fragment key={idx}>
								<div className="mt-4">
									<div className="text-[12px] font-bold">
										{category[0]}
									</div>
									{category[1].map(exercise => {
										// console.log(exercise.isChecked)
										return (
											<React.Fragment key={exercise.id}>
												<div className="text-[12px] mt-1">
													<div
														className={`flex justify-center px-3 py-3 font-thin border rounded-3xl ${
															!readyDelete ? null : 'cursor-pointer'
														}`}
														data-id={exercise.id}
														onClick={
															!readyDelete
																? undefined
																: e => {
																		if (
																			e !== null &&
																			e.target instanceof HTMLElement
																		) {
																			// 운동 삭제 API 1
																			if (e.target.dataset.id) {
																				const id = +e.target.dataset.id
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
																						prev => new Set(prev.add(id))
																					)
																				}
																			}
																		}
																  }
														}>
														<div className="flex">
															<div className="ml-1">{exercise.name}</div>
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
				</div>

				{modal ? (
					checkModal === 'addexercise' ? (
						<div className="fixed max-w-[450px] w-full bottom-0">
							<div
								className="fixed inset-0 z-[-1] bg-black opacity-20"
								onClick={() => modalVar(false)}></div>
							<div className="bg-white flex z-[50] h-full flex-col py-10">
								<div className="py-3 text-center text-[20px]">
									운동 추가
								</div>
								<form
									className="flex flex-col mt-4 text-[12px]"
									onSubmit={handleSubmit(onSubmit)}>
									<input
										className="w-full h-12 px-10 border"
										type="text"
										placeholder="운동 이름을 입력해주세요."
										{...register('exerciseName', {
											required: true
										})}
									/>
									<select
										className="w-full h-12 px-10 mt-1 bg-white border"
										{...register('exerciseCategoryId', {
											required: true
										})}>
										<option value="">운동 카테고리를 선택해주세요.</option>
										{data.trainer.exerciseCategories.map(
											(category: any) => (
												<option value={category.id} key={category.id}>
													{category.name}
												</option>
											)
										)}
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
					) : (
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
										{...register('exerciseCategoryName', {
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
					)
				) : null}
				<BottomBar variant="Trainer" />
			</Layout>
		</>
	)
}

export default Exercise
