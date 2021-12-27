import Link from 'next/link'
import React from 'react'
import LinkProps from '../../../types/LinkProps'
import BotNavChatIcon from '../../atoms/icons/BotNavChatIcon'

const BotNavChatLink = ({ pathName }: LinkProps) => {
	const href = '/user/chat'
	return (
		<Link href={href}>
			<span
				className={`flex flex-col items-center cursor-pointer ${
					pathName.includes(href) ? 'text-black' : ''
				}`}>
				<BotNavChatIcon />
				<p className="mt-[0.4rem]">채팅</p>
			</span>
		</Link>
	)
}

export default BotNavChatLink
