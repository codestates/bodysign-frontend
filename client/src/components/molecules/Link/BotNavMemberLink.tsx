import Link from 'next/link'
import React from 'react'
import LinkProps from '../../../types/LinkProps'
import BotNavMemberIcon from '../../atoms/icons/BotNavMemberIcon'

const BotNavMemberLink = ({ pathName }: LinkProps) => {
	const href = '/trainer/manage-member'
	return (
		<Link href={href}>
			<span
				className={`flex flex-col items-center cursor-pointer ${
					pathName.includes(href) ? 'text-black' : ''
				}`}>
				<BotNavMemberIcon />
				<p className="mt-[0.4rem]">회원</p>
			</span>
		</Link>
	)
}

export default BotNavMemberLink
