import Link from 'next/link'
import React from 'react'
import ChatIcon from '../../atoms/icons/ChatIcon'

const ChatLink = () => {
	return (
		<Link href={`/trainer/manage-member/chat`} passHref>
			<ChatIcon />
		</Link>
	)
}

export default ChatLink
