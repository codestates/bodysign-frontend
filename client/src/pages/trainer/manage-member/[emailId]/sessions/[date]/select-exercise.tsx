import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../../../../../components/Loading'
import {
	useBulkCreateSessionExercisesMutation,
	useTrainerLazyQuery
} from '../../../../../../generated/graphql'
import { userDataVar } from '../../../../../../graphql/vars'
import useSessionStorage from '../../../../../../hooks/useSessionStorage'
// import { useGetScroll } from '../../../../../../utils/useGetScroll'

const Exercise: NextPage = () => {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)
	const [sessionExerciseInput, _] = useSessionStorage(
		'sessionExerciseInput'
	)
	// const [selectedCategoryId, setSelectedCategoryId] = useState<number>()
	const refs = useRef<(HTMLSpanElement | null)[]>([])
	const [exerciseNames, setExerciseNames] = useState<Set<string>>(
		new Set()
	)
	const [exerciseCategoryNames, setExerciseCategoryNames] = useState<
		string[]
	>([])
	const [trainerLazyQuery, { loading, data }] = useTrainerLazyQuery()
	const [bulkCreateSessionExercises] =
		useBulkCreateSessionExercisesMutation()

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
					<Link href={router.asPath.split('select')[0]} passHref>
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
					<div className="ml-[0.8rem] font-bold">운동 추가</div>
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer w-[3.6rem] h-[3.6rem] text-[#FDAD00]"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					onClick={() => {
						// 운동 종목 추가 API
						try {
							bulkCreateSessionExercises({
								variables: {
									exerciseCategoryNames: [...exerciseCategoryNames],
									names: [...exerciseNames],
									sessionId: sessionExerciseInput.sessionId
								}
							})
							router.push(router.asPath.split('select')[0])
						} catch (error) {
							alert('운동이 추가되지 않았습니다. 다시 시도해 주세요.')
						}
					}}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>

			{/* <div className="sticky top-0 z-10 flex justify-around mt-4 bg-white border-b-1">
					{data.trainer.exerciseCategories.map(
						(category: any, idx: number) => {
							return (
								<React.Fragment key={idx}>
									<span
										className={`p-3 ${
											selectedCategoryId === idx ? 'ring-1' : ''
										}`}
										data-id={idx}
										onClick={e => {
											if (e !== null && e.target instanceof HTMLElement) {
												const id = e.target.dataset.id
												if (id) {
													refs.current[+id]?.scrollIntoView({
														behavior: 'smooth'
													})
													setSelectedCategoryId(+id)
												}
											}
										}}>
										{category.name}
									</span>
								</React.Fragment>
							)
						}
					)}
				</div> */}

			{data &&
				data.trainer.exerciseCategories &&
				data.trainer.exerciseCategories.map((exerciseCategory, idx) => {
					return (
						<React.Fragment key={idx}>
							<div className="mt-[2.4rem] ">
								<div
									className="text-[1.8rem] font-semibold"
									ref={span => {
										refs.current[idx] = span
									}}>
									{exerciseCategory?.name}
								</div>
								{exerciseCategory?.exercises &&
									exerciseCategory.exercises.map(exercise => {
										if (exercise) {
											return (
												<React.Fragment key={exercise.id}>
													<div
														className={`${
															exerciseNames.has(exercise.name)
																? 'ring-2 ring-[#FED06E]'
																: ''
														} relative h-[7rem] flex justify-center items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md cursor-pointer hover:ring-2 hover:ring-[#FED06E]`}
														onClick={e => {
															if (
																e !== null &&
																e.target instanceof HTMLElement
															) {
																if (
																	exerciseNames.has(exercise.name) &&
																	exerciseCategoryNames.includes(
																		exerciseCategory.name
																	)
																) {
																	setExerciseNames(
																		prev =>
																			new Set(
																				[...prev].filter(
																					el => el !== exercise.name
																				)
																			)
																	)
																	setExerciseCategoryNames(prev =>
																		[...prev].filter(
																			el => el !== exerciseCategory.name
																		)
																	)
																} else {
																	setExerciseNames(
																		prev =>
																			new Set(prev.add(exercise.name))
																	)
																	setExerciseCategoryNames(prev => [
																		...prev,
																		exerciseCategory.name
																	])
																}
															}
														}}>
														<div>{exercise.name}</div>
														{exerciseNames.has(exercise.name) ? (
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="w-[3.2rem] h-[3.2rem] bg-white absolute text-[#FED06E] -top-[1rem] -right-[0.5rem] rounded-full z-[10]"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor">
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
																/>
															</svg>
														) : null}
													</div>
												</React.Fragment>
											)
										}
									})}
							</div>
						</React.Fragment>
					)
				})}
		</>
	)
}

export default Exercise
