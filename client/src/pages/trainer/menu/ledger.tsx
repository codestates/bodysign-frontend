import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/Layout'
import { modalVar } from '../../../graphql/vars'
import { useReactiveVar } from '@apollo/client'
import Chart from 'chart.js/auto'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dummytotalsession from '../../../../dummyTotalSession.json'

const Ledger: NextPage = () => {
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [rangeFilterResult, setRangeFilterResult] = useState(0)
	const [month, setMonth] = useState('')
	const modal = useReactiveVar(modalVar)
	const canvasRef = useRef(null)

	const totalSessionObject: Record<string, number[]> = {}
	dummytotalsession.forEach(session => {
		const year = session.session_date.split('.')[0]
		const month = session.session_date.split('.')[1]
		if (totalSessionObject[`${year}.${month}`] === undefined) {
			totalSessionObject[`${year}.${month}`] = []
		}
		totalSessionObject[`${year}.${month}`].push(
			session.cost * session.times
		)
	})

	const sortedTotalSession = Object.entries(totalSessionObject).sort(
		(a, b): any => {
			const dateA = new Date(a[0]).getTime()
			const dateB = new Date(b[0]).getTime()
			if (dateA > dateB) return 1
			if (dateA < dateB) return -1
			return 0
		}
	)

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
							data: sortedTotalSession.map(el =>
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
	}, [])

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

		const result = dummytotalsession
			.filter(totalSession => {
				const totalSessionGetTime = new Date(
					totalSession.session_date
				).getTime()
				if (
					getTimeStartDate <= totalSessionGetTime &&
					totalSessionGetTime <= getTimeEndDate
				) {
					return totalSession
				} else return
			})
			.reduce((acc, cur) => acc + cur.cost * cur.times, 0)
		setRangeFilterResult(result)
	}

	return (
		<>
			<Layout variant="Web">
				<div className="font-IBM flex flex-col justify-center mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="self-center cursor-pointer w-7 h-7"
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
							<div className="font-bold text-[20px]">수업료 정산</div>
						</span>
						<span className="flex"></span>
					</div>

					<div className="mt-4 text-[12px]">
						<div className="py-3 font-thin text-center">기간별 수업료 정산</div>
						<div className="flex flex-col p-3 border">
							<form
								className="flex flex-col"
								onSubmit={e => handleSubmit(e)}>
								<div className="flex items-center">
									<DatePicker
										className="w-[125px] p-1 border text-center mr-3"
										selected={startDate}
										onChange={date => setStartDate(date as Date)}
										selectsStart
										startDate={startDate}
										endDate={endDate}
									/>
									~
									<DatePicker
										className="w-[125px] p-1 border text-center ml-3"
										selected={endDate}
										onChange={date => setEndDate(date as Date)}
										selectsEnd
										startDate={startDate}
										endDate={endDate}
										minDate={startDate}
									/>
									<button

										className="h-7 px-1 ml-auto bg-yellow-100 border w-[85px]"
										type="submit">
										조회
									</button>
								</div>
								{rangeFilterResult === 0 ? null : (
									<div className="self-start mt-1 border w-[125px] text-center p-3">
										{rangeFilterResult}원
									</div>
								)}
							</form>
						</div>
					</div>

					<div className="relative mt-4 text-[12px]">
						<canvas ref={canvasRef} height="300"></canvas>
					</div>

					<div className="flex flex-col mt-4 text-[12px] font-thin">
						<div className="border-b border-gray-200">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="p-3 text-[12px] text-left text-gray-500">
											기간
										</th>
										<th className="p-3 text-[12px] text-left text-gray-500">
											수업료
										</th>
										<th className="p-3 text-[12px] text-left text-gray-500"></th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{sortedTotalSession.map((totalSession, idx) => {
										return (
											<React.Fragment key={idx}>
												<tr>
													<td className="p-3 text-[12px] text-gray-500">
														{totalSession[0].split('.')[0]}년{' '}
														{totalSession[0].split('.')[1]}월
													</td>
													<td className="p-3 text-[12px] text-gray-500 font-medium">
														{totalSession[1].reduce(
															(acc, cur) => acc + cur
														)}
														원
													</td>
													<td className="flex justify-end p-1 text-[12px] text-gray-500">
														<span
															className="flex items-center cursor-pointer"
															onClick={() => {
																setMonth(totalSession[0].split('.')[1])
																modalVar(true)
															}}>
															<span>상세 정보</span>
															<svg
																className="m-2 text-gray-400"
																viewBox="0 0 15 15"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
																width="15"
																height="15">
																<path
																	d="M6.5 10.5l3-3-3-3"
																	stroke="currentColor"
																	stroke-linecap="square"></path>
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
				</div>

				{modal ? (
					<div className="font-IBM fixed max-w-[450px] w-full bottom-0">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20"
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] h-full flex-col py-10">
							<div className="p-3 text-center text-[20px] font-bold">
								{month.replace(/^0/, '')}월 정산
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
												정산 금액
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{dummytotalsession
											.filter(
												el => el.session_date.split('.')[1] === month
											)
											.sort((a, b): any => {
												const dateA = new Date(a.session_date).getTime()
												const dateB = new Date(b.session_date).getTime()
												if (dateA > dateB) return 1
												if (dateA < dateB) return -1
												return 0
											})
											.map((totalSession, idx) => {
												return (
													<React.Fragment key={idx}>
														<tr>
															<td className="p-3 text-[12px] text-gray-500 font-thin">
																{totalSession.session_date}
															</td>
															<td className="p-3 text-[12px] text-gray-500 font-thin">
																{totalSession.name}
															</td>
															<td className="p-3 text-[12px] text-gray-500">
																{totalSession.cost * totalSession.times}원
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
			</Layout>
		</>
	)
}

export default Ledger
