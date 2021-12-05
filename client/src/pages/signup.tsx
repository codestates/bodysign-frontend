import { NextPage } from 'next'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'

interface FormInput {
	email: string
	password: string
	name: string
	birth: string
	phone: string
	loginType: string
	gender: string
}

const labelProperties =
	'after:absolute after:h-full after:bg-yellow-100 after:w-full after:top-0 after:z-[-1] after:transition-[left] after:duration-500 peer-checked:cursor-default peer-checked:text-black peer-checked:after:left-0'

const Signup: NextPage = () => {
	const [areYouTrainer, setAreYouTrainer] = useState(true)
	const [exerciseTypes, setExerciseTypes] = useState([
		{ id: 0, name: 'PT샵', status: false },
		{ id: 1, name: '헬스장', status: false },
		{ id: 2, name: '크로스핏', status: false },
		{ id: 3, name: '요가', status: false },
		{ id: 4, name: '필라테스', status: false },
		{ id: 5, name: '기타', status: false }
	])

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		let test = { ...data }
		// 회원가입 API
		console.log(test)
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col mx-4 my-5 text-[12px]">
					<div className="text-[20px] text-center">회원가입</div>

					<form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label>이메일</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="text"
								{...register('email', {
									required: true,
									pattern:
										/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
								})}
							/>
							{errors.email && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									이메일 형식을 지켜주세요.
								</div>
							)}
						</div>

						<div className="mt-4">
							<label>비밀번호</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="password"
								{...register('password', {
									required: true,
									minLength: 8
								})}
							/>
							{errors.password?.type === 'minLength' && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									비밀번호는 최소 8자 이상으로 입력해주세요.
								</div>
							)}
						</div>

						<div className="mt-4">
							<label>이름</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="text"
								{...register('name', {
									required: true
								})}
							/>
						</div>

						<div className="mt-4">
							<label>생년월일</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="date"
								{...register('birth', {
									required: true
								})}
							/>
						</div>

						<div className="mt-4">
							<label>휴대폰 번호</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="text"
								{...register('phone', {
									required: true,
									pattern: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/
								})}
							/>
							{errors.phone && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									붙임표(-)는 제외하고 입력해주세요.
								</div>
							)}
						</div>

						<div className="mt-4">
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="male"
									value="male"
									defaultChecked
									{...register('gender', {
										required: true
									})}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-r-0 cursor-pointer after:left-full`}
									htmlFor="male">
									남성
								</label>
							</span>
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="female"
									value="female"
									{...register('gender', {
										required: true
									})}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-l-0 cursor-pointer after:-left-full`}
									htmlFor="female">
									여성
								</label>
							</span>
						</div>

						<div className="mt-4">
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="trainer"
									value="trainer"
									defaultChecked
									{...register('loginType', {
										required: true
									})}
									onClick={() => setAreYouTrainer(true)}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-r-0 cursor-pointer after:left-full`}
									htmlFor="trainer">
									트레이너
								</label>
							</span>
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="user"
									value="user"
									{...register('loginType', {
										required: true
									})}
									onClick={() => setAreYouTrainer(false)}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-l-0 cursor-pointer after:-left-full`}
									htmlFor="user">
									회원
								</label>
							</span>
						</div>

						{areYouTrainer ? (
							<div className="flex flex-col mt-4">
								<div className="text-center">
									Pick a few types that you're interested in.
								</div>
								<div className="flex flex-wrap justify-between py-2">
									{exerciseTypes.map(type => {
										return (
											<React.Fragment key={type.id}>
												<span
													className={`p-1 ring-1 ring-green-200 flex items-center ${
														exerciseTypes[type.id].status
															? 'bg-yellow-100 '
															: ''
													}`}
													data-id={type.id}
													onClick={e => {
														if (
															e !== null &&
															e.target instanceof HTMLElement
														) {
															const idx = Number(e.target.dataset.id)
															if (exerciseTypes[idx].status) {
																setExerciseTypes(
																	exerciseTypes.map(type => {
																		if (type.id === idx) {
																			type.status = false
																		}
																		return type
																	})
																)
															} else {
																setExerciseTypes(
																	exerciseTypes.map(type => {
																		if (type.id === idx) {
																			type.status = true
																		}
																		return type
																	})
																)
															}
														}
													}}>
													{exerciseTypes[type.id].status ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="w-4 h-4 text-green-500"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M5 13l4 4L19 7"
															/>
														</svg>
													) : null}
													{type.name}
												</span>
											</React.Fragment>
										)
									})}
								</div>
							</div>
						) : null}

						<input
							className="w-full h-12 mt-4 text-black bg-yellow-200 cursor-pointer disabled:opacity-50"
							type="submit"
						/>
					</form>
				</div>
			</Layout>
		</>
	)
}

export default Signup
