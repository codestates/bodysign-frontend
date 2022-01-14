import { useReactiveVar } from '@apollo/client'
import axios from 'axios'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { userDataVar } from '../../../../graphql/vars'
import useSessionStorage from '../../../../hooks/useSessionStorage'

enum SenderReceiver {
	User = 'User',
	Trainer = 'Trainer'
}

interface Imgs {
	id: number
	url: string
}

interface Chat {
	sender: SenderReceiver
	text: string
	imgs: Array<Imgs>
	updatedAt: string
}

const Chat: NextPage = () => {
	const userData = useReactiveVar(userDataVar)
	const [chatTargetUserId, _] = useSessionStorage('chatTargetUserId')
	const botRef = useRef<HTMLDivElement>(null)
	const [message, setMessage] = useState('')
	const [chats, setChat] = useState<Chat[]>([])
	const [dataUrl, setDataUrl] = useState('')
	const [img, setImg] = useState({
		id: 0,
		url: '',
		readyUpload: false
	})

	const socket = io(process.env.NEXT_PUBLIC_API_DOMAIN_SOCKET as string)
	useEffect(() => {
		socket.emit('joinRoom', `${chatTargetUserId}|${userData?.id}`)
	}, [chatTargetUserId, socket, userData?.id])

	useEffect(() => {
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
	}, [userData])

	useEffect(() => {
		socket.on('receiveChat', chat => {
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

	useEffect(() => {
		botRef.current?.scrollIntoView()
	})

	const fileChange = async (target: HTMLInputElement) => {
		const { files } = target
		if (files && files.length) {
			// preview
			const reader = new FileReader()
			reader.readAsDataURL(files[0])
			reader.onload = e => {
				setDataUrl(e.target?.result as string)
			}

			// s3 upload
			const formData = new FormData()
			formData.append('image', files[0], files[0].name)

			await axios
				.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/imgs`, formData)
				.then(res => {
					const imgData = res.data
					setImg(prev => {
						return {
							...prev,
							id: imgData.id,
							url: imgData.url,
							readyUpload: true
						}
					})
				})
		}
	}

	const sendChat = async () => {
		try {
			socket.emit('sendChat', {
				room: `${chatTargetUserId}|${userData?.id}`,
				text: message,
				sender: 'Trainer',
				imgIds: img.id ? [img.id] : []
			})
			setDataUrl('')
			setImg(prev => {
				return {
					...prev,
					readyUpload: false
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

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
							stroke="currentColor"
							onClick={() => {
								socket.emit(
									'leaveRoom',
									`${userData?.id}|${userData?.trainerId}`
								)
							}}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</Link>
					<div className="ml-[0.8rem] font-bold">
						{userData?.userName} 회원
					</div>
				</span>

				<Link href="/trainer/manage-member/chat/photos" passHref>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-[2.8rem] h-[2.8rem] cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/>
					</svg>
				</Link>
			</div>

			{/* <div className="flex justify-between mt-4">
						<span>공지</span>
						<span className="mr-3 text-gray-400 cursor-pointer">
							+카테고리
						</span>
					</div> */}

			<div className="flex flex-col mt-[1.6rem] border">
				<div className="p-[1.2rem] flex flex-col overflow-y-scroll no-scrollbar h-[calc(100vh-103px-48px-60px-26px)]">
					{chats.map((chat, idx) => {
						const url = chat.imgs[0]?.url
						return chat.imgs.length ? (
							<div
								className={`${
									chat.sender === SenderReceiver.User
										? 'self-start'
										: 'self-end'
								} first:mt-0`}>
								<Image
									loader={() => url}
									src={url}
									unoptimized={true}
									width="140"
									height="140"
									layout="fixed"
									alt="image"
								/>
							</div>
						) : (
							<div
								className={`${
									chat.sender === SenderReceiver.User
										? 'self-start bg-[#FED06E]'
										: 'self-end bg-white text-black border'
								} p-[1.2rem] mb-[0.6rem] rounded-lg font-IBM text-[1.6rem]`}
								key={idx}>
								{chat.text}
							</div>
						)
					})}
					<div ref={botRef} />
				</div>
				<div className="flex flex-col">
					<div className="flex p-[1.2rem]">
						<label className="mt-[0.5rem] mr-[0.8rem]" htmlFor="upload">
							<svg
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="25">
								<path
									d="M10 3.5h1m3.5 5.993l-3-2.998-3 2.998-4-4.996L.5 9.5m1-9h12a1 1 0 011 1v12a1 1 0 01-1 1h-12a1 1 0 01-1-1v-12a1 1 0 011-1z"
									stroke="currentColor"></path>
							</svg>
						</label>
						<input
							className="hidden"
							type="file"
							id="upload"
							accept="image/*"
							onClick={() => setMessage('')}
							onChange={e => {
								if (e !== null && e.target instanceof HTMLElement) {
									fileChange(e.target)
								}
							}}
						/>
						<textarea
							className="py-[0.8rem] px-[1.2rem] w-full h-[3.5rem] text-[1.6rem] resize-none bg-gray-50 focus:h-[6.3rem] overflow-auto mr-[0.8rem]"
							autoFocus={true}
							disabled={img.readyUpload ? true : false}
							value={message}
							onChange={e => setMessage(e.target.value)}
							onFocus={e => {
								e.target.scrollTop = e.target.scrollHeight
							}}
						/>
						<button
							className="h-[3.6rem]"
							onClick={() => {
								setMessage('')
								sendChat()
							}}>
							<svg
								className="text-[#FED06E]"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30">
								<path
									d="M14.954.71a.5.5 0 01-.1.144L5.4 10.306l2.67 4.451a.5.5 0 00.889-.06L14.954.71zM4.694 9.6L.243 6.928a.5.5 0 01.06-.889L14.293.045a.5.5 0 00-.146.101L4.694 9.6z"
									fill="currentColor"></path>
							</svg>
						</button>
					</div>
					{dataUrl.length ? (
						<Image
							src={dataUrl}
							width="100"
							height="100"
							layout="responsive"
							placeholder="blur"
							blurDataURL="true"
							alt="image"
						/>
					) : null}
				</div>
			</div>
		</>
	)
}

export default Chat
