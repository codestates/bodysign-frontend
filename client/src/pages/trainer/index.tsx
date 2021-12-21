import React, { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../../components/Layout'
import logo from '../../../public/logo.svg'
import BottomBar from '../../components/BottomBar'
import Image from 'next/image'

// TODO: CSS 애니메이션 꾸미기
// https://codepen.io/Tbgse/pen/dYaJyJ
// https://codepen.io/CheeseTurtle/pen/jzdgI?editors=1010

const Main: NextPage = () => {
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
		<>
			<Layout>
				<div className="mb-2.5 flex flex-col w-full mx-4 my-5 text-[12px] font-IBM">
					<Image src={logo} width="50" alt="logo" />
				</div>
				<div className="m-5 font-IBM font-thin">
					<div className="font-IBM font-extrabold text-[25px]">
						{/* 체중, 골격근량, 체지방 보여주기 */}
						{/* 이 때 CSS 애니메이션 추가가 필요 */}
						{`안녕하세요. 김창동 선생님!`}
						<br />
						<br />
						{`이번 달 정산 금액은`}
						<br />
						{`2,000,000원 입니다.`}
					</div>
					<div className="bottom-2 mt-[300px] mb-2 width-full">
						<div className="font-IBM font-bold text-[20px] mb-3">
							오늘 예정된 수업
						</div>
						<div className="text-[22px] font-IBM font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
							<div className="inline-block p-1 mx-3 font-bold">
								{'권오연 회원님'}
							</div>
							<div className="inline-block p-1 mx-3 font-bold float-right">
								{classData.time}
							</div>
						</div>
						<div className="text-[22px] font-IBM font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
							<div className="inline-block p-1 mx-3 font-bold">
								{'장수민 회원님'}
							</div>
							<div className="inline-block p-1 mx-3 font-bold float-right">
								{'17:00'}
							</div>
						</div>
						<div className="text-[22px] font-IBM font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
							<div className="inline-block p-1 mx-3 font-bold">
								{'최원준 회원님'}
							</div>
							<div className="inline-block p-1 mx-3 font-bold float-right">
								{'19:00'}
							</div>
						</div>
						<div className="text-[22px] font-IBM font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
							<div className="inline-block p-1 mx-3 font-bold">
								{'황현수 회원님'}
							</div>
							<div className="inline-block p-1 mx-3 font-bold float-right">
								{'21:00'}
							</div>
						</div>
					</div>
				</div>
				<BottomBar variant="Trainer" />
			</Layout>
		</>
	)
}

export default Main
