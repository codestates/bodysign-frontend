import type { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import Layout from './Layout'

const Landing: NextPage = () => {

	return (
		<>
		<Layout>
			<div className="flex flex-col m-5 font-IBM font-thin">
				<div className="section1 bg-[#FED06E] p-5">
					<div className="font-bold text-[20px]">트레이너들이 기획한 업무관리 서비스</div>
					<div className="text-[20px]">수업일정 예약부터 기록까지 {<br/>} 회원과 함께 공유해요</div>
					<Image
						src="/../public/1-1.png"
						width="300"
						height="500"
						alt="image"
					/>
					<Image
						src="/../public/1-2.png"
						width="300"
						height="500"
						alt="image"
					/>
				</div>
				<div className="section2 mt-[10rem] p-5">
					<div className="font-bold text-[20px]">손쉬운 회원관리</div>
					<div className="text-[20px]">회원정보를 찾아보기 힘드신가요? {<br/>} 원하는대로 회원들을 정리하세요</div>
					<Image
						src="/../public/2-1.png"
						width="300"
						height="500"
						alt="image"
					/>
					<Image
						src="/../public/2-2.png"
						width="300"
						height="500"
						alt="image"
					/>
				</div>
				<div className="section3 mt-[10rem] bg-gray-100 p-5">
					<div className="font-bold text-[20px]">간단히 작성하고 공유하는 수업기록</div>
					<div className="text-[20px]">몇번의 클릭만으로 수업을 기록하고,{<br/>} 회원들과 함께 공유해요</div>
					<Image
						src="/../public/3-1.png"
						width="300"
						height="500"
						alt="image"
					/>
					<Image
						src="/../public/3-2.png"
						width="300"
						height="500"
						alt="image"
					/>
					<Image
						src="/../public/3-3.png"
						width="300"
						height="500"
						alt="image"
					/>
				</div>
				<div className="section4 mt-[10rem] p-5">
					<div className="font-bold text-[20px]">한 눈에 살펴보는 회원들의 식단기록</div>
					<div className="text-[20px]">사진을 눌러 어떤 대화를 나눴는지 {<br/>} 바로 확인해요</div>
					<Image
						src="/../public/4-1.png"
						width="300"
						height="500"
						alt="image"
					/>
					<Image
						src="/../public/4-2.png"
						width="300"
						height="500"
						alt="image"
					/>
				</div>
				<div className="footer mt-[5rem] bg-[#FED06E] flex items-center justify-between">
					<Image 
						src="/../public/logo3.svg"
						width="50"
						height="50"
					/>
					<div>© 2021 Bodysign. All rights reserved.</div>
				</div>
			</div>
		</Layout>
		</>

	)
}

export default Landing
