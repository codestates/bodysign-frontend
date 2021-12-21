import React, { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../../../components/Layout'
import { gql, useQuery, useMutation, useReactiveVar } from '@apollo/client'
import Link from 'next/link'
import BottomBar from '../../../components/BottomBar'

// TODO: 날짜, 요일, 시간 쪽을 클릭하면 e.target.children이 빈 배열로 나옴 -> 에러 발생
// TODO: 세션 디테일 모달을 트레이너 참고해서 변경

export const UserSession = gql`
	query User($id: Int!) {
		user(id: $id) {
			sessionHistories {
				id
				date
				costPerSession
				totalCount
				usedCount
				commission
				userId
			}
		}
	}
`

const Session: NextPage = () => {
	const [sessionList, setSessionList] = useState([
		{
			date: '21/01/01',
			day: '월',
			time: '00:00'
		}
	])

	// const [ sessionList, setSessionList ] = useState([])
	const { loading, data } = useQuery(UserSession, {
		variables: { id: 2 }
	})

	if (loading) {
	} else {
		console.log(data.user.sessionHistories)
	}

	// TODO: setSessionList(받아온 데이터)
	// TODO: 여기 로딩 컴포넌트 넣기
	return (
		<Layout>
			<div className="flex flex-col m-5 mx-4 my-5 font-IBM text-[15px]">
				<>
					<div className="text-[3.2rem] mb-3 font-IBM font-bold">
						수업 기록
					</div>
					{sessionList.map((session, index) => (
						<Link
							href="/user/session/date"
							passHref
							key={index} 
						>
							<div className="h-[7rem] flex justify-between items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white">
								<div className="inline-block p-1 mx-1 font-IBM font-medium">
									{session.date}
								</div>
								<div className="inline-block p-1 mx-1 font-IBM font-medium">{`${session.day}요일`}</div>
								<div className="inline-block p-1 mx-1 font-IBM font-medium float-right">
									{session.time}
								</div>
							</div>
						</Link>
					))}
				</>
			</div>
			<BottomBar variant="User" />
		</Layout>
	)
}

export default Session
