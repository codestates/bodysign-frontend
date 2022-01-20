import { useReactiveVar } from '@apollo/client'
import { io } from 'socket.io-client'
import React, { useEffect, useState } from 'react'
import { userDataVar } from '../../../graphql/vars'
import useSessionStorage from '../../../hooks/useSessionStorage'

const userData = useReactiveVar(userDataVar)
const [chatTargetUserId, _] = useSessionStorage('chatTargetUserId')

const socket = io(process.env.NEXT_PUBLIC_API_DOMAIN_SOCKET as string)
useEffect(() => {
	socket.emit('joinLounge', userData?.id)
	socket.on('joinedLounge', data => {
		// console.log(data)
		// 배포 이후 소켓 통신에 문제가 없는지부터 확인.
	})
}, [socket])

const PhotoAlbumIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="self-center w-6 h-6 cursor-pointer"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			onClick={() => {
				socket.emit('leaveRoom', `${chatTargetUserId}|${userData?.id}`)
				// chatTargetUserIdVar(null)
			}}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M15 19l-7-7 7-7"
			/>
		</svg>
	)
}

export default PhotoAlbumIcon
