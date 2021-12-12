import React, { useState } from 'react'
import type { NextPage } from 'next'
import Detail from '../../../components/Detail'
import Layout from '../../../components/Layout'
import { gql, useQuery, useMutation, useReactiveVar } from '@apollo/client';
import UserSession from '../../../../src/graphql/graphql';
import Link from 'next/link'

// TODO: 날짜, 요일, 시간 쪽을 클릭하면 e.target.children이 빈 배열로 나옴 -> 에러 발생
// TODO: 세션 디테일 모달을 트레이너 참고해서 변경

export const UserSession = gql`
	query User($id: Int!) {
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
`

const Session: NextPage = () => {

    const [ sessionList, setSessionList ] = useState([
        {
            date: "21/01/01",
            day: "월",
            time: "00:00"
        }
    ])

    // const [ sessionList, setSessionList ] = useState([])
    const { loading, data } = useQuery(UserSession)

    console.log(data)

    // TODO: setSessionList(받아온 데이터)

	return (
        <Layout variant="Web">
		<div className="flex flex-col m-5 mx-4 my-5 font-IBM text-[12px]">
                <>
                <div className="text-[20px] mb-3 font-IBM font-bold">수업 기록</div>
                {
                    sessionList.map((session) => (
                        <Link href='/user/session/date'>
                            <div className="border border-gray-300 rounded-2xl mb-2 hover:bg-gray-100 hover:cursor-pointer">
                                <div className="inline-block p-1 mx-1 font-IBM font-medium">{session.date}</div>
                                <div className="inline-block p-1 mx-1 font-IBM font-medium">{`${session.day}요일`}</div>
                                <div className="inline-block p-1 mx-1 font-IBM font-medium float-right">{session.time}</div>
                            </div>
                        </Link>
                    ))
                }
                </>
		</div>
        </Layout>
	)
}

export default Session