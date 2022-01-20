import React from 'react'
import { Session } from '../../generated/graphql'
import Avatar from '../atoms/Avatar'

interface TrainerHomeSessionListProps {
	sessions: Session[] | null | undefined
}

const TrainerHomeSessionList = ({
	sessions
}: TrainerHomeSessionListProps) => {
	return (
		<>
			<div className="absolute bottom-0 w-full">
				<div className="text-[1.8rem] font-semibold">오늘 예정된 수업</div>
				{sessions
					? sessions
							.filter(session => !session.completedSession)
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
											className={`h-[7rem] flex justify-between items-center px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white hover:ring-2 hover:ring-[#FED06E]`}
											data-id={session.id}>
											<div className="flex">
												<Avatar gender={session.user.gender} />
												<div className="self-center ml-[1.2rem]">
													{session.user.userName} 회원
												</div>
											</div>
											<div>
												{`${hours}:${minutes === '0' ? '00' : minutes}`}
											</div>
										</div>
									</React.Fragment>
								)
							})
					: null}
			</div>
		</>
	)
}

export default TrainerHomeSessionList
