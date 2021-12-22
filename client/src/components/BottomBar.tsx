import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

type WeborApp = 'Trainer' | 'User'
interface BottomBarProps {
	variant: WeborApp
}

const BottomBar = ({ variant = 'Trainer' }: BottomBarProps) => {
	const router = useRouter()
	const path = router.pathname

	return variant === 'Trainer' ? (
		<div className="sticky bottom-0 flex justify-between px-8 py-2 text-gray-400 border-t bg-gray-50 sm:w-[450px] m-auto">
			<Link href="/trainer" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path === '/trainer' ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22">
						<path
							d="M7.825.12a.5.5 0 00-.65 0L0 6.27v7.23A1.5 1.5 0 001.5 15h4a.5.5 0 00.5-.5v-3a1.5 1.5 0 013 0v3a.5.5 0 00.5.5h4a1.5 1.5 0 001.5-1.5V6.27L7.825.12z"
							fill="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">홈</div>
				</span>
			</Link>
			<Link href="/trainer/manage-member" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path.includes('/trainer/manage-member') ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22">
						<path
							d="M5.5 0a3.499 3.499 0 100 6.996A3.499 3.499 0 105.5 0zm-2 8.994a3.5 3.5 0 00-3.5 3.5v2.497h11v-2.497a3.5 3.5 0 00-3.5-3.5h-4zm9 1.006H12v5h3v-2.5a2.5 2.5 0 00-2.5-2.5z"
							fill="currentColor"></path>
						<path
							d="M11.5 4a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
							fill="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">회원</div>
				</span>
			</Link>
			<Link href="/trainer/exercise" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path.includes('/trainer/exercise') ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22">
						<path
							d="M4 14.5h7m-3.5 0v-5m0 0a4 4 0 004-4v-4a1 1 0 00-1-1h-6a1 1 0 00-1 1v4a4 4 0 004 4zm-4-7h-1a2 2 0 100 4h1m8-4h1a2 2 0 110 4h-1"
							stroke="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">운동</div>
				</span>
			</Link>
			<Link href="/trainer/session" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path.includes('/trainer/session') ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22">
						<path
							d="M3.5 0v5m8-5v5m-10-2.5h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
							stroke="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">수업</div>
				</span>
			</Link>
			<Link href="/trainer/menu" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path.includes('/trainer/menu') ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M15 2H0V1h15v1zm0 4H0V5h15v1zm0 4H0V9h15v1zm0 4H0v-1h15v1z"
							fill="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">전체</div>
				</span>
			</Link>
		</div>
	) : (
		<div className="sticky bottom-0 flex justify-between px-8 py-2 text-gray-400 border-t bg-gray-50">
			<Link href="/user" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path === '/user' ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18">
						<path
							d="M7.825.12a.5.5 0 00-.65 0L0 6.27v7.23A1.5 1.5 0 001.5 15h4a.5.5 0 00.5-.5v-3a1.5 1.5 0 013 0v3a.5.5 0 00.5.5h4a1.5 1.5 0 001.5-1.5V6.27L7.825.12z"
							fill="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">홈</div>
				</span>
			</Link>
			<Link href="/user/session" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path.includes('session') ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18">
						<path
							d="M3.5 0v5m8-5v5m-10-2.5h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
							stroke="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">수업</div>
				</span>
			</Link>
			<Link href="/user/chat" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path.includes('chat') ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18">
						<path
							d="M11.5 13.5l.157-.475-.218-.072-.197.119.258.428zm2-2l-.421-.27-.129.202.076.226.474-.158zm1 2.99l-.157.476a.5.5 0 00.631-.634l-.474.159zm-3.258-1.418c-.956.575-2.485.919-3.742.919v1c1.385 0 3.106-.37 4.258-1.063l-.516-.856zM7.5 13.99c-3.59 0-6.5-2.909-6.5-6.496H0a7.498 7.498 0 007.5 7.496v-1zM1 7.495A6.498 6.498 0 017.5 1V0A7.498 7.498 0 000 7.495h1zM7.5 1C11.09 1 14 3.908 14 7.495h1A7.498 7.498 0 007.5 0v1zM14 7.495c0 1.331-.296 2.758-.921 3.735l.842.54C14.686 10.575 15 8.937 15 7.495h-1zm-2.657 6.48l3 .99.314-.949-3-.99-.314.949zm3.631.357l-1-2.99-.948.316 1 2.991.948-.317z"
							fill="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">채팅</div>
				</span>
			</Link>

			<Link href="/user/menu" passHref>
				<span
					className={`flex flex-col items-center cursor-pointer ${
						path.includes('menu') ? 'text-black' : ''
					}`}>
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M15 2H0V1h15v1zm0 4H0V5h15v1zm0 4H0V9h15v1zm0 4H0v-1h15v1z"
							fill="currentColor"></path>
					</svg>
					<div className="mt-[0.4rem]">전체</div>
				</span>
			</Link>
		</div>
	)
}

export default BottomBar
