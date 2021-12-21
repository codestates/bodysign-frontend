import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import Layout from '../../../../components/Layout'
import Chart from 'chart.js/auto'
import { useReactiveVar, useQuery } from '@apollo/client'
import { UserDocument } from '../../../../graphql/graphql'
import { managedUserInfoVar } from '../../../../graphql/vars'
import Loading from '../../../../components/Loading'
import { useRouter } from 'next/dist/client/router'

const Inbody: NextPage = () => {
	const router = useRouter()
	const managedUserInfo = useReactiveVar(managedUserInfoVar)
	const { loading, data } = useQuery(UserDocument, {
		variables: { id: managedUserInfo.userId }
	})
	const canvasRef = useRef(null)

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
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[25px]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="self-center w-6 h-6 cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							onClick={() => router.push('/trainer/manage-member')}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<div className="font-bold">{data.user.userName} 회원님</div>
					</span>
					<span className="flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mr-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
							/>
						</svg>
					</span>
				</div>

				<div className="flex justify-between pr-3 mt-4 text-[18px]">
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/info`}
						passHref
					>
						<span className="ml-0 cursor-pointer">회원정보</span>
					</Link>
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/sessions`}
						passHref
					>
						<span className="ml-2 cursor-pointer">수업기록</span>
					</Link>
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/inbody`}
						passHref
					>
						<span className="pb-1 ml-2 border-b border-black cursor-pointer">
							인바디
						</span>
					</Link>
				</div>

				<div className="relative my-4">
					<canvas ref={canvasRef} height="400"></canvas>
				</div>

				<div className="border-b border-gray-200 text-[12px]">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="p-3 text-left text-gray-500">날짜</th>
								<th className="p-3 text-left text-gray-500">체중</th>
								<th className="p-3 text-left text-gray-500">골격근량</th>
								<th className="p-3 text-left text-gray-500">체지방</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.user.inbodies.map((inbodyData: any) => {
								return (
									<React.Fragment key={inbodyData.id}>
										<tr>
											<td className="p-3 font-thin text-gray-500">
												{inbodyData.measuredDate.split('T')[0]}
											</td>
											<td className="p-3 font-thin text-gray-500">
												{inbodyData.bodyWeight}kg
											</td>
											<td className="p-3 font-thin text-gray-500">
												{inbodyData.muscleWeight}kg
											</td>
											<td className="p-3 font-thin text-gray-500">
												{inbodyData.bodyFat}kg
											</td>
										</tr>
									</React.Fragment>
								)
							})}
						</tbody>
					</table>
				</div>
			</Layout>
		</>
	)
}

export default Inbody
