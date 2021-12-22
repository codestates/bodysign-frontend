import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { useRouter } from 'next/dist/client/router'
import Layout from '../../../../components/Layout'
import Loading from '../../../../components/Loading'
import {
	sessionExerciseInputVar,
	userDataVar
} from '../../../../graphql/vars'
import { SessionDocument } from '../../../../graphql/graphql'

const Detail: NextPage = () => {
	const router = useRouter()
	const sessionExerciseInput = useReactiveVar(sessionExerciseInputVar)
	const { loading, data } = useQuery(SessionDocument, {
		variables: { id: sessionExerciseInput.sessionId }
	})

	if (loading) return <Loading />
	return (
		<>
			<Layout>
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
				</div>

				<div className="flex flex-col mt-[2.4rem]">
					{data.session.sessionExercises.map((exercise: any) => {
						return (
							<React.Fragment key={exercise.id}>
								<div
									className={`mt-[2.4rem] p-[1.6rem] border rounded-3xl first:mt-0 text-[1.8rem] flex-col items-center text-[#9F9F9F] `}>
									<div
										className={`grid grid-cols-3 justify-items-center items-center w-full text-center border rounded-3xl py-[2rem] px-[0.8rem] bg-gray-50 cursor-pointer `}
										data-id={exercise.id}>
										<span>{'카테고리'}</span>
										<span className="font-semibold text-black">
											{exercise.name}
										</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-[2.8rem] h-[2.8rem] text-[#9F9F9F]"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 4v16m8-8H4"
											/>
										</svg>
									</div>
									{exercise.sessionExerciseVolumes.map(
										(volume: any, index: any) => {
											return (
												<div
													key={index}
													className="text-black text-[1.6rem] grid grid-cols-3 justify-items-center items-center w-full py-[0.8rem] px-[0.8rem] border-b last:border-b-0">
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
					})}
				</div>

				<textarea
					className="text-[1.8rem] w-full h-[10rem] border px-[2rem] py-[1.2rem] mt-[2.4rem] resize-none font-IBM"
					autoFocus
					autoSave="true"
					defaultValue={data.session.feedback}
				/>
			</Layout>
		</>
	)
}

export default Detail
