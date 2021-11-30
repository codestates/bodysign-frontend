import { NextPage } from 'next'
import React from 'react'
import Layout from '../../../../../../components/Layout'

interface Exercise {
	id: number
	name: string
}

const Exercise: NextPage = () => {
	const exerciseCategory = [
		{ id: 1, name: '케틀벨', exercise: { id: 1, name: '스윙' } },
		{ id: 1, name: '케틀벨', exercise: { id: 2, name: '프레스' } },
		{ id: 2, name: '바벨', exercise: { id: 3, name: '데드리프트' } },
		{ id: 2, name: '바벨', exercise: { id: 4, name: '스쿼트' } },
		{ id: 2, name: '바벨', exercise: { id: 5, name: '벤치프레스' } },
		{ id: 2, name: '바벨', exercise: { id: 6, name: '오버헤드프레스' } },
		{ id: 2, name: '유산소', exercise: { id: 7, name: '런닝머신' } },
		{ id: 2, name: '유산소', exercise: { id: 8, name: '사이클' } }
	]

	const categoryObeject: Record<string, Exercise[]> = {}
	for (let i = 0; i < exerciseCategory.length; i++) {
		if (categoryObeject[exerciseCategory[i].name] === undefined) {
			categoryObeject[exerciseCategory[i].name] = []
		}
		categoryObeject[exerciseCategory[i].name].push(
			exerciseCategory[i].exercise
		)
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center w-full mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px] font-semibold">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="self-center w-6 h-6"
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

					<div className="flex justify-between mt-4">
						<span>
							{Object.keys(categoryObeject).map((category, idx) => {
								return (
									<React.Fragment key={idx}>
										<span className="ml-2 first:ml-0">{category}</span>
									</React.Fragment>
								)
							})}
						</span>
						<span
							className="mr-3 text-gray-400 cursor-pointer"
							data-check-modal="addcategory">
							+카테고리
						</span>
					</div>

					{Object.entries(categoryObeject).map((category, idx) => {
						return (
							<React.Fragment key={idx}>
								<div className="mt-4">
									<div className="text-[16px]">{category[0]}</div>
									{category[1].map(exercise => {
										return (
											<React.Fragment key={exercise.id}>
												<div className="text-[16px] mt-1">
													<div className="flex justify-center px-3 py-3 border">
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
			</Layout>
		</>
	)
}

export default Exercise
