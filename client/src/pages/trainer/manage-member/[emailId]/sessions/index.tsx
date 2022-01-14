import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loading from '../../../../../components/Loading'
import { useUserLazyQuery } from '../../../../../generated/graphql'
import useSessionStorage from '../../../../../hooks/useSessionStorage'

const Sessions: NextPage = () => {
	const router = useRouter()
	const [mangedMemberInfo, _] = useSessionStorage('mangedMemberInfo')
	const [___, setChatTargetUserId] = useSessionStorage('chatTargetUserId')
	const [sessionExerciseInput, setSessionExerciseInput] =
		useSessionStorage('sessionExerciseInput')
	const [emailId, setEmailId] = useState('')
	const [userLazyQuery, { loading, data }] = useUserLazyQuery({})
	const week = ['일', '월', '화', '수', '목', '금', '토']

	useEffect(() => {
		userLazyQuery({
			variables: { id: mangedMemberInfo.userId }
		})
	}, [mangedMemberInfo])

	useEffect(() => {
		setEmailId(`${mangedMemberInfo.emailId}/`)
	}, [mangedMemberInfo])

	if (loading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem] items-center">
					<Link href="/trainer/manage-member" passHref>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="self-center w-[2.8rem] h-[2.8rem] cursor-pointer"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</Link>
					<div className="ml-[0.8rem] font-bold">
						{data && data.user.userName} 회원
					</div>
				</span>
				<Link href={`/trainer/manage-member/chat`} passHref>
					<svg
						className="w-[2.8rem] h-[2.8rem]"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 25 25"
						stroke="currentColor"
						onClick={() => {
							setChatTargetUserId(mangedMemberInfo.userId)
						}}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
						/>
					</svg>
				</Link>
			</div>

			<div className="flex justify-between mt-[2.4rem] text-[2.2rem]">
				<Link href={`/trainer/manage-member/${emailId}info`} passHref>
					<span className="pb-[0.4rem] cursor-pointer">회원정보</span>
				</Link>
				<Link href={`/trainer/manage-member/${emailId}inbody`} passHref>
					<span className="ml-[0.8rem] cursor-pointer">인바디</span>
				</Link>
				<Link href={`/trainer/manage-member/${emailId}sessions`} passHref>
					<span className="ml-[0.8rem] border-b-[3px] border-[#FED06E] cursor-pointer">
						수업기록
					</span>
				</Link>
			</div>

			<div className="flex flex-col mt-[2.4rem]">
				{data &&
					data.user.sessions.map((session: any) => {
						const date = new Date(session.date)
						let hours = date.getHours() + ''
						if (hours.length === 1) {
							hours = 0 + hours
						}
						let minutes = date.getMinutes() + ''
						if (minutes.length === 1) {
							minutes = 0 + minutes
						}

						return (
							<React.Fragment key={session.id}>
								<div
									className="h-[7rem] flex justify-around items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white first:mt-0 relative cursor-pointer"
									onClick={e => {
										if (e !== null && e.target instanceof HTMLElement) {
											setSessionExerciseInput({
												...sessionExerciseInput,
												sessionId: session.id
											})
											router.push(
												`/trainer/manage-member/${
													data.user.email.split('@')[0]
												}/sessions/${session.date.split('T')[0]}`
											)
										}
									}}>
									<span>
										{session.date.split('T')[0].replace(/\-/g, '.')} (
										{week[new Date(session.date).getDay()]})
									</span>
									<span>{`${hours}:${
										minutes === '0' ? '00' : minutes
									}`}</span>
								</div>
							</React.Fragment>
						)
					})}
				<Link href="/trainer/session/add-session" passHref>
					<div className="text-[1.8rem] mt-[0.8rem] flex justify-center py-[2rem] bg-white rounded-full shadow-md border">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-[2.8rem] h-[2.8rem] text-[#9F9F9F]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</div>
				</Link>
			</div>
		</>
	)
}

export default Sessions
