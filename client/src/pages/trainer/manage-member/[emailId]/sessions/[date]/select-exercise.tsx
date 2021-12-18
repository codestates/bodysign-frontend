import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Layout from '../../../../../../components/Layout'
import Loading from '../../../../../../components/Loading'
import {
	CreateSessionExerciseDocument,
	TrainerDocument
} from '../../../../../../graphql/graphql'
import { sessionExerciseInputVar } from '../../../../../../graphql/vars'

interface Exercise {
	id: number
	name: string
}

const Exercise: NextPage = () => {
	const router = useRouter()
	const sessionExerciseInput = useReactiveVar(sessionExerciseInputVar)
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})
	const [createSessionExercise] = useMutation(
		CreateSessionExerciseDocument
	)

	const selectExerciseObject: Record<string, Exercise[]> = {}
	if (!loading) {
		const exerciseCategories = data.trainer.exerciseCategories
		for (let i = 0; i < exerciseCategories.length; i++) {
			if (selectExerciseObject[exerciseCategories[i].name] === undefined) {
				selectExerciseObject[exerciseCategories[i].name] = [
					...exerciseCategories[i].exercises
				]
			}
		}
	}

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex flex-col justify-center mx-4 my-5 font-IBM">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px] font-bold">
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
							<div>운동</div>
						</span>
						<span className="flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-3 cursor-pointer w-7 h-7"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								onClick={() => {
									// 운동 종목 추가 API
									// 어떤 사람의, 어떤 세션의, 어떤 운동의, 어떤 볼륨을 update한다.
									try {
										createSessionExercise({
											variables: {
												createSessionExerciseInput: {
													name: sessionExerciseInput.name,
													reps: sessionExerciseInput.reps,
													sets: sessionExerciseInput.sets,
													weight: sessionExerciseInput.weight,
													sessionId: sessionExerciseInput.sessionId
												}
											}
										})
									} catch (error) {
										console.log(error)
									}
								}}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</span>
					</div>

					<div className="flex justify-between mt-4 font-thin">
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
					</div>

					{Object.entries(selectExerciseObject).map((category, idx) => {
						return (
							<React.Fragment key={idx}>
								<div className="mt-4">
									<div className="text-[12px] font-bold">
										{category[0]}
									</div>
									{category[1].map(exercise => {
										return (
											<React.Fragment key={exercise.id}>
												<div className="text-[12px] mt-1">
													<div className="flex justify-center px-3 py-3 border">
														<div className="flex">
															<div
																className="cursor-pointer"
																onClick={e => {
																	if (
																		e !== null &&
																		e.target instanceof HTMLElement
																	) {
																		sessionExerciseInputVar({
																			...sessionExerciseInput,
																			name: exercise.name
																		})
																	}
																}}>
																{exercise.name}
															</div>
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
			</Layout>
		</>
	)
}

export default Exercise
