import { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'

const Menu: NextPage = () => {
	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col justify-center mx-4 my-5">
					<div className="flex items-center justify-between">
						<span className="flex text-[20px]">
							<div className="font-semibold">전체</div>
						</span>
					</div>

					<div className="mt-4">
						<div className="flex flex-col justify-between px-3 py-3 border">
							<Link href="/trainer/menu/info">
								<div className="flex justify-between cursor-pointer">
									<span>내 정보</span>
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
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</Link>
							<Link href="/trainer/menu/sales">
								<div className="flex justify-between mt-1 cursor-pointer">
									<span>매출 조회</span>
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
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</Link>
							<Link href="/trainer/menu/ledger">
								<div className="flex justify-between mt-1 cursor-pointer">
									<span>수업료 정산</span>
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
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Menu
