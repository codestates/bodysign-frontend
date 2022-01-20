interface AddMemberIconProps {
	handleModal: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}

const AddMemberIcon = ({ handleModal }: AddMemberIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="cursor-pointer w-[2.8rem] h-[2.8rem]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			data-check-modal="addmember"
			onClick={e => {
				handleModal(e)
			}}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
			/>
		</svg>
	)
}

export default AddMemberIcon
