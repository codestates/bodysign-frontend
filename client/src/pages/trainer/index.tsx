import axios from 'axios'
import { getCookies } from 'cookies-next'
import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import logo from '../../../public/logo.svg'
import Loading from '../../components/Loading'
import { useTrainerQuery } from '../../generated/graphql'
import { accessTokenVar, userDataVar } from '../../graphql/vars'
// TODO: CSS 애니메이션 꾸미기
// https://codepen.io/Tbgse/pen/dYaJyJ
// https://codepen.io/CheeseTurtle/pen/jzdgI?editors=1010

const Main: NextPage = () => {
	const [trainerId, setTrainerId] = useState<number>()
	const { loading, data } = useTrainerQuery({
		variables: { id: trainerId as number }
	})
	console.log(data)

	let accessToken: string
	if (accessTokenVar()) {
		accessToken = accessTokenVar()
	} else {
		accessToken = getCookies().accessToken
	}

	const getTrainerData = useCallback(async () => {
		await axios
			.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/profile`, {
				headers: {
					authorization: `Bearer ${accessToken}`
				}
			})
			.then(res => {
				userDataVar(res.data)
				setTrainerId(res.data.id)
			})
			.catch(error => console.log(error))
	}, [accessToken])

	useEffect(() => {
		getTrainerData()
	}, [getTrainerData])

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

	if (loading) return <Loading />
	return (
		<>
			<div className="flex w-full text-[3.2rem] font-IBM">
				<Image src={logo} width="50" height="50" alt="logo" />
				<span className="ml-[0.8rem] text-[#FDAD00] font-bold">
					Bodysign
				</span>
			</div>
			<div className="flex flex-col font-IBM">
				<div className="font-extrabold text-[2.4rem] mt-[4rem]">
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
					<div className="font-bold text-[20px] mb-3">
						오늘 예정된 수업
					</div>
					<div className="text-[22px] font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
						<div className="inline-block p-1 mx-3 font-bold">
							{'권오연 회원님'}
						</div>
						<div className="inline-block float-right p-1 mx-3 font-bold">
							{classData.time}
						</div>
					</div>
					<div className="text-[22px] font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
						<div className="inline-block p-1 mx-3 font-bold">
							{'장수민 회원님'}
						</div>
						<div className="inline-block float-right p-1 mx-3 font-bold">
							{'17:00'}
						</div>
					</div>
					<div className="text-[22px] font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
						<div className="inline-block p-1 mx-3 font-bold">
							{'최원준 회원님'}
						</div>
						<div className="inline-block float-right p-1 mx-3 font-bold">
							{'19:00'}
						</div>
					</div>
					<div className="text-[22px] font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
						<div className="inline-block p-1 mx-3 font-bold">
							{'황현수 회원님'}
						</div>
						<div className="inline-block float-right p-1 mx-3 font-bold">
							{'21:00'}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Main
