import { NextPage } from 'next'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { deleteStateVar, modalVar } from '../graphql/vars'
import { useReactiveVar } from '@apollo/client'

interface Exercise {
	id: number
	name: string
}

interface FormInput {
	exercise: string
	category: string
}

const Exercise: NextPage = () => {
	const [checkModal, setCheckModal] = useState('addexercise')
	const modal = useReactiveVar(modalVar)
	const deleteState = useReactiveVar(deleteStateVar)

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

	const { register, handleSubmit } = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		let test = { ...data }
		// 운동 추가 API
		// 운동 카테고리 추가 API
	}

	// 카테고리 필터 및 정렬

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center w-full mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px] font-semibold">
							<div>운동</div>
						</span>
						<span className="flex">
							{!deleteState ? (
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
										onClick={() => deleteStateVar(true)}>
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
										// 운동 삭제 API
										deleteStateVar(false)
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
									className="flex flex-col mt-4"
									onSubmit={handleSubmit(onSubmit)}>
									<input
										className="w-full h-12 px-10 border"
										type="text"
										placeholder="운동 이름을 입력해주세요."
										{...register('exercise', {
											required: true
										})}
									/>
									<select
										className="w-full h-12 px-10 mt-1 bg-white border"
										{...register('category', {
											required: true
										})}>
										<option value="">운동 카테고리를 선택해주세요.</option>
										{Object.keys(categoryObeject).map((category, idx) => (
											<option value={category} key={idx}>
												{category}
											</option>
										))}
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
										{...register('category', {
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
			</Layout>
		</>
	)
}

export default Exercise
