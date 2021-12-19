import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useRef } from 'react'
import Layout from '../../../../../../components/Layout'
import Loading from '../../../../../../components/Loading'
import {
	CreateSessionExerciseDocument,
	TrainerDocument
} from '../../../../../../graphql/graphql'
import { sessionExerciseInputVar } from '../../../../../../graphql/vars'
import { useGetScroll } from '../../../../../../utils/useGetScroll'

interface Exercise {
	id: number
	name: string
}

const Exercise: NextPage = () => {
	const router = useRouter()
	const sessionExerciseInput = useReactiveVar(sessionExerciseInputVar)
	const refs = useRef<(HTMLSpanElement | null)[]>([])
	// const [selectedCategoryId, setSelectedCategoryId] = useState<number>()
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
				<div className="flex items-center justify-between">
					<span className="flex text-[20px] font-bold">
						<Link href={router.asPath.split('select')[0]}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="self-center w-6 h-6 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</Link>
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
												sessionId: sessionExerciseInput.sessionId
											}
										}
									})
									router.push(router.asPath.split('select')[0])
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

				{/* <div className="flex justify-around mt-4 border-b-1 top-0 sticky z-10 bg-white">
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

				{Object.entries(selectExerciseObject).map((category, idx) => {
					return (
						<React.Fragment key={idx}>
							<div className="mt-4">
								<div
									className="text-[12px] font-bold"
									ref={span => {
										refs.current[idx] = span
									}}>
									{category[0]}
								</div>
								{category[1].map(exercise => {
									return (
										<React.Fragment key={exercise.id}>
											<div className="text-[12px] mt-1">
												<div
													className={`flex justify-center px-3 py-3 border ${
														exercise.name === sessionExerciseInput.name
															? 'ring-2'
															: ''
													}`}>
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
			</Layout>
		</>
	)
}

export default Exercise
