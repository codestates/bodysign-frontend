import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../../components/Layout'

const Inbody: NextPage = () => {
	const inbody_dummy = [
		{
			id: 1,
			name: 'Alice',
			inbody_date: '2021.11.01',
			weight: 60,
			skeletal_muscle: 15,
			body_fat: 30
		},
		{
			id: 2,
			name: '오렌지',
			inbody_date: '2021.12.01',
			weight: 50,
			skeletal_muscle: 20,
			body_fat: 15
		},
		{
			id: 3,
			name: 'Mollie',
			inbody_date: '2021.11.24',
			weight: 100,
			skeletal_muscle: 35,
			body_fat: 35
		},
		{
			id: 4,
			name: 'Munny',
			inbody_date: '2021.10.28',
			weight: 80,
			skeletal_muscle: 45,
			body_fat: 25
		}
	]

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
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
							<div className="font-semibold">
								{inbody_dummy[0].name} 회원님
							</div>
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

					<div className="flex justify-between pr-3 mt-4">
						<Link href="/trainer/manage-member/emailId/info">
							<span className="ml-0">회원정보</span>
						</Link>
						<Link href="/trainer/manage-member/emailId/sessions">
							<span className="ml-2">수업기록</span>
						</Link>
						<Link href="/trainer/manage-member/emailId/inbody">
							<span className="pb-1 ml-2 border-b border-black">
								인바디
							</span>
						</Link>
					</div>

					<div className="flex flex-col mt-4">
						<div className="p-3 text-center">{'인바디 그래프'}</div>
						<div className="mt-4 border-b border-gray-200">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="p-3 text-xs text-left text-gray-500">
											날짜
										</th>
										<th className="p-3 text-xs text-left text-gray-500">
											단가
										</th>
										<th className="p-3 text-xs text-left text-gray-500">
											횟수
										</th>
										<th className="p-3 text-xs text-left text-gray-500">
											총액
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{inbody_dummy.map(inbody => {
										return (
											<React.Fragment key={inbody.id}>
												<tr>
													<td className="p-3 text-sm text-gray-500">
														{inbody.inbody_date}
													</td>
													<td className="p-3 text-sm text-gray-500">
														{inbody.weight}kg
													</td>
													<td className="p-3 text-sm text-gray-500">
														{inbody.skeletal_muscle}kg
													</td>
													<td className="p-3 text-sm text-gray-500">
														{inbody.body_fat}kg
													</td>
												</tr>
											</React.Fragment>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Inbody
