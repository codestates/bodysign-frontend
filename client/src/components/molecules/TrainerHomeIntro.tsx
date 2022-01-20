interface TrainerHomeIntroProps {
	userName: string
	monthAccountsData: number
}

const TrainerHomeIntro = ({
	userName,
	monthAccountsData
}: TrainerHomeIntroProps) => {
	return (
		<>
			<div className="font-bold text-[2.4rem] mt-[2.4rem] font-IBM">
				<p>{`안녕하세요. ${userName} 선생님!`}</p>
				<p className="mt-[1.6rem]">이번 달 정산 금액은</p>
				<p>{`${monthAccountsData}원 입니다.`}</p>
			</div>
		</>
	)
}

export default TrainerHomeIntro
