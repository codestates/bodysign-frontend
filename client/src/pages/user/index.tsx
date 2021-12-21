import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../../components/Layout'
import logo from '../../../public/logo3.svg'
import { gql, useQuery, useReactiveVar } from '@apollo/client'
import Image from 'next/image'
import axios from 'axios'
import { userDataVar } from '../../graphql/vars'
import { getCookies } from 'cookies-next'
import BottomBar from '../../components/BottomBar'

export const UserDocument = gql`
	query User($id: Int!) {
		user(id: $id) {
			__typename
			id
			email
			userName
			birthDate
			phoneNumber
			gender
			graduate
			inbodies {
				id
				bodyWeight
				muscleWeight
				bodyFat
				measuredDate
			}
			sessionHistories {
				id
				date
				status
			}
			userCategoryId
		}
	}
`

export const VerifyOwner = gql`
	query VerifyOwner {
		verifyOwner {
			__typename
			id
			email
			userName
			birthDate
			phoneNumber
			gender
		}
	}
`

// TODO: CSS 애니메이션 꾸미기
// https://codepen.io/Tbgse/pen/dYaJyJ
// https://codepen.io/CheeseTurtle/pen/jzdgI?editors=1010

// TODO : 이름 받아오기
const Main: NextPage = () => {
	const userData = useReactiveVar(userDataVar)

	const accessToken = getCookies().accessToken
	const getUserData = async () => {
		await axios
			.get('http://localhost:4000/auth/profile', {
				headers: {
					authorization: `Bearer ${accessToken}`
				}
			})
			.then(res => {
				userDataVar(res.data)
			})
			.catch(error => console.log(error))
	}

	useEffect(() => {
		getUserData()
	}, [getUserData])
	const { loading, data: queryUserData } = useQuery(UserDocument, {
		variables: { id: userData?.id }
	})
	if (!loading && queryUserData) {
		console.log(queryUserData)
	}

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
		<Layout>
			<div className="mb-2.5 flex flex-col w-full mx-4 my-5 text-[12px] font-IBM">
				<Image src={logo} width="50" height="50" alt="logo" />
			</div>

			<div className="m-5 font-thin font-IBM"></div>

			<div className="font-IBM font-extrabold text-[25px]">
				{/* 체중, 골격근량, 체지방 보여주기 */}
				{/* 이 때 CSS 애니메이션 추가가 필요 */}
				{`안녕하세요. 김창동 회원님!`}
				<br />
				<div className="text-xs mt-2.5 font-thin">
					{`${inbodyList[0].date} 측정 기준`}
				</div>
				{`체중이 ${
					inbodyList[1].weight - inbodyList[0].weight
				} kg 변화했어요.`}
			</div>
			<div className="bottom-2 mt-[500px] mb-2 width-full">
				<div className="font-IBM font-bold text-[20px] mb-3">
					예정된 수업
				</div>
				<div className="text-[22px] font-IBM font-medium border border-gray-300 bg-gray-50 rounded-3xl p-2 items-center m-1 width-full">
					<div className="inline-block p-1 mx-3 font-bold">
						{classData.date}
					</div>
					<div className="inline-block float-right p-1 mx-3 font-bold">
						{classData.time}
					</div>
				</div>
			</div>
			<BottomBar variant="User" />
		</Layout>
	)
}

export default Main
