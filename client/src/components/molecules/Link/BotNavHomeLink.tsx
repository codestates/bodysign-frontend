import Link from 'next/link'
import React from 'react'
import LinkProps from '../../../types/LinkProps'
import BotNavHomeIcon from '../../atoms/icons/BotNavHomeIcon'

const BotNavHomeLink = ({ variant, pathName }: LinkProps) => {
	let href = ''
	if (variant === 'Trainer') {
		href = '/trainer'
	} else if (variant === 'Member') {
		href = '/user'
	}

	let textColor = ''
	if (href === '/trainer' && href === pathName) {
		textColor = 'text-black'
	} else if (href === '/user' && href === pathName) {
		textColor = 'text-black'
	}

	return (
		<Link href={href}>
			<span
				className={`flex flex-col items-center cursor-pointer ${textColor}`}>
				<BotNavHomeIcon />
				<p className="mt-[0.4rem]">홈</p>
			</span>
		</Link>
	)
}

export default BotNavHomeLink
