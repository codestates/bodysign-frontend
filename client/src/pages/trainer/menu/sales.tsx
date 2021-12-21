import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/Layout'
import { modalVar } from '../../../graphql/vars'
import { useQuery, useReactiveVar } from '@apollo/client'
import Chart from 'chart.js/auto'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TrainerDocument } from '../../../graphql/graphql'
import Loading from '../../../components/Loading'

const Sales: NextPage = () => {
	const modal = useReactiveVar(modalVar)
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [rangeFilterResult, setRangeFilterResult] = useState(0)
	const [date, setDate] = useState('')
	const canvasRef = useRef(null)
	const { loading, data } = useQuery(TrainerDocument, {
		variables: { id: 21 }
	})

	let sessionHistories: any[] = []
	if (!loading && data) {
		let users = [...data.trainer.users]
		users.forEach(user => {
			const userSessionHistories = user.sessionHistories
			sessionHistories.push(...userSessionHistories)
		})
		sessionHistories.sort((a, b): any => {
			const dateA = new Date(a.date).getTime()
			const dateB = new Date(b.date).getTime()
			if (dateA > dateB) return 1
			if (dateA < dateB) return -1
			return 0
		})
	}

	const sessionHistoriesObject: Record<string, number[]> = {}
	sessionHistories.forEach(session => {
		const date = session.date.split('T')[0].split('-')
		const year = date[0]
		const month = date[1]
		if (sessionHistoriesObject[`${year}.${month}`] === undefined) {
			sessionHistoriesObject[`${year}.${month}`] = []
		}
		sessionHistoriesObject[`${year}.${month}`].push(
			session.costPerSession * session.totalCount
		)
	})

	const sortedSessionHistories = Object.entries(
		sessionHistoriesObject
	).sort((a, b): any => {
		const dateA = new Date(a[0]).getTime()
		const dateB = new Date(b[0]).getTime()
		if (dateA > dateB) return 1
		if (dateA < dateB) return -1
		return 0
	})

	useEffect(() => {
		if (canvasRef.current) {
			const chart = new Chart(canvasRef.current, {
				type: 'bar',
				data: {
					labels: [
						'1',
						'2',
						'3',
						'4',
						'5',
						'6',
						'7',
						'8',
						'9',
						'10',
						'11',
						'12'
					],
					datasets: [
						{
							label: '월별 수업료',
							data: sortedSessionHistories.map(el =>
								el[1].reduce((acc, cur) => acc + cur)
							),
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)'
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)'
							],
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const getYearMonthDay = (KST: Date) => {
			const year = new Date(KST).getFullYear()
			const month = new Date(KST).getMonth() + 1
			const day = new Date(KST).getDate()
			return `${year} ${month} ${day}`
		}
		const getTimeStartDate = new Date(getYearMonthDay(startDate)).getTime()
		const getTimeEndDate = new Date(getYearMonthDay(endDate)).getTime()

		const result = sessionHistories
			.filter(sessionHistory => {
				const totalSessionGetTime = new Date(
					getYearMonthDay(sessionHistory.date)
				).getTime()
				if (
					getTimeStartDate <= totalSessionGetTime &&
					totalSessionGetTime <= getTimeEndDate
				) {
					return sessionHistory
				} else return
			})
			.reduce((acc, cur) => acc + cur.costPerSession * cur.totalCount, 0)
		setRangeFilterResult(result)
	}

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[3.2rem]">
						<Link
							href="/trainer/menu"
							passHref
						>
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
						<div className="ml-[0.8rem] font-bold">매출 조회</div>
					</span>
				</div>

				<div className="mt-[2.4rem]">
					<canvas ref={canvasRef} height="400"></canvas>
				</div>

				<div className="mt-[2.4rem] text-[1.8rem]">
					<form className="flex flex-col" onSubmit={e => handleSubmit(e)}>
						<div className="flex items-center justify-around">
							<DatePicker
								className="w-[12rem] p-[0.8rem] border text-center mr-[0.8rem] rounded-2xl"
								selected={startDate}
								onChange={date => setStartDate(date as Date)}
								selectsStart
								startDate={startDate}
								endDate={endDate}
							/>
							~
							<DatePicker
								className="w-[12rem] p-[0.8rem] border text-center ml-[0.8rem] rounded-2xl"
								selected={endDate}
								onChange={date => setEndDate(date as Date)}
								selectsEnd
								startDate={startDate}
								endDate={endDate}
								minDate={startDate}
							/>
							<button
								className="p-[0.8rem] bg-[#FDAD00] border rounded-2xl"
								type="submit">
								조회
							</button>
						</div>
						{rangeFilterResult === 0 ? null : (
							<div className="self-end text-[2rem] mt-[1.2rem] text-[#9F9F9F]">
								총액: {rangeFilterResult}원
							</div>
						)}
					</form>
				</div>
			</Layout>

			<div className="flex flex-col mt-[2.4rem] text-[1.4rem] font-thin font-IBM">
				<div className="border-b border-gray-200">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="p-[1.2rem] text-left text-gray-500">
									기간
								</th>
								<th className="p-[1.2rem] text-left text-gray-500">
									매출총액
								</th>
								<th className="p-[1.2rem] text-left text-gray-500">
									평균단가
								</th>
								<th className="p-[1.2rem] text-left text-gray-500"> </th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{sortedSessionHistories.map((sessionHistory, idx) => {
								return (
									<React.Fragment key={idx}>
										<tr>
											<td className="p-[1.2rem] text-gray-500">
												{`${sessionHistory[0].split('.')[0]}.${
													sessionHistory[0].split('.')[1]
												}`}
											</td>
											<td className="p-[1.2rem] text-gray-500">
												{sessionHistory[1].reduce((acc, cur) => acc + cur)}
												원
											</td>
											<td className="p-[1.2rem] text-gray-500">
												{Math.floor(
													sessionHistory[1].reduce(
														(acc, cur) => acc + cur
													) / sessionHistory[1].length
												)}
											</td>
											<td className="flex justify-end p-1 text-gray-500">
												<span
													className="flex items-center cursor-pointer"
													onClick={() => {
														setDate(sessionHistory[0])
														modalVar(true)
													}}>
													<span>상세 정보</span>
													<svg
														className="m-[0.8rem] text-gray-400"
														viewBox="0 0 15 15"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														width="15"
														height="15">
														<path
															d="M6.5 10.5l3-3-3-3"
															stroke="currentColor"
															strokeLinecap="square"></path>
													</svg>
												</span>
											</td>
										</tr>
									</React.Fragment>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>

			{modal ? (
				<div className="font-IBM fixed max-w-[450px] w-full bottom-0">
					<div
						className="fixed inset-0 z-[-1] bg-black opacity-20"
						onClick={() => modalVar(false)}></div>
					<div className="bg-white flex z-[50] h-full flex-col py-10">
						<div className="p-3 text-center text-[20px] font-bold">
							{date.split('.')[1].replace(/^0/, '')}월 매출
						</div>
						<div className="mt-4 border-b border-gray-200">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="p-3 text-xs text-left text-gray-500">
											날짜
										</th>
										<th className="p-3 text-xs text-left text-gray-500">
											회원명
										</th>
										<th className="p-3 text-xs text-left text-gray-500">
											총액
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{sessionHistories
										.filter(sessionHistory => {
											const $date = sessionHistory.date.split('-')
											if (`${$date[0]}.${$date[1]}` === date) {
												return sessionHistory
											}
										})
										.map(sessionHistory => {
											return (
												<React.Fragment key={sessionHistory.id}>
													<tr>
														<td className="p-3 text-[12px] text-gray-500">
															{sessionHistory.date.split('T')[0]}
														</td>
														<td className="p-3 text-[12px] text-gray-500">
															{sessionHistory.user.userName}
														</td>
														<td className="p-3 text-[12px] text-gray-500">
															{sessionHistory.costPerSession *
																sessionHistory.totalCount}
															원
														</td>
													</tr>
												</React.Fragment>
											)
										})}
								</tbody>
							</table>
						</div>

						<div className="max-w-[450px] self-end mt-4 mr-4">
							<button
								className="px-4 py-3 bg-yellow-100 border"
								onClick={() => modalVar(false)}>
								확인
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Sales
