import React from 'react'

interface EntitiesProps {
	key: number
	userCategory: string
	children?: React.ReactNode
}

const Entities = ({ key, userCategory, children }: EntitiesProps) => {
	return (
		<React.Fragment key={key}>
			<div className="mt-[2.4rem]">
				<h2 className="text-[1.8rem] font-semibold">{userCategory}</h2>
				{children}
			</div>
		</React.Fragment>
	)
}

export default Entities
