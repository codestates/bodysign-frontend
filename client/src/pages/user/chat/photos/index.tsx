import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CheckIcon from '../../../../components/atoms/icons/CheckIcon'
import DeleteIcon from '../../../../components/atoms/icons/DeleteIcon'
import Loading from '../../../../components/Loading'
import {
	FindImgsByUserIdAndTrainerIdDocument,
	useBulkRemoveImgMutation,
	useFindImgsByUserIdAndTrainerIdQuery
} from '../../../../generated/graphql'
import { userDataVar } from '../../../../graphql/vars'

const Photos: NextPage = () => {
	const userData = useReactiveVar(userDataVar)
	const [imgs, setImgs] = useState<Record<string, string[][]>>()
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const { loading, data } = useFindImgsByUserIdAndTrainerIdQuery({
		variables: {
			findImgsInput: {
				page: 0,
				per: 20,
				trainerId: userData?.trainerId as number,
				userId: userData?.id as number
			}
		}
	})
	const [bulkRemoveImg] = useBulkRemoveImgMutation()

	useEffect(() => {
		const imgs: Record<string, string[][]> = {}
		if (data) {
			data.findImgsByUserIdAndTrainerId.forEach(img => {
				const date = img.createdAt.split('T')[0]
				if (!imgs[date]) {
					imgs[date] = []
				}
				imgs[date].push([img.id + '', img.url, img.chat.sender])
			})
			setImgs(imgs)
		}
	}, [data])

	const handleReadyDelete = () => {
		setReadyDelete(true)
	}

	const handleDelete = async () => {
		const deleteItemId = Array.from(deleteLists)[0]
		if (deleteItemId) {
			try {
				// 사진 삭제 step 2
				await bulkRemoveImg({
					variables: {
						ids: [...deleteLists]
					},
					refetchQueries: [
						{
							query: FindImgsByUserIdAndTrainerIdDocument,
							variables: {
								findImgsInput: {
									page: 0,
									per: 20,
									trainerId: userData?.trainerId as number,
									userId: userData?.id as number
								}
							}
						}
					]
				})
			} catch (error) {
				console.log(error)
			}
			deleteLists.clear()
		}
		setReadyDelete(false)
	}

	if (loading) return <Loading />
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem] items-center">
					<Link href="/user/chat" passHref>
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
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</Link>
					<div className="ml-[0.8rem] font-bold">사진</div>
				</span>
				{!readyDelete ? (
					<DeleteIcon handleReadyDelete={handleReadyDelete} />
				) : (
					<CheckIcon handleDelete={handleDelete} />
				)}
			</div>

			{imgs &&
				Object.entries(imgs).map(entry => {
					const [date, imgs] = entry
					return (
						<React.Fragment key={date}>
							<div className="mt-[2.4rem]">
								<div className="font-semibold text-[1.8rem]">{date}</div>
								<div className="grid grid-cols-3 gap-[1.2rem] mt-[0.8rem]">
									{imgs.map(img => {
										const [imgId, url, sender] = img
										return (
											<span className="relative">
												<img
													className={`
												${!readyDelete ? '' : 'cursor-pointer'} ${
														deleteLists.has(+imgId)
															? 'ring-2 ring-[#FED06E] opacity-60'
															: ''
													}
												w-full min-h-[10.5rem] h-full`}
													src={url}
													alt="image"
												/>
												{readyDelete ? (
													sender === 'User' ? (
														<div
															className="w-[2.5rem] h-[2.5rem] absolute bg-white/50 top-[0.5rem] right-[0.5rem] rounded-full"
															data-id={imgId}
															onClick={
																!readyDelete
																	? undefined
																	: e => {
																			if (
																				e !== null &&
																				e.target instanceof HTMLElement
																			) {
																				// 사진 삭제 step 1
																				if (e.target.dataset.id) {
																					const id = +e.target.dataset.id
																					if (deleteLists.has(id)) {
																						setDeleteLists(
																							prev =>
																								new Set(
																									[...prev].filter(
																										el => el !== id
																									)
																								)
																						)
																					} else {
																						setDeleteLists(
																							prev => new Set(prev.add(id))
																						)
																					}
																				}
																			}
																	  }
															}
														/>
													) : null
												) : null}
												{deleteLists.has(+imgId) ? (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-[2.5rem] h-[2.5rem] absolute text-[#FED06E] bg-white top-[0.5rem] right-[0.5rem] rounded-full pointer-events-none"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												) : null}
											</span>
										)
									})}
								</div>
							</div>
						</React.Fragment>
					)
				})}
		</>
	)
}

export default Photos
