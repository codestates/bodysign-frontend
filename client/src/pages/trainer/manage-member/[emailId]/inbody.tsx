import { useReactiveVar } from '@apollo/client'
import Chart from 'chart.js/auto'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loading from '../../../../components/Loading'
import {
	useCreateInbodyMutation,
	UserDocument,
	useUserLazyQuery
} from '../../../../generated/graphql'
import { modalVar } from '../../../../graphql/vars'
import useSessionStorage from '../../../../hooks/useSessionStorage'

interface FormInput {
	date: string
	bodyWeight: number
	muscleWeight: number
	bodyFat: number
}

const Inbody: NextPage = () => {
	const modal = useReactiveVar(modalVar)
	const [mangedMemberInfo, __] = useSessionStorage('mangedMemberInfo')
	const [___, setChatTargetUserId] = useSessionStorage('chatTargetUserId')
	const canvasRef = useRef(null)
	const [emailId, setEmailId] = useState('')
	const [userLazyQuery, { loading, data }] = useUserLazyQuery()
	const [createInbody] = useCreateInbodyMutation()
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
						userId: mangedMemberInfo.userId as number,
						bodyWeight: +data.bodyWeight,
						muscleWeight: +data.muscleWeight,
						bodyFat: +data.bodyFat,
						measuredDate: data.date
					}
				},
				refetchQueries: [
					{
						query: UserDocument,
						variables: { id: mangedMemberInfo.userId }
					}
				]
			})
			modalVar(false)
		} catch (error) {
			alert('다시 시도해 주세요.')
		}
	}

	useEffect(() => {
		userLazyQuery({
			variables: { id: mangedMemberInfo.userId }
		})
	}, [mangedMemberInfo])

	useEffect(() => {
		setEmailId(`${mangedMemberInfo.emailId}/`)
	}, [mangedMemberInfo])

	useEffect(() => {
		if (canvasRef.current) {
			const chart = new Chart(canvasRef.current, {
				type: 'line',
				data: {
					labels:
						data &&
						data.user.inbodies.map(
							(inbodyData: any) => inbodyData.measuredDate.split('T')[0]
						),
					datasets: [
						{
							label: '체중',
							data:
								data &&
								data.user.inbodies.map(
									(inbodyData: any) => inbodyData.bodyWeight
								),
							fill: false,
							borderColor: 'rgba(255, 206, 86, 1)',
							borderWidth: 1
						},
						{
							label: '근육량',
							data:
								data &&
								data.user.inbodies.map(
									(inbodyData: any) => inbodyData.muscleWeight
								),
							fill: false,
							borderColor: 'rgba(54, 162, 235, 1)',
							borderWidth: 1
						},
						{
							label: '체지방',
							data:
								data &&
								data.user.inbodies.map(
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
					<Link href="/trainer/manage-member" passHref>
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
						{data && data.user.userName} 회원
					</div>
				</span>
				<Link href={`/trainer/manage-member/chat`} passHref>
					<svg
						className="w-[2.8rem] h-[2.8rem]"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 25 25"
						stroke="currentColor"
						onClick={() => {
							setChatTargetUserId(mangedMemberInfo.userId)
						}}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
						/>
					</svg>
				</Link>
			</div>

			<div className="flex justify-between mt-[2.4rem] text-[2.2rem]">
				<Link href={`/trainer/manage-member/${emailId}info`} passHref>
					<span className="pb-[0.4rem] cursor-pointer">회원정보</span>
				</Link>
				<Link href={`/trainer/manage-member/${emailId}inbody`} passHref>
					<span className="ml-[0.8rem] border-b-[3px] border-[#FED06E] cursor-pointer">
						인바디
					</span>
				</Link>
				<Link href={`/trainer/manage-member/${emailId}sessions`} passHref>
					<span className="ml-[0.8rem] cursor-pointer">수업기록</span>
				</Link>
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
							{data &&
								data.user.inbodies.map((inbodyData: any) => {
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
				<div className="fixed bottom-0 right-0 w-full font-IBM">
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
