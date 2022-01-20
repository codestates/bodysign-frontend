interface DCheckIconProps {
	handleDelete: () => void
}

const CheckIcon = ({ handleDelete }: DCheckIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="cursor-pointer w-[3.6rem] h-[3.6rem] text-[#FED06E]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			onClick={() => handleDelete()}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M5 13l4 4L19 7"
			/>
		</svg>
	)
}

export default CheckIcon
