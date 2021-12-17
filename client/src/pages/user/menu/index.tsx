import React, { useState } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import Layout from '../../../components/Layout'

const Menu: NextPage = () => {

	return (
		<Layout variant="Web">
			<div className="font-IBM flex flex-col m-5 mx-4 my-5 text-[15px]">
				<div className="font-IBM font-bold mb-5 text-[25px]">전체</div>
				<Link href="/user/menu/info">
				<div
					className="flex items-center justify-between hover:bg-gray-100 font-IBM">
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
							stroke-linecap="square"></path>
					</svg>
				</div>
				</Link>
				<Link href="/user/menu/inbody">
				<div
					className="flex items-center justify-between hover:bg-gray-100 font-IBM">
					<li className="m-1 text-gray-400 list-none">인바디</li>
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
							stroke-linecap="square"></path>
					</svg>
				</div>
				</Link>
			</div>
		</Layout>
	)
}

export default Menu
