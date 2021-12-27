interface AddCategoryIconProps {
	handleModal: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void
}

const AddCategoryIcon = ({ handleModal }: AddCategoryIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="cursor-pointer w-[2.8rem] h-[2.8rem]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			data-check-modal="addcategory"
			onClick={e => {
				handleModal(e)
			}}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	)
}

export default AddCategoryIcon
