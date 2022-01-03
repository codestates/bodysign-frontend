import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useRef } from 'react'
import Layout from '../../../../../../components/Layout'
import Loading from '../../../../../../components/Loading'
import {
	useCreateSessionExerciseMutation,
	useTrainerQuery
} from '../../../../../../generated/graphql'
import {
	sessionExerciseInputVar,
	userDataVar
} from '../../../../../../graphql/vars'
// import { useGetScroll } from '../../../../../../utils/useGetScroll'

const Exercise: NextPage = () => {
	const router = useRouter()
	const userData = useReactiveVar(userDataVar)
	const sessionExerciseInput = useReactiveVar(sessionExerciseInputVar)
	const refs = useRef<(HTMLSpanElement | null)[]>([])
	// const [selectedCategoryId, setSelectedCategoryId] = useState<number>()
	const { loading, data } = useTrainerQuery({
		variables: { id: userData?.id as number }
	})
	const [createSessionExercise] = useCreateSessionExerciseMutation()

	if (loading) return <Loading />
	return (
		<>
			<Layout>
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
								createSessionExercise({
									variables: {
										createSessionExerciseInput: {
											name: sessionExerciseInput.exerciseName,
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
								<div className="mt-[2.4rem]">
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
																exercise.name ===
																sessionExerciseInput.exerciseName
																	? 'ring-2 ring-[#FED06E]'
																	: ''
															} h-[7rem] flex justify-center items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md cursor-pointer hover:ring-2 hover:ring-[#FED06E]`}
															onClick={e => {
																if (
																	e !== null &&
																	e.target instanceof HTMLElement
																) {
																	sessionExerciseInputVar({
																		...sessionExerciseInput,
																		exerciseName: exercise.name
																	})
																}
															}}>
															<div>{exercise.name}</div>
														</div>
													</React.Fragment>
												)
											}
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
