import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import Layout from '../../../../components/Layout'
import dummydata from '../../../../../dummydata.json'

const Sessions: NextPage = () => {
	const member_dummy = {
		id: '1',
		email: 'jsmsumin1234@naver.com',
		name: 'Alice',
		birth: '2020.11.13',
		phone: '12345678',
		gender: 'male',
		graduate: 'false',
		time: '14:00',
		times: '8/10',
		date: '2021-11-05',
		membercategory: '바디프로필'
	}
	const week = [
		'일요일',
		'월요일',
		'화요일',
		'수요일',
		'목요일',
		'금요일',
		'토요일'
	]

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center w-full mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
							<div className="font-semibold">
								{member_dummy.name} 회원님
							</div>
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

					<div className="flex justify-between pr-3 mt-4">
						<Link href="/manage-member/emailId/info">
							<span className="ml-0 cursor-pointer">회원정보</span>
						</Link>
						<Link href="/manage-member/emailId/sessions">
							<span className="pb-1 ml-2 border-b border-black cursor-pointer">
								수업기록
							</span>
						</Link>
						<Link href="/manage-member/emailId/inbody">
							<span className="ml-2 cursor-pointer">인바디</span>
						</Link>
					</div>

					<div className="flex flex-col mt-4">
						{dummydata.map(session => {
							return (
								<React.Fragment key={session.id}>
									<Link
										href={`/manage-member/${
											session.email.split('@')[0]
										}/sessions/${session.date}`}>
										<div className="flex px-3 py-3 mt-1 border first:mt-0 text-[16px] justify-around items-center relative cursor-pointer">
											<span>{session.date}</span>
											<span>{week[new Date(session.date).getDay()]}</span>
											<span>{session.time}</span>
											{session.feedback ? (
												<span className="w-3 h-3 bg-green-300 rounded-full"></span>
											) : (
												<span className="w-3 h-3 bg-gray-300 rounded-full"></span>
											)}
										</div>
									</Link>
								</React.Fragment>
							)
						})}
					</div>

					<Link href="/session/add-session">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="self-center w-6 h-6 mt-4 text-gray-500"
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
