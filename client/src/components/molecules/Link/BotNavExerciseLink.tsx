import Link from 'next/link'
import React from 'react'
import LinkProps from '../../../types/LinkProps'
import BotNavExerciseIcon from '../../atoms/icons/BotNavExerciseIcon'

const BotNavExerciseLink = ({ pathName }: LinkProps) => {
	const href = '/trainer/exercise'
	return (
		<Link href={href}>
			<span
				className={`flex flex-col items-center cursor-pointer ${
					pathName.includes(href) ? 'text-black' : ''
				}`}>
				<BotNavExerciseIcon />
				<p className="mt-[0.4rem]">운동</p>
			</span>
		</Link>
	)
}

export default BotNavExerciseLink
