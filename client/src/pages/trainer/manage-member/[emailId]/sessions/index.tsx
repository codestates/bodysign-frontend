import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../../../components/Layout'
import { useRouter } from 'next/dist/client/router'
import { useQuery, useReactiveVar } from '@apollo/client'
import { UserDocument } from '../../../../../graphql/graphql'
import {
	managedUserInfoVar,
	sessionExerciseInputVar
} from '../../../../../graphql/vars'
import Loading from '../../../../../components/Loading'

const Sessions: NextPage = () => {
	const router = useRouter()
	const managedUserInfo = useReactiveVar(managedUserInfoVar)
	const sessionExerciseInput = useReactiveVar(sessionExerciseInputVar)
	const { loading, data } = useQuery(UserDocument, {
		variables: { id: managedUserInfo.userId }
	})

	const week = [
		'일요일',
		'월요일',
		'화요일',
		'수요일',
		'목요일',
		'금요일',
		'토요일'
	]

	if (loading) return <Loading />
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[25px]">
						<Link href="/trainer/manage-member">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="self-center w-6 h-6 cursor-pointer"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</Link>
						<div className="font-bold">{data.user.userName} 회원님</div>
					</span>
					<span className="flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mr-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
							/>
						</svg>
					</span>
				</div>

				<div className="flex justify-between pr-3 mt-4 text-[18px]">
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/info`}>
						<span className="ml-0 cursor-pointer">회원정보</span>
					</Link>
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/sessions`}>
						<span className="pb-1 ml-2 border-b border-black cursor-pointer">
							수업기록
						</span>
					</Link>
					<Link
						href={`/trainer/manage-member/${managedUserInfo.email}/inbody`}>
						<span className="ml-2 cursor-pointer">인바디</span>
					</Link>
				</div>

				<div className="flex flex-col mt-4 text-[12px]">
					{data.user.sessions.map((session: any) => {
						const date = session.date.split('T')[0]
						return (
							<React.Fragment key={session.id}>
								<div
									className="flex px-3 py-3 mt-1 border rounded-3xl first:mt-0 text-[12px] justify-around items-center relative cursor-pointer font-thin"
									onClick={e => {
										if (e !== null && e.target instanceof HTMLElement) {
											sessionExerciseInputVar({
												...sessionExerciseInput,
												sessionId: session.id
											})
											router.push(
												`/trainer/manage-member/${
													data.user.email.split('@')[0]
												}/sessions/${date}`
											)
										}
									}}>
									<span>{date}</span>
									<span>{week[new Date(session.date).getDay()]}</span>
									<span>{session.time}</span>
									{session.sentFeedback ? (
										<span className="w-3 h-3 bg-green-300 rounded-full"></span>
									) : (
										<span className="w-3 h-3 bg-gray-300 rounded-full"></span>
									)}
								</div>
							</React.Fragment>
						)
					})}

					<Link href="/trainer/session/add-session">
						<svg
							className="self-center w-6 h-6 mt-4 text-gray-500 cursor-pointer"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</Link>
				</div>
			</Layout>
		</>
	)
}

export default Sessions
