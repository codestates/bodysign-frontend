import { Inbody } from '../../generated/graphql'

interface MemberHomeIntroProps {
	userName: string
	inbodies: Inbody[] | undefined
}

const MemberHomeIntro = ({ userName, inbodies }: MemberHomeIntroProps) => {
	let isFirst = true
	let measuredDate
	let changedBodyWeight

	if (inbodies) {
		if (inbodies.length > 1) isFirst = false
		measuredDate = inbodies[0].measuredDate
			.split('T')[0]
			.replace(/\-/g, '/')
		changedBodyWeight = isFirst
			? inbodies[0].bodyWeight
			: inbodies[1].bodyWeight - inbodies[0].bodyWeight
	}

	return (
		<>
			<div className="font-bold text-[2.4rem] mt-[2.4rem] font-IBM">
				<p>{`안녕하세요. ${userName} 회원님!`}</p>
				<div className="mt-[1.6rem]">
					{isFirst ? (
						<>
							<p className="text-[1.6rem] text-[#9F9F9F]">
								{measuredDate} 측정 기준
							</p>
							<p>체중은 {changedBodyWeight}kg 입니다.</p>
						</>
					) : (
						<>
							<p className="text-[1.6rem] text-[#9F9F9F]">
								{measuredDate} 측정 기준
							</p>
							<p>체중이 {changedBodyWeight}kg 변화했어요.</p>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default MemberHomeIntro
