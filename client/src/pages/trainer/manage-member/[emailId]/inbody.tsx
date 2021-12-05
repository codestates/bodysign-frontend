import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import Layout from '../../../../components/Layout'
import Chart from 'chart.js/auto'

const Inbody: NextPage = () => {
	const canvasRef = useRef(null)
	const [inbodyDataList, setInbodyDataList] = useState([
		{
			date: '2021.01.01',
			weight: 75,
			muscle_mass: 40,
			body_fat: 30
		}
		,
		{
			date: '2021.02.01',
			weight: 70,
			muscle_mass: 50,
			body_fat: 15
		},
		{
			date: '2021.03.01',
			weight: 60,
			muscle_mass: 45,
			body_fat: 20
		}
	])

	const getInbodyDate = () => {
		// 인바디 가져오기
	}

	const addInbodyData = () => {
		// 인바디 추가하기
		setIsInbodyModalOpen(!isInbodyModalOpen)
		// 추가하고 나면 서버에서 다시 인바디 데이터 받아오기
	}

	useEffect(() => {
		if (canvasRef.current) {
			const chart = new Chart(canvasRef.current, {
				type: 'line',
				data: {
					labels: inbodyDataList.map((inbodyData) => inbodyData.date),
					datasets: [
						{
							label: '체중',
							data: inbodyDataList.map((inbodyData) => inbodyData.weight),
							fill: false,
							borderColor: 'rgba(255, 206, 86, 1)',
							borderWidth: 1,
						},
						{
							label: '근육량',
							data: inbodyDataList.map((inbodyData) => inbodyData.muscle_mass),
							fill: false,
							borderColor: 'rgba(54, 162, 235, 1)',
							borderWidth: 1,
						},
						{
							label: '체지방',
							data: inbodyDataList.map((inbodyData) => inbodyData.body_fat),
							fill: false,
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1,
						}
					]
				},
				options: {}
			})
			return () => {
				chart.destroy()
			 }
		}
	}, [])

	return (
		<>
			<Layout variant="Web">
				<div className="font-IBM flex flex-col justify-center mx-4 my-5">
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
							<div className="font-bold">
								김코딩 회원님
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

					<div className="flex justify-between pr-3 mt-4 text-[12px]">
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
					<div className="relative my-4">
						<canvas ref={canvasRef}></canvas>
					</div>

					<div className="flex-col">
						<table className="text-xs mt-6 mx-auto text-center border w-4/5">
							<thead>
								<tr>
									<th>날짜</th>
									<th>체중</th>
									<th>골격근량</th>
									<th>체지방</th>
								</tr>
							</thead>
							<tbody>
								{inbodyDataList.map(inbodyData => {
									return (
										<tr>
											<td>{inbodyData.date}</td>
											<td>{inbodyData.weight}</td>
											<td>{inbodyData.muscle_mass}</td>
											<td>{inbodyData.body_fat}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
						<svg onClick={addInbodyData} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto my-4" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
						</svg>
					</div>


				</div>
			</Layout>
		</>
	)
}

export default Inbody
