import AddItemIcon from '../../atoms/icons/AddItemIcon'

interface AddItemProps {
	dataCheckModal: string
	handleModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddItem = ({ dataCheckModal, handleModal }: AddItemProps) => {
	return (
		<div className="flex justify-center text-[1.8rem] mt-[0.8rem] py-[2rem] bg-white rounded-full shadow-md border">
			<AddItemIcon
				dataCheckModal={dataCheckModal}
				handleModal={handleModal}
			/>
		</div>
	)
}

export default AddItem
