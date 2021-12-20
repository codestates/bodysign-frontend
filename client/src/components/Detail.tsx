import React, { useState } from 'react'
import type { NextPage } from 'next'
import Layout from './Layout'

const Detail: NextPage = ({ date, day, isOpen, changeOpen }) => {
	const [exerciseData, setExerciseData] = useState([
		{
			exerciseName: '오버 헤드 프레스',
			weight: 0,
			reps: 0,
			sets: 0
		}
	])

	const [feedback, setFeedback] = useState(
		'수업 피드백이 작성되지 않았습니다.'
	)

	const [isDetailOpen, setIsDetailOpen] = useState(false)

	const getExerciseData = () => {
		// 서버에 해당 회원의 해당 일자 운동 기록, 운동 상세 정보 한번에 요청해서 exerciseData 에 업데이트
	}

	const openExerciseDetail = () => {
		// toggle 클릭하면 운동 상세 정보 보여주기
		setIsDetailOpen(!isDetailOpen)
	}

	const getFeedbackData = () => {
		// 서버에서 피드백 데이터 받아오기 setFeedback 로 업데이트
	}

	const moveBack = () => {
		changeOpen(!isOpen)
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col m-5 mx-4 my-5 text-[12px] font-IBM font-thin">
					<div className="flex mb-10 items-center">
						<svg
							onClick={moveBack}
							className="m-2"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							width="15"
							height="15">
							<path
								d="M6.854 5.854l.353-.354-.707-.707-.354.353.708.708zM4.5 7.5l-.354-.354-.353.354.353.354L4.5 7.5zm1.646 2.354l.354.353.707-.707-.353-.354-.708.708zM7.5.5V0v.5zm7 7h.5-.5zm-14 0H1 .5zm7 7V14v.5zM6.146 5.146l-2 2 .708.708 2-2-.708-.708zm-2 2.708l2 2 .708-.708-2-2-.708.708zM4.5 8H11V7H4.5v1zm3-7A6.5 6.5 0 0114 7.5h1A7.5 7.5 0 007.5 0v1zM1 7.5A6.5 6.5 0 017.5 1V0A7.5 7.5 0 000 7.5h1zM7.5 14A6.5 6.5 0 011 7.5H0A7.5 7.5 0 007.5 15v-1zm0 1A7.5 7.5 0 0015 7.5h-1A6.5 6.5 0 017.5 14v1z"
								fill="currentColor"></path>
						</svg>
						<div className="font-bold text-[20px] mb-3">
							{`${date} ${day}`}
						</div>
					</div>

					{exerciseData.map(exercise => {
						return (
							<>
								<div
									className="flex border border-gray-300 rounded-2xl mb-2 hover:bg-gray-100 hover:cursor-pointer"
									onClick={openExerciseDetail}>
									<div className="inline-block p-1 mx-5 font-bold">
										{exercise.exerciseName}
									</div>
									<div className="flex items-center">
										{isDetailOpen ? (
											<>
												<div className="flex">
													<div className="bottom-0 mx-1">{`${exercise.weight} kg`}</div>
													<div className="bottom-0 mx-1">{`${exercise.reps} 회`}</div>
													<div className="bottom-0 mx-1">{`${exercise.sets} 세트`}</div>
												</div>
												<svg
													className="m-1"
													viewBox="0 0 15 15"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													width="15"
													height="15">
													<path
														d="M4.5 6.5l3 3 3-3"
														stroke="currentColor"
														stroke-linecap="square"></path>
												</svg>
											</>
										) : (
											<>
												<svg
													className="float-right"
													viewBox="0 0 15 15"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													width="15"
													height="15">
													<path
														d="M8.5 4.5l-3 3 3 3"
														stroke="currentColor"
														stroke-linecap="square"></path>
												</svg>
											</>
										)}
									</div>
								</div>
							</>
						)
					})}
				</div>
				<div className="border border-dashed bg-gray-100 fixed inset-x-0 bottom-0 h-40 text-center p-2">
					{feedback}
				</div>
			</Layout>
		</>
	)
}

export default Detail
