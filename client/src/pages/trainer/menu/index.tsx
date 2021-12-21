import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BottomBar from '../../../components/BottomBar'
import Layout from '../../../components/Layout'

const Menu: NextPage = () => {
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[20px]">
						<div className="font-bold">전체</div>
					</span>
				</div>

				<div className="mt-4">
					<Link
						href="/trainer/menu/info"
						passHref
					>
						<div className="flex justify-between cursor-pointer hover:bg-gray-100 items-center">
							<li className="m-1 text-gray-400 list-none">내 정보</li>
							<svg
								className="m-2 text-gray-400"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="15"
								height="15">
								<path
									d="M6.5 10.5l3-3-3-3"
									stroke="currentColor"
									strokeLinecap="square"></path>
							</svg>
						</div>
					</Link>
					<Link
						href="/trainer/menu/sales"
						passHref
					>
						<div className="flex justify-between mt-1 cursor-pointer hover:bg-gray-100 items-center">
							<li className="m-1 text-gray-400 list-none">매출 조회</li>
							<svg
								className="m-2 text-gray-400"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="15"
								height="15">
								<path
									d="M6.5 10.5l3-3-3-3"
									stroke="currentColor"
									strokeLinecap="square"></path>
							</svg>
						</div>
					</Link>
					<Link
						href="/trainer/menu/ledger"
						passHref
					>
						<div className="flex justify-between mt-1 cursor-pointer hover:bg-gray-100 items-center">
							<li className="m-1 text-gray-400 list-none">수업료 정산</li>
							<svg
								className="m-2 text-gray-400"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="15"
								height="15">
								<path
									d="M6.5 10.5l3-3-3-3"
									stroke="currentColor"
									strokeLinecap="square"></path>
							</svg>
						</div>
					</Link>
				</div>
				<BottomBar variant="Trainer" />
			</Layout>
		</>
	)
}

export default Menu
