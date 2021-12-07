import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Layout from '../../../components/Layout'
import dummydata from '../../../../dummydata.json'
import { deleteStateVar, modalVar } from '../../../graphql/vars'
import { useReactiveVar } from '@apollo/client'
import SearchMemberModal from '../../../components/SearchMemberModal'
import AddMemberModal from '../../../components/AddMemberModal'

interface Member {
	id: string
	email: string
	name: string
	phone: string
	gender: string
	time?: string
	times?: string
	date?: string
	membercategory?: string
}

interface FormInput {
	phone: string
	category: string
}

const ManageMember: NextPage = () => {
	const [ isAddMemberModalOpen, setIsAddMemberModalOpen ] = useState(false)
	const [ isSearchMemberModalOpen, setIsSearchMemberModalOpen ] = useState(false)
	const [category, setCategory] = useState('관리중')
	const [checkModal, setCheckModal] = useState('addmember')
	const [checkList, setCheckList] = useState([])
	const modal = useReactiveVar(modalVar)
	const deleteState = useReactiveVar(deleteStateVar)

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		let test = { ...data }
		// 회원 추가 API
		// 카테고리 추가 API
	}

	const sessionObject: Record<string, Member[]> = {}
	dummydata.forEach(el => {
		if (sessionObject[el.membercategory] === undefined) {
			sessionObject[el.membercategory] = []
		}
		sessionObject[el.membercategory].push({
			id: el.id,
			email: el.email,
			name: el.name,
			phone: el.phone,
			gender: el.gender
		})
	})

	useEffect(() => {
		if (category === '졸업') {
			// filter
		} else if (category === '관리중') {
		}
	}, [category])

	const addMemberModalHandler = () => {
		setIsAddMemberModalOpen(!isAddMemberModalOpen)
	}

	const SearchMemberModalHandler = () => {
		setIsAddMemberModalOpen(!isAddMemberModalOpen)
		setIsSearchMemberModalOpen(!isSearchMemberModalOpen)
	}

	return (
		<>
			<Layout variant="Web">
				<div className="font-IBM flex flex-col justify-center mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
							<div
								className={`${category === '관리중' ? 'font-bold' : ''}`}
								onClick={() => setCategory('관리중')}>
								관리중
							</div>
							<div
								className={`ml-3 ${
									category === '졸업' ? 'font-bold' : ''
								}`}
								onClick={() => setCategory('졸업')}>
								졸업
							</div>
						</span>
						<span className="flex">
							{!deleteState ? (
								<>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-7 h-7"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										data-check-modal="addmember"
										onClick={addMemberModalHandler}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
										/>
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="mx-3 w-7 h-7"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										onClick={() => deleteStateVar(true)}>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={1.5}
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										/>
									</svg>
								</>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="mx-3 w-7 h-7"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									onClick={() => {
										// 3. 회원 삭제 API
										deleteStateVar(false)
									}}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							)}
						</span>
					</div>

					<div className="flex justify-between mt-4">
						<span>
							{Object.keys(sessionObject).map((category, idx) => {
								return (
									<React.Fragment key={idx}>
										<span className="ml-2 first:ml-0 font-thin">{category}</span>
									</React.Fragment>
								)
							})}
						</span>
						<span
							className="mr-3 text-gray-400 hover:text-black"
							data-check-modal="addcategory"
							onClick={e => {
								modalVar(true)
								if (e !== null && e.target instanceof HTMLElement) {
									{
										setCheckModal(e.target.dataset.checkModal as string)
									}
								}
							}}>
							+ 카테고리
						</span>
					</div>

					{Object.entries(sessionObject).map((entry, idx) => {
						return (
							<React.Fragment key={idx}>
								<div className="mt-4">
									<div className="text-[16px] font-bold">{entry[0]}</div>
									{entry[1].map((member, idx2) => {
										return (
											<React.Fragment key={idx2}>
												<div
													className="text-[16px] mt-1"
													data-id={member.id}
													onClick={
														!deleteState
															? undefined
															: e => {
																	console.log(e.target)
																	// 회원 삭제 API
																	// 1. Local-only fields를 이용해서 선택한 아이템의 isCheck 상태를 관리중한다.
																	// 2. isCheck 상태에 따라 bg 컬러와 check-circle를 표시한다.
															  }
													}>
													<div className="flex justify-between px-3 py-3 border rounded-3xl">
														<div className="flex">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className={`w-6 h-6 ${
																	member.gender === 'male'
																		? 'text-blue-300'
																		: 'text-pink-300'
																}`}
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor">
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={1.5}
																	d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
																/>
															</svg>
															<Link
																href={`/trainer/manage-member/${
																	// ! TypeError: Cannot read property 'split' of undefined
																	member.email.split('@')[0]
																}/info`}>
																<div className="ml-2 hover:cursor-pointer font-thin">
																	{member.name} 회원님
																</div>
															</Link>
														</div>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="w-6 h-6"
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
													</div>
												</div>
											</React.Fragment>
										)
									})}
								</div>
							</React.Fragment>
						)
					})}
				</div>
				{isSearchMemberModalOpen ? (
					<SearchMemberModal addMemberModalHandler={addMemberModalHandler} searchMemberModalHandler={SearchMemberModalHandler} />
				) : null}
				{isAddMemberModalOpen ? (
					<AddMemberModal addMemberModalHandler={addMemberModalHandler} searchMemberModalHandler={SearchMemberModalHandler} />
				) : null}
			</Layout>
		</>
	)
}

export default ManageMember
