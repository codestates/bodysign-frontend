const ChatIcon = () => {
	return (
		<svg
			className="w-[2.8rem] h-[2.8rem] mt-[0.4rem]"
			// data-id={member.id}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 25 25"
			stroke="currentColor"
			onClick={() => {
				// chatTargetUserIdVar(+member.id)
			}}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
			/>
		</svg>
	)
}

export default ChatIcon