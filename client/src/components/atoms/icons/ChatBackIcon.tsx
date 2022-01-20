const ChatBackIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="self-center w-6 h-6 cursor-pointer"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			// onClick={() => {
			// 	socket.emit('leaveRoom', `${chatTargetUserId}|${userData?.id}`)
			// 	chatTargetUserIdVar(null)
			// }}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M15 19l-7-7 7-7"
			/>
		</svg>
	)
}

export default ChatBackIcon
