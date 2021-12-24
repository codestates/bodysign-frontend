import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import BottomBar from '../../../components/BottomBar'
import Layout from '../../../components/Layout'

const Menu: NextPage = () => {
	return (
		<>
			<Layout>
				<div className="flex items-center justify-between">
					<span className="flex text-[3.2rem]">
						<div className="font-bold">전체</div>
					</span>
				</div>

				<div className="mt-[2.4rem] text-[2rem]">
					<Link href="/user/menu/info" passHref>
						<div className="flex items-center justify-between cursor-pointer">
							<li className="text-[#9F9F9F] list-none">내 정보</li>
							<svg
								viewBox="0 0 15 15"
								className="text-[#9F9F9F]"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="35"
								height="35">
								<path
									d="M6.5 10.5l3-3-3-3"
									stroke="currentColor"
									strokeLinecap="square"></path>
							</svg>
						</div>
					</Link>
					<Link href="/user/menu/inbody" passHref>
						<div className="flex items-center justify-between mt-[2.4rem] cursor-pointer">
							<li className="text-[#9F9F9F] list-none">인바디</li>
							<svg
								viewBox="0 0 15 15"
								className="text-[#9F9F9F]"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								width="35"
								height="35">
								<path
									d="M6.5 10.5l3-3-3-3"
									stroke="currentColor"
									strokeLinecap="square"></path>
							</svg>
						</div>
					</Link>
				</div>
			</Layout>
			<BottomBar variant="User" />
		</>
	)
}

export default Menu
