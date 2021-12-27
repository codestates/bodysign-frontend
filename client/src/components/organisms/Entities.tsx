import React from 'react'

interface EntitiesProps {
	idx: number
	userCategory: string
	children?: React.ReactNode
}

const Entities = ({ idx, userCategory, children }: EntitiesProps) => {
	return (
		<React.Fragment key={idx}>
			<div className="mt-[2.4rem]">
				<h2 className="text-[1.8rem] font-semibold">{userCategory}</h2>
				{children}
			</div>
		</React.Fragment>
	)
}

export default Entities
