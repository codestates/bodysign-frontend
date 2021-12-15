import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Layout from '../../../components/Layout'

enum SenderReceiver {
	User = 'User',
	Trainer = 'Trainer'
}

interface Chat {
	sender: SenderReceiver
	text: string
	imgs: Array<string>
	updatedAt: string
}

const socket = io('localhost:4000')
const Chat: NextPage = () => {
	const [message, setMessage] = useState('')
	const [chat, setChat] = useState<Chat[]>([])

	useEffect(() => {
		socket.emit('joinRoom', '26|21')
		socket.on('joinedRoom', data => {
			data.reverse().map((el: any) => {
				if (el.sender === 'Trainer') {
					setChat(prev => {
						return prev.concat({
							sender: SenderReceiver.Trainer,
							text: el.text,
							imgs: el.imgs,
							updatedAt: el.updatedAt
						})
					})
				} else if (el.sender === 'User') {
					setChat(prev => {
						return prev.concat({
							sender: SenderReceiver.User,
							text: el.text,
							imgs: el.imgs,
							updatedAt: el.updatedAt
						})
					})
				}
				return el
			})
		})
	}, [])

	useEffect(() => {
		socket.on('receiveMessage', chat => {
			setChat(prev =>
				prev.concat({
					sender: chat.sender,
					text: chat.text,
					imgs: chat.imgs,
					updatedAt: chat.updatedAt
				})
			)
		})
	}, [])

	const SendMessage = () => {
		socket.emit('sendMessage', {
			room: '26|21', // 변수
			text: message,
			sender: 'User',
			imgs: []
		})

		setChat(prev =>
			prev.concat({
				sender: SenderReceiver.User,
				text: message,
				imgs: [],
				updatedAt: new Date().toISOString()
			})
		)
	}

	// if (loading) return <Loading />
	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[25px]">
							<Link href="/trainer/manage-member/">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="self-center w-6 h-6 cursor-pointer"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									onClick={() => {
										socket.emit('leaveRoom', '26|21')
									}}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</Link>
							<div className="font-bold">
								장수민 회원님
								{/* {userData.user.userName} 회원님 */}
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

					{/* <div className="flex justify-between mt-4">
						<span>공지</span>
						<span className="mr-3 text-gray-400 cursor-pointer">
							+카테고리
						</span>
					</div> */}

					<div className="flex flex-col border mt-4">
						<div className="p-3 h-[500px] flex flex-col overflow-scroll">
							{chat.map((chat, idx) => {
								return (
									<div
										className={`${
											chat.sender === SenderReceiver.Trainer
												? 'self-start bg-blue-100'
												: 'self-end bg-blue-500 text-white'
										} p-3 rounded-lg mt-2 font-IBM text-[12px]`}
										key={idx}>
										{chat.text}
									</div>
								)
							})}
						</div>
						<div className="">
							<div className="p-3 flex">
								<textarea
									className="p-3 w-full h-[44px] resize-none bg-gray-50 focus:h-[85px] overflow-hidden mr-2"
									defaultValue=""
									onBlur={e => {
										setMessage(e.target.value)
									}}
								/>
								<svg
									className="text-yellow-50000 mt-1"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									width="34"
									height="34"
									onClick={() => {
										SendMessage()
									}}>
									<path
										d="M14.954.71a.5.5 0 01-.1.144L5.4 10.306l2.67 4.451a.5.5 0 00.889-.06L14.954.71zM4.694 9.6L.243 6.928a.5.5 0 01.06-.889L14.293.045a.5.5 0 00-.146.101L4.694 9.6z"
										fill="currentColor"></path>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Chat
