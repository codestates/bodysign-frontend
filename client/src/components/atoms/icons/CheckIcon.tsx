const CheckIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="cursor-pointer w-[2.8rem] h-[2.8rem]"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			onClick={async () => {
				// 운동 삭제 step 2
				const deleteItemId = Array.from(deleteLists)[0]
				if (deleteItemId) {
					try {
						await removeExercise({
							variables: {
								id: deleteItemId
							},
							refetchQueries: [
								{
									query: TrainerDocument,
									variables: { id: userData?.id }
								}
							]
						})
						deleteLists.clear()
					} catch (error) {
						console.log(error)
					}
				}
				setReadyDelete(false)
			}}>
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
