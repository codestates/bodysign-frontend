import React from 'react'

interface RowMemberItemProps {
	member: any
	deleteLists: Set<number>
	handleManagedMember: (
		member: any,
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => void
	children: React.ReactNode
}

const RowMemberItem = ({
	member,
	deleteLists,
	handleManagedMember,
	children
}: RowMemberItemProps) => {
	return (
		<React.Fragment key={member.id}>
			<div
				className={`${
					member.id === deleteLists.keys().next().value
						? 'ring-2 ring-[#FED06E]'
						: ''
				} h-[7rem] flex justify-between pt-[1.2rem] pb-[2rem] px-[2rem] mt-[0.8rem] border text-[1.8rem] rounded-full shadow-md bg-white hover:ring-2 hover:ring-[#FED06E]`}
				data-id={member.id}
				onClick={e => {
					handleManagedMember(member, e)
				}}>
				{children}
			</div>
		</React.Fragment>
	)
}

export default RowMemberItem
