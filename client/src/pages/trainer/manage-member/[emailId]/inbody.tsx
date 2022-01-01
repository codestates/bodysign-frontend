import { useQuery, useReactiveVar } from '@apollo/client'
import Chart from 'chart.js/auto'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Layout from '../../../../components/Layout'
import Loading from '../../../../components/Loading'
import { UserDocument } from '../../../../graphql/graphql'
import { managedUserInfoVar } from '../../../../graphql/vars'

const Inbody: NextPage = () => {
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
							{data.user.userName} 회원
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
								// chatTargetUserIdVar(+member.id)
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
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/info`}
						passHref>
						<span className="pb-[0.4rem] cursor-pointer">회원정보</span>
					</Link>
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/inbody`}
						passHref>
						<span className="ml-[0.8rem] border-b-[3px] border-[#FED06E] cursor-pointer">
							인바디
						</span>
					</Link>
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/sessions`}
						passHref>
						<span className="ml-[0.8rem] cursor-pointer">수업기록</span>
					</Link>
				</div>

				<div className="mt-[2.4rem]">
					<canvas ref={canvasRef} height="400"></canvas>
				</div>
			</Layout>

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
			</div>
		</>
	)
}

export default Inbody
