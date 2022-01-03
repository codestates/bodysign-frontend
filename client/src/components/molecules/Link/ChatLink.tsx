import Link from 'next/link'
import React from 'react'
import { chatTargetUserIdVar } from '../../../graphql/vars'
import ChatIcon from '../../atoms/icons/ChatIcon'

interface ChatLinkProps {
	memberId: number
}

const ChatLink = ({ memberId }: ChatLinkProps) => {
	return (
		<Link href={`/trainer/manage-member/chat`} passHref>
			<span onClick={() => chatTargetUserIdVar(memberId)}>
				<ChatIcon />
			</span>
		</Link>
	)
}

export default ChatLink
