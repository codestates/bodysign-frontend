import { useQuery, useReactiveVar } from '@apollo/client'
import Chart from 'chart.js/auto'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loading from '../../../components/Loading'
import { useCreateInbodyMutation } from '../../../generated/graphql'
import { UserDocument } from '../../../graphql/graphql'
import { modalVar, userDataVar } from '../../../graphql/vars'

interface FormInput {
	date: string
	bodyWeight: number
	muscleWeight: number
	bodyFat: number
}

const Inbody: NextPage = () => {
	const modal = useReactiveVar(modalVar)
	const userData = useReactiveVar(userDataVar)
	const { loading, data } = useQuery(UserDocument, {
		variables: { id: userData?.id }
	})
	const [createInbody] = useCreateInbodyMutation()
	const canvasRef = useRef(null)
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		// 인바디 추가 API
		try {
			await createInbody({
				variables: {
					createInbodyInput: {
						userId: userData?.id as number,
						bodyWeight: +data.bodyWeight,
						muscleWeight: +data.muscleWeight,
						bodyFat: +data.bodyFat,
						measuredDate: data.date
					}
				},
				refetchQueries: [
					{
						query: UserDocument,
						variables: { id: userData?.id }
					}
				]
			})
			modalVar(false)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (canvasRef.current) {
			const chart = new Chart(canvasRef.current, {
				type: 'line',
				data: {
					labels: data.user.inbodies.map(
						(inbodyData: any) => inbodyData.measuredDate.split('T')[0]
					),
					datasets: [
						{
							label: '체중',
							data: data.user.inbodies.map(
								(inbodyData: any) => inbodyData.bodyWeight
							),
							fill: false,
							borderColor: 'rgba(255, 206, 86, 1)',
							borderWidth: 1
						},
						{
							label: '근육량',
							data: data.user.inbodies.map(
								(inbodyData: any) => inbodyData.muscleWeight
							),
							fill: false,
							borderColor: 'rgba(54, 162, 235, 1)',
							borderWidth: 1
						},
						{
							label: '체지방',
							data: data.user.inbodies.map(
								(inbodyData: any) => inbodyData.bodyFat
							),
							fill: false,
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1
						}
					]
				},
				options: {}
			})
			return () => {
				chart.destroy()
			}
		}
	})

	if (loading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem] items-center">
					<Link href="/user/menu" passHref>
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
					<div className="ml-[0.8rem] font-bold">인바디</div>
				</span>
			</div>

			<div className="mt-[2.4rem]">
				<canvas ref={canvasRef} height="400"></canvas>
			</div>

			<div className="flex flex-col mt-[2.4rem] text-[1.4rem] font-thin font-IBM">
				<div className="border-b border-gray-200">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="p-[1.2rem] text-left text-gray-500">
									날짜
								</th>
								<th className="p-[1.2rem] text-left text-gray-500">
									체중
								</th>
								<th className="p-[1.2rem] text-left text-gray-500">
									골격근량
								</th>
								<th className="p-[1.2rem] text-left text-gray-500">
									체지방
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.user.inbodies.map((inbodyData: any) => {
								return (
									<React.Fragment key={inbodyData.id}>
										<tr>
											<td className="p-[1.2rem] font-thin text-gray-500">
												{inbodyData.measuredDate.split('T')[0]}
											</td>
											<td className="p-[1.2rem] font-thin text-gray-500">
												{inbodyData.bodyWeight}kg
											</td>
											<td className="p-[1.2rem] font-thin text-gray-500">
												{inbodyData.muscleWeight}kg
											</td>
											<td className="p-[1.2rem] font-thin text-gray-500">
												{inbodyData.bodyFat}kg
											</td>
										</tr>
									</React.Fragment>
								)
							})}
						</tbody>
					</table>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-[3.2rem] h-[3.2rem] mt-[2.4rem] text-black self-center cursor-pointer "
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					onClick={() => modalVar(true)}>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>

			{modal ? (
				<div className="fixed bottom-[6.3rem] right-0 w-full font-IBM">
					<div
						className="fixed inset-0 z-[-1] bg-black opacity-20"
						onClick={() => modalVar(false)}></div>
					<div className="bg-white flex z-[50] h-full flex-col p-[2rem] pb-[4rem] rounded-t-3xl text-[2rem]">
						<div className="text-[3.2rem] font-bold">인바디 등록</div>
						<form
							className="flex flex-col mt-[2.4rem]"
							onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col justify-between">
								<label className="text-[1.4rem]">날짜</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem] bg-white"
									type="date"
									placeholder="날짜"
									{...register('date', {
										required: true
									})}
								/>
							</div>
							{errors.date && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									세션 날짜를 선택해주세요.
								</div>
							)}
							<div className="flex flex-col justify-between mt-[1.6rem]">
								<label className="text-[1.4rem]">체중</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="체중"
									{...register('bodyWeight', {
										required: true,
										minLength: 1
									})}
								/>
							</div>
							{errors.bodyWeight && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									체중를 입력해주세요.
								</div>
							)}
							<div className="flex flex-col justify-between mt-[1.6rem]">
								<label className="text-[1.4rem]">근육량</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="근육량"
									{...register('muscleWeight', {
										required: true
									})}
								/>
							</div>
							{errors.muscleWeight && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									세션 근육량를 입력해주세요.
								</div>
							)}
							<div className="flex flex-col justify-between mt-[1.6rem]">
								<label className="text-[1.4rem]">체지방</label>
								<input
									className="w-full py-[1.2rem] text-center border rounded-3xl shadow-md h-[5.5rem] mt-[0.4rem]"
									type="text"
									placeholder="체지방"
									{...register('bodyFat', {
										required: false
									})}
								/>
							</div>
							{errors.bodyFat && (
								<div className="text-[16px] text-red-500 mt-[0.8rem] text-center">
									체지방을 입력해주세요.
								</div>
							)}
							<div className="flex justify-between mt-[2.4rem]">
								<button
									className="w-[45%] p-[1.2rem] border shadow-md rounded-3xl"
									onClick={() => modalVar(false)}>
									취소
								</button>
								<button
									className="w-[45%] p-[1.2rem] bg-[#FED06E] border shadow-md rounded-3xl "
									type="submit">
									추가
								</button>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Inbody
