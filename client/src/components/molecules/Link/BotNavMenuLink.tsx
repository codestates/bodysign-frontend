import Link from 'next/link'
import React from 'react'
import LinkProps from '../../../types/LinkProps'
import BotNavIcon from '../../atoms/icons/BotNavIcon'

const BotNavMenuLink = ({ variant, pathName }: LinkProps) => {
	let href = ''
	if (variant === 'Trainer') {
		href = '/trainer/menu'
	} else if (variant === 'Member') {
		href = '/user/menu'
	}

	return (
		<Link href={href}>
			<span
				className={`flex flex-col items-center cursor-pointer ${
					pathName.includes(href) ? 'text-black' : ''
				}`}>
				<BotNavIcon />
				<p className="mt-[0.4rem]">메뉴</p>
			</span>
		</Link>
	)
}

export default BotNavMenuLink
