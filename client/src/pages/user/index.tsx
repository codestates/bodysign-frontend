import React, { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../../components/Layout'

// TODO: CSS 애니메이션 꾸미기
// https://codepen.io/Tbgse/pen/dYaJyJ
// https://codepen.io/CheeseTurtle/pen/jzdgI?editors=1010

const main: NextPage = () => {
	const [inbodyList, setInbodyList] = useState([
		{
			date: '21/01/01',
			weight: 2,
			muscle_mass: 2,
			body_fat_mess: 2
		},
		{
			date: '21/01/01',
			weight: 1,
			muscle_mass: 1,
			body_fat_mess: 1
		}
	])

	const [classData, setClassData] = useState({
		date: '21/01/01',
		time: '15:00'
	})

	const getInbodyData = () => {
		// 서버에서 인바디 데이터(최근 인바디와 그 이전 인바디 정보) 가져와서 inbody state에 넣어주기
	}

	const getClassData = () => {
		// 서버에서 수업 정보를 가져와서 classList state에 넣어주기
	}

	const animateText = () => {
		// TODO: 체중, 골격근량, 체지방 애니메이션 함수 구현
		const textList = [
			`체중이 ${
				inbodyList[1].weight - inbodyList[0].weight
			} kg 변화했어요.`,
			`골격근량이 ${
				inbodyList[1].muscle_mass - inbodyList[0].muscle_mass
			} kg 변화했어요.`,
			`체지방이 ${
				inbodyList[1].body_fat_mess - inbodyList[0].body_fat_mess
			} kg 변화했어요.`
		]
	}

	return (
		<Layout variant="Web">
			<div className="mb-2.5 flex flex-col w-full mx-4 my-5 text-[12px] font-IBM">
				Bodysign logo
			</div>
			<div className="m-5 font-thin font-IBM">
				<div className="text-xs mt-2.5">
					{`${inbodyList[0].date} 측정 기준`}
				</div>
				<div className="font-IBM font-extrabold text-[20px]">
					{/* 체중, 골격근량, 체지방 보여주기 */}
					{/* 이 때 CSS 애니메이션 추가가 필요 */}
					{`체중이 ${
						inbodyList[1].weight - inbodyList[0].weight
					} kg 변화했어요.`}
				</div>
				<div className="mt-40 mb-2 bottom-2 width-full">
					<div className="font-IBM font-bold text-[20px] mb-3">
						예정된 수업
					</div>
					<div className="items-center m-5 font-medium border border-gray-300 font-IBM bg-gray-50 rounded-2xl width-full">
						<div className="inline-block p-1 mx-3">{classData.date}</div>
						<div className="inline-block p-1 mx-3">{classData.time}</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default main
