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
	const [imgs, setImgs] = useState<Record<string, string[]>>()
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
				imgs[date].push([img.id + '', img.url])
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
				deleteLists.clear()
			} catch (error) {
				console.log(error)
			}
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
					return (
						<React.Fragment key={entry[0]}>
							<div className="mt-[2.4rem]">
								<div className="font-semibold text-[1.8rem]">
									{entry[0]}
								</div>
								<div className="grid grid-cols-3 gap-[1.2rem] mt-[0.8rem]">
									{entry[1].map(img => {
										const imgId = +img[0]
										const url = img[1]
										return (
											<img
												className={`
												${!readyDelete ? '' : 'cursor-pointer'} ${
													deleteLists.has(imgId)
														? 'ring-2 ring-[#FED06E]'
														: ''
												}
												w-full min-h-[10.5rem] h-full`}
												src={url}
												alt="image"
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
