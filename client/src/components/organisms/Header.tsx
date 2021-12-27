interface HeaderProps {
	category: string
	children?: React.ReactNode
	handleSetCategory: (category: string) => void
}

const Header = ({
	category,
	children,
	handleSetCategory
}: HeaderProps) => {
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="flex text-[3.2rem]">
					<h1
						className={`text-[3.2rem] ${
							category === '관리중' ? 'font-bold' : 'text-[#9F9F9F]'
						} cursor-pointer`}
						onClick={() => handleSetCategory('관리중')}>
						관리중
					</h1>
					<h1
						className={`text-[3.2rem] ml-[0.8rem] ${
							category === '졸업' ? 'font-bold' : 'text-[#9F9F9F]'
						} cursor-pointer`}
						onClick={() => handleSetCategory('졸업')}>
						졸업
					</h1>
				</span>
				<span className="flex gap-x-[0.8rem]">{children}</span>
			</div>
		</>
	)
}

export default Header
