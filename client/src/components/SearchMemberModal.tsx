import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const SearchMemberModal: NextPage = () => {

	return (
		<>
			<Layout variant="Web">
				<div className="font-IBM fixed max-w-[450px] w-full bottom-0">
					<div
						className="fixed inset-0 z-[-1] bg-black opacity-20"
						onClick={() => modalVar(false)}></div>
					<div className="bg-white flex z-[50] h-full flex-col py-10">
						<div className="py-3 text-center text-[20px]">세션 추가</div>
						<form
							className="flex flex-col mt-4"
							onSubmit={handleSubmit(onSubmit)}>
							<input
								className="w-full h-12 px-10 border"
								type="date"
								placeholder="날짜"
								{...register('session_date', {
									required: true
								})}
							/>
							{errors.session_date && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									세션 날짜를 선택해주세요.
								</div>
							)}
							<input
								className="w-full h-12 px-10 mt-1 border"
								type="text"
								placeholder="회당 수업 단가(원)"
								{...register('cost', {
									required: true
								})}
							/>
							{errors.cost && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									세션 회당 수업 단가(원)를 입력해주세요.
								</div>
							)}
							<input
								className="w-full h-12 px-10 mt-1 border"
								type="text"
								placeholder="세션 횟수"
								{...register('times', {
									required: true,
									minLength: 1
								})}
							/>
							{errors.times && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									세션 횟수를 입력해주세요.
								</div>
							)}
							<input
								className="w-full h-12 px-10 mt-1 border"
								type="text"
								placeholder="정산 금액(원)"
								{...register('permission', {
									required: true
								})}
							/>
							{errors.permission && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									정산 금액(원)을 입력해주세요.
								</div>
							)}

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
			</Layout>
		</>
	)
}

export default SearchMemberModal
