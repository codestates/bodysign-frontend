import Logo from '../../atoms/Logo'

interface HomeLogoHeaderProps {}

const HomeLogoHeader = ({}: HomeLogoHeaderProps) => {
	return (
		<>
			<div className="flex text-[3.2rem] font-IBM">
				<Logo />
				<span className="ml-[0.8rem] text-[#FDAD00] font-bold">
					Bodysign
				</span>
			</div>
		</>
	)
}

export default HomeLogoHeader
