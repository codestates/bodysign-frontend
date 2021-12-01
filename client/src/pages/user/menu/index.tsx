import React, { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../../../components/Layout'

const Menu: NextPage = () => {
	const moveMypage = () => {
		// 내 정보로 이동
	}

	const moveInbody = () => {
		// 인바디로 이동
	}

	return (
		<Layout variant="Web">
			<div className="flex flex-col m-5 mx-4 my-5 text-[12px]">
				<div className="font-bold mb-5 text-[20px]">전체</div>
				<div
					onClick={moveMypage}
					className="flex items-center justify-between hover:bg-gray-100">
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
				<div
					onClick={moveInbody}
					className="flex items-center justify-between hover:bg-gray-100">
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
			</div>
		</Layout>
	)
}

export default Menu
