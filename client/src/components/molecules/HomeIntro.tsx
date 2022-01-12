interface HomeIntroProps {
	userName: string
	monthAccountsData: number
}

const HomeIntro = ({ userName, monthAccountsData }: HomeIntroProps) => {
	return (
		<>
			<div className="font-bold text-[2.4rem] mt-[2.4rem]">
				<p>{`안녕하세요. ${userName} 선생님!`}</p>
				<p className="mt-[1.6rem]">이번 달 정산 금액은</p>
				<p>{`${monthAccountsData}원 입니다.`}</p>
			</div>
		</>
	)
}

export default HomeIntro
