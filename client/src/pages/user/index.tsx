import { useReactiveVar } from '@apollo/client'
import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import Loading from '../../components/Loading'
import HomeLogoHeader from '../../components/molecules/Header/HomeLogoHeader'
import HomeMemberIntro from '../../components/molecules/MemberHomeIntro'
import MemberHomeSessionList from '../../components/molecules/MemberHomeSessionList'
import { Inbody, Session, useUserLazyQuery } from '../../generated/graphql'
import { userDataVar } from '../../graphql/vars'

// TODO: CSS 애니메이션 꾸미기
// https://codepen.io/Tbgse/pen/dYaJyJ
// https://codepen.io/CheeseTurtle/pen/jzdgI?editors=1010

const Main: NextPage = () => {
	const userData = useReactiveVar(userDataVar)
	const [userLazyQuery, { loading, data }] = useUserLazyQuery()

	useEffect(() => {
		if (userData) {
			userLazyQuery({
				variables: { id: userData?.id as number }
			})
		}
	}, [userData])

	if (loading) return <Loading />
	return (
		<>
			<div className="relative h-[calc(100vh-40px-63px)]">
				<HomeLogoHeader />
				<HomeMemberIntro
					userName={data?.user.userName as string}
					inbodies={data?.user.inbodies.slice(-2) as Inbody[]}
				/>
				<MemberHomeSessionList
					sessions={data?.user.sessions as Session[]}
				/>
			</div>
		</>
	)
}

export default Main
