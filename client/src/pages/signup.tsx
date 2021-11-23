import { NextPage } from 'next'
import React from 'react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../components/Layout'

interface IFormInput {
	email: string
	password: string
	name: string
	birth: string
	phone: string
}

const Signup: NextPage = () => {
	const [gender, setGender] = useState('male')
	const [memberOrTrainer, setMemberOrTrainer] = useState('member')
	const [form, setForm] = useState({
		gender: 'male',
		memberOrTrainer: 'member'
	})

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IFormInput>()
	const onSubmit: SubmitHandler<IFormInput> = data => {
		let test = { ...data, ...form }
		console.log(test)
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col w-full mx-4 my-5 text-[12px]">
					<div className="text-[20px] mb-3 text-center">회원가입</div>

					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-3">
							<label>이메일</label>
							<input
								className="w-full h-12 pl-2 mt-1 border"
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

						<div className="mb-3">
							<label>비밀번호</label>
							<input
								className="w-full h-12 pl-2 mt-1 border"
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

						<div className="mb-3">
							<label>이름</label>
							<input
								className="w-full h-12 pl-2 mt-1 border"
								type="text"
								{...register('name', {
									required: true
								})}
							/>
						</div>

						<div className="mb-3">
							<label>생년월일</label>
							<input
								className="w-full h-12 pl-2 mt-1 border"
								type="date"
								{...register('birth', {
									required: true
								})}
							/>
						</div>

						<div className="mb-3">
							<label>휴대폰 번호</label>
							<input
								className="w-full h-12 pl-2 mt-1 border"
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

						<div className="mb-3">
							<label>성별</label>
							<div className="flex items-center w-full h-12 mt-1 border">
								<div
									className={`w-1/2 h-full flex items-center justify-center ${
										gender === 'male' ? 'bg-gray-100' : ''
									}`}
									onClick={() => {
										setGender('male')
										setForm({ ...form, gender: 'male' })
									}}>
									남자
								</div>
								<div
									className={`w-1/2 h-full flex items-center justify-center ${
										gender === 'female' ? 'bg-gray-100' : ''
									}`}
									onClick={() => {
										setGender('female')
										setForm({ ...form, gender: 'female' })
									}}>
									여자
								</div>
							</div>
						</div>

						{/* https://brunch.co.kr/@monodream/80 */}
						<div className="mb-3">
							<label>성별</label>
							<div className="flex items-center w-full h-12 mt-1 border">
								<div
									className={`w-1/2 h-full flex items-center justify-center ${
										memberOrTrainer === 'member' ? 'bg-gray-100' : ''
									}`}
									onClick={() => {
										setMemberOrTrainer('member')
										setForm({ ...form, memberOrTrainer: 'member' })
									}}>
									회원
								</div>
								<div
									className={`w-1/2 h-full flex items-center justify-center ${
										memberOrTrainer === 'trainer' ? 'bg-gray-100' : ''
									}`}
									onClick={() => {
										setMemberOrTrainer('trainer')
										setForm({ ...form, memberOrTrainer: 'trainer' })
									}}>
									트레이너
								</div>
							</div>
						</div>

						<div>
							<input
								className="w-full h-12 text-black bg-yellow-200 disabled:opacity-50"
								type="submit"
							/>
						</div>
					</form>
				</div>
			</Layout>
		</>
	)
}

export default Signup
