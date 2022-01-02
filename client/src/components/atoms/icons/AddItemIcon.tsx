interface AddItemIconProps {
	dataCheckModal: string
	handleModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddItemIcon = ({
	dataCheckModal,
	handleModal
}: AddItemIconProps) => {
	return (
		<div
			data-check-modal={dataCheckModal}
			onClick={e => {
				handleModal(e)
			}}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-[2.8rem] h-[2.8rem] text-[#9F9F9F] pointer-events-none"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 4v16m8-8H4"
				/>
			</svg>
		</div>
	)
}

export default AddItemIcon
