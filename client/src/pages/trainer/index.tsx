import { useReactiveVar } from '@apollo/client'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import HomeLogoHeader from '../../components/molecules/Header/HomeLogoHeader'
import HomeIntro from '../../components/molecules/HomeIntro'
import HomeSessionList from '../../components/molecules/HomeSessionList'
import { Session, useTrainerQuery } from '../../generated/graphql'
import { userDataVar } from '../../graphql/vars'
// TODO: CSS 애니메이션 꾸미기
// https://codepen.io/Tbgse/pen/dYaJyJ
// https://codepen.io/CheeseTurtle/pen/jzdgI?editors=1010

const Main: NextPage = () => {
	const userData = useReactiveVar(userDataVar)
	const [monthAccountsData, setMonthAccountsData] = useState(0)
	const [sessions, setSessions] = useState<Session[] | null>(null)
	const { loading, data } = useTrainerQuery({
		variables: { id: userData?.id as number }
	})

	useEffect(() => {
		const month = new Date().getMonth()
		const date = new Date().getDate()
		if (data && data.trainer.users) {
			data.trainer.users.map(member => {
				const sessionHistories = member?.sessionHistories
				if (sessionHistories) {
					setMonthAccountsData(
						sessionHistories.reduce((acc, cur): any => {
							const sessionMonth = new Date(cur.date).getMonth()
							if (month === sessionMonth) {
								return acc + cur.costPerSession * cur.totalCount
							} else {
								return acc
							}
						}, 0)
					)
				}
			})
		}

		if (data && data.trainer.sessions) {
			const sessions = data.trainer.sessions.filter(session => {
				if (session) {
					const sessionMonth = new Date(session.date).getMonth()
					const sessionDate = new Date(session.date).getDate()
					if (month === sessionMonth && date === sessionDate) {
						return session
					}
				}
			})
			if (sessions.length) {
				setSessions(sessions as Session[])
			}
		}
	}, [data])

	if (loading) return <Loading />
	return (
		<>
			<div className="relative h-[calc(100vh-40px-63px)]">
				<HomeLogoHeader />
				<HomeIntro
					userName={data?.trainer.userName as string}
					monthAccountsData={monthAccountsData}
				/>
				<HomeSessionList sessions={sessions} />
			</div>
		</>
	)
}

export default Main
