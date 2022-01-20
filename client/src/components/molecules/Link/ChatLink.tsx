import Link from 'next/link'
import React from 'react'
import useSessionStorage from '../../../hooks/useSessionStorage'
import ChatIcon from '../../atoms/icons/ChatIcon'

interface ChatLinkProps {
	memberId: number
}

const ChatLink = ({ memberId }: ChatLinkProps) => {
	const [___, setChatTargetUserId] = useSessionStorage('chatTargetUserId')

	return (
		<Link href={`/trainer/manage-member/chat`} passHref>
			<span
				onClick={e => {
					e.stopPropagation()
					setChatTargetUserId(memberId)
				}}>
				<ChatIcon />
			</span>
		</Link>
	)
}

export default ChatLink
