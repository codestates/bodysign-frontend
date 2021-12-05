import React, { useState } from 'react'
import type { NextPage } from 'next'
import Detail from '../../../components/Detail'
import Layout from '../../../components/Layout'

// TODO: 날짜, 요일, 시간 쪽을 클릭하면 e.target.children이 빈 배열로 나옴 -> 에러 발생

const Session: NextPage = () => {

    const [ sessionList, setSessionList ] = useState([
        {
            date: "21/01/01",
            day: "월",
            time: "00:00"
        },
        {
            date: "21/01/01",
            day: "월",
            time: "00:00"
        },
        {
            date: "21/01/01",
            day: "월",
            time: "00:00"
        }
    ])

    const [ isDetailOpen, setIsDetailOpen ] = useState(false)

    const [ clickedSession, setClickedSession ] = useState({
        date: "",
        day: ""
    })

    const directSessionDetail = (e: any) => {
        let date = e.target.children[0].textContent
        let day = e.target.children[1].textContent

        setClickedSession({
            date: date,
            day: day
        })
        setIsDetailOpen(!isDetailOpen)
    }

	return (
        <Layout variant="Web">
		<div className="flex flex-col m-5 mx-4 my-5 font-IBM text-[12px]">
                {isDetailOpen === true ? 
                    <Detail date={clickedSession.date} day={clickedSession.day} isOpen={isDetailOpen} changeOpen={setIsDetailOpen} /> 
                : 
                <>
                <div className="text-[20px] mb-3 font-IBM font-bold">수업 기록</div>
                {
                    sessionList.map((session) => (
                        <div onClick={directSessionDetail} className="border border-gray-300 rounded-2xl mb-2 hover:bg-gray-100 hover:cursor-pointer">
                            <div className="inline-block p-1 mx-1 font-IBM font-medium">{session.date}</div>
                            <div className="inline-block p-1 mx-1 font-IBM font-medium">{`${session.day}요일`}</div>
                            <div className="inline-block p-1 mx-1 font-IBM font-medium float-right">{session.time}</div>
                        </div>
                    ))
                }
                </>
                }
		</div>
        </Layout>
	)
}

export default Session