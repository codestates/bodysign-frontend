import React from 'react'
import { Session } from '../../generated/graphql'

interface MemberHomeSessionListProps {
	sessions: Session[] | null
}

const MemberHomeSessionList = ({
	sessions
}: MemberHomeSessionListProps) => {
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
			<div className="absolute bottom-0 w-full">
				<div className="text-[1.8rem] font-semibold">예정된 수업</div>
				{sessions
					? sessions
							.filter(session => {
								if (!session.completedSession) {
									return session
								}
							})
							.map(session => {
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
											className={`h-[7rem] flex justify-around items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white	`}>
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
							})
					: null}
			</div>
		</>
	)
}

export default MemberHomeSessionList
