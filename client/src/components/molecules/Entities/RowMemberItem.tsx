import React from 'react'

interface RowMemberItemProps {
	memberId: number
	children: React.ReactNode
}

const RowMemberItem = ({ memberId, children }: RowMemberItemProps) => {
	return (
		<React.Fragment key={memberId}>
			<div className="h-[7rem] flex justify-between pt-[1.2rem] pb-[2rem] px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white">
				{children}
			</div>
		</React.Fragment>
	)
}

export default RowMemberItem
