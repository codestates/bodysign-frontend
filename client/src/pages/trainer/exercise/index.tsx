import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AddCategoryIcon from '../../../components/atoms/icons/AddCategoryIcon'
import Loading from '../../../components/Loading'
import AddItem from '../../../components/molecules/Entities/AddItem'
import {
	TrainerDocument,
	useCreateExerciseCategoryMutation,
	useCreateExerciseMutation,
	useRemoveExerciseMutation,
	useTrainerQuery
} from '../../../generated/graphql'
import { modalVar, userDataVar } from '../../../graphql/vars'

interface FormInput {
	exerciseName: string
	exerciseCategoryId: number
	exerciseCategoryName: string
}

const Exercise: NextPage = () => {
	const modal = useReactiveVar(modalVar)
	const userData = useReactiveVar(userDataVar)
	const [checkModal, setCheckModal] = useState('addexercise')
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const { loading, data } = useTrainerQuery({
		variables: { id: userData?.id as number }
	})
	const [createExerciseCategory] = useCreateExerciseCategoryMutation()
	const [createExercise] = useCreateExerciseMutation()
	const [removeExercise] = useRemoveExerciseMutation()
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
							variables: { id: userData?.id }
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
							trainerId: userData?.id as number,
							name: data.exerciseCategoryName
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

	const handleModal = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e !== null && e.target instanceof HTMLDivElement) {
			setCheckModal(e.target.dataset.checkModal as string)
			modalVar(true)
		}
	}

	if (loading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem] font-bold">
					<div>운동</div>
				</span>
				<span className="flex">
					{!readyDelete ? (
						<>
							<AddCategoryIcon handleModal={handleModal} />
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
							className="cursor-pointer w-[2.8rem] h-[2.8rem]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={async () => {
								// 운동 삭제 step 2
								const deleteItemId = Array.from(deleteLists)[0]
								if (deleteItemId) {
									try {
										await removeExercise({
											variables: {
												id: deleteItemId
											},
											refetchQueries: [
												{
													query: TrainerDocument,
													variables: { id: userData?.id }
												}
											]
										})
										deleteLists.clear()
									} catch (error) {
										console.log(error)
									}
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
			</div>

			{data &&
				data.trainer.exerciseCategories &&
				data.trainer.exerciseCategories.map((exerciseCategory, idx) => {
					return (
						<React.Fragment key={idx}>
							<div className="mt-[2.4rem]">
								<div className="font-semibold text-[1.8rem]">
									{exerciseCategory?.name}
								</div>
								{exerciseCategory?.exercises &&
									exerciseCategory.exercises.map(exercise => {
										if (exercise) {
											return (
												<React.Fragment key={exercise.id}>
													<div
														className={`${
															!readyDelete ? '' : 'cursor-pointer'
														} ${
															exercise.id ===
															deleteLists.keys().next().value
																? 'ring-2 ring-[#FED06E]'
																: ''
														} flex justify-center h-[7rem] mt-[0.8rem] border text-[1.8rem] text-center rounded-full shadow-md bg-white hover:ring-2 hover:ring-[#FED06E]`}
														data-id={exercise.id}
														onClick={
															!readyDelete
																? undefined
																: e => {
																		if (
																			e !== null &&
																			e.target instanceof HTMLElement
																		) {
																			// 운동 삭제 step 1
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
														<span className="self-center">
															{exercise.name}
														</span>
													</div>
												</React.Fragment>
											)
										}
									})}
								{!readyDelete ? (
									<AddItem
										dataCheckModal="addexercise"
										handleModal={handleModal}
									/>
								) : null}
							</div>
						</React.Fragment>
					)
				})}

			{modal ? (
				checkModal === 'addexercise' ? (
					<div className="fixed bottom-[6.3rem] right-0 w-full font-IBM">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[1.6rem]">
							<div className="text-[3.2rem] font-bold">운동 추가</div>
							<form
								className="flex flex-col mt-[2.4rem]"
								onSubmit={handleSubmit(onSubmit)}>
								<div className="flex flex-col justify-between">
									<label className="text-[1.4rem]">운동 이름</label>
									<input
										className="w-full text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
										type="text"
										placeholder="운동 이름을 입력해주세요."
										{...register('exerciseName', {
											required: true
										})}
									/>
								</div>
								<div className="flex flex-col justify-between mt-[1.6rem]">
									<label className="text-[1.4rem]">카테고리</label>
									<select
										className="w-full bg-white p-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
										{...register('exerciseCategoryId', {
											required: true
										})}>
										<option value="">운동 카테고리를 선택해주세요.</option>
										{data &&
											data.trainer &&
											data.trainer.exerciseCategories &&
											data.trainer.exerciseCategories.map(
												(category: any) => (
													<option value={category.id} key={category.id}>
														{category.name}
													</option>
												)
											)}
									</select>
								</div>
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
									{...register('exerciseCategoryName', {
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
				)
			) : null}
		</>
	)
}

export default Exercise
