import { NextPage } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { io } from 'socket.io-client'
import Layout from '../../../../components/Layout'
import axios from 'axios'

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

const socket = io('localhost:5000')
const Chat: NextPage = () => {
	const [message, setMessage] = useState('')
	const [chats, setChat] = useState<Chat[]>([])
	const [dataUrl, setDataUrl] = useState('')
	const [img, setImg] = useState({
		id: 0,
		url: '',
		readyUpload: false
	})

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
				.post('http://localhost:4000/imgs', formData)
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
			setChat(prev =>
				prev.concat({
					sender: SenderReceiver.Trainer,
					text: message,
					imgs: img.url ? [{ id: img.id, url: img.url }] : [],
					updatedAt: new Date().toISOString()
				})
			)
			socket.emit('sendChat', {
				room: '26|21',
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
								장수민 트레이너님
								{/* {userData.user.userName} 트레이너님 */}
							</div>
						</span>
						<span className="flex">
							<svg
								className="mr-3"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="25"
								height="25">
								<path
									d="M5.5.5h-4a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1zm8 0h-4a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1zm0 8h-4a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1zm-8 0h-4a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1z"
									stroke="currentColor"></path>
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
						<div className="p-3 h-[600px] flex flex-col overflow-y-scroll no-scrollbar">
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
										/>
									</div>
								) : (
									<div
										className={`${
											chat.sender === SenderReceiver.User
												? 'self-start bg-blue-100'
												: 'self-end bg-blue-500 text-white'
										} p-3 mb-[6px] rounded-lg font-IBM text-[12px]`}
										key={idx}>
										{chat.text}
									</div>
								)
							})}
						</div>
						<div className="flex flex-col">
							<div className="p-3 flex">
								<label className="mt-[10px] mr-2" htmlFor="upload">
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
									onChange={e => {
										if (e !== null && e.target instanceof HTMLElement) {
											fileChange(e.target)
										}
									}}
								/>
								<textarea
									className="p-3 w-full h-[44px] resize-none bg-gray-50 focus:h-[85px] overflow-hidden mr-2"
									autoFocus={true}
									disabled={img.readyUpload ? true : false}
									defaultValue=""
									onBlur={e => {
										setMessage(e.target.value)
									}}
								/>
								<button className="mt-1 h-9" type="submit">
									<svg
										className="text-yellow-500"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										width="30"
										height="30"
										onClick={() => {
											sendChat()
										}}>
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
								/>
							) : null}
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Chat