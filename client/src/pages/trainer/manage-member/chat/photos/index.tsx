import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '../../../../../components/atoms/icons/DeleteIcon'
import { useFindImgsByUserIdAndTrainerIdQuery } from '../../../../../generated/graphql'
import {
	chatTargetUserIdVar,
	userDataVar
} from '../../../../../graphql/vars'

const Photos: NextPage = () => {
	const userData = useReactiveVar(userDataVar)
	const chatTargetUserId = useReactiveVar(chatTargetUserIdVar)
	const [imgs, setImgs] = useState<Record<string, string[]>>()
	const [readyDelete, setReadyDelete] = useState(false)
	const [deleteLists, setDeleteLists] = useState<Set<number>>(new Set())
	const { loading, data } = useFindImgsByUserIdAndTrainerIdQuery({
		variables: {
			findImgsInput: {
				page: 0,
				per: 20,
				trainerId: userData?.id as number,
				userId: chatTargetUserId as number
			}
		}
	})

	useEffect(() => {
		const Imgs: Record<string, string[]> = {}
		if (data) {
			data.findImgsByUserIdAndTrainerId.forEach(img => {
				const date = img.createdAt.split('T')[0]
				if (!Imgs[date]) {
					Imgs[date] = []
				}
				Imgs[date].push(img.url)
			})
			setImgs(Imgs)
		}
	}, [data])

	const handleReadyDelete = () => {
		setReadyDelete(true)
	}

	const handleDelete = async () => {
		const deleteItemId = Array.from(deleteLists)[0]
		if (deleteItemId) {
			try {
				// 사진 삭제
				// await updateUser({
				// 	variables: {
				// 		updateUserInput: {
				// 			id: deleteItemId,
				// 			trainerId: null
				// 		}
				// 	},
				// 	refetchQueries: [
				// 		{
				// 			query: TrainerDocument,
				// 			variables: { id: userData?.id as number }
				// 		}
				// 	]
				// })
				deleteLists.clear()
			} catch (error) {
				console.log(error)
			}
		}
		setReadyDelete(false)
	}

	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem] items-center">
					<Link href="/trainer/manage-member/chat" passHref>
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
				<DeleteIcon handleReadyDelete={handleReadyDelete} />
			</div>

			{imgs &&
				Object.entries(imgs).map(entry => {
					return (
						<React.Fragment key={entry[0]}>
							<div className="mt-[2.4rem]">
								<div className="font-semibold text-[1.8rem]">
									{entry[0]}
								</div>
								<div className="grid grid-cols-3 gap-3 mt-[0.8rem]">
									{entry[1].map(url => {
										return (
											<img
												className="object-contain"
												src={url}
												alt="image"
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
