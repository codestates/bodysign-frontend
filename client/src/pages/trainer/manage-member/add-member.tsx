import { NextPage } from 'next'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import { useMutation, useQuery } from '@apollo/client'
import Loading from '../../../components/Loading'
import {
	CreateNonRegisteredUserDocument,
	TrainerDocument
} from '../../../graphql/graphql'
import { useRouter } from 'next/dist/client/router'

interface FormInput {
	name: string
	phone: string
	gender: string
	userCategoryId: number
	graduate: boolean
}

const labelProperties =
	'after:absolute after:h-full after:bg-yellow-100 after:w-full after:top-0 after:z-[-1] after:transition-[left] after:duration-500 peer-checked:cursor-default peer-checked:text-black peer-checked:after:left-0'

const AddMember: NextPage = () => {
	const router = useRouter()
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})
	const [createNonRegisteredUser] = useMutation(
		CreateNonRegisteredUserDocument
	)
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		const input = {
			userName: data.name,
			phoneNumber: data.phone,
			gender: data.gender,
			userCategoryId: data.userCategoryId,
			graduate: data.graduate
		}
		try {
			await createNonRegisteredUser({
				variables: {
					createNonRegisteredUserInput: {
						trainerId: 21,
						userName: input.userName,
						phoneNumber: input.phoneNumber,
						gender: input.gender
					}
				}
			})
			router.push('/trainer/manage-member')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5 font-IBM text-[12px]">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px] font-bold">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-7 h-7"
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
							<div>회원정보등록</div>
						</span>
						<span className="flex"></span>
					</div>

					<form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
						<div>
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
							<label>카테고리</label>
							{loading ? (
								<Loading />
							) : (
								<select
									className="w-full h-12 p-3 mt-1 bg-white border"
									{...register('userCategoryId')}>
									{data.trainer.userCategories.map((category: any) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
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
									id="management"
									value="false"
									defaultChecked
									{...register('graduate', {
										required: true
									})}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-r-0 cursor-pointer after:left-full`}
									htmlFor="management">
									관리중
								</label>
							</span>
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="graduate"
									value="true"
									{...register('graduate', {
										required: true
									})}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-l-0 cursor-pointer after:-left-full`}
									htmlFor="graduate">
									졸업
								</label>
							</span>
						</div>

						<input
							className={`w-full h-12 mt-4 text-black bg-yellow-200 cursor-pointer disabled:opacity-50`}
							type="submit"
						/>
					</form>
				</div>
			</Layout>
		</>
	)
}

export default AddMember
