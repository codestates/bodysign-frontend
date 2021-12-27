import React from 'react'

interface ColMemberGroupProps {
	children: React.ReactNode
}

const ColMemberGroup = ({ children }: ColMemberGroupProps) => {
	return (
		<div className="flex flex-col h-[0.4rem] ml-[1.2rem]">{children}</div>
	)
}

export default ColMemberGroup
