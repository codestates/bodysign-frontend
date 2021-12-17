import { gql } from '@apollo/client'

export const UserDocument = gql`
	query User($id: Int!) {
		user(id: $id) {
			__typename
			id
			email
			userName
			birthDate
			phoneNumber
			gender
			graduate
			trainerId
			sessions {
				id
				userId
				date
				trainerId
				feedback
				sessionExercises {
					id
					name
					reps
					sets
					weight
					sessionId
				}
			}
			inbodies {
				id
				bodyWeight
				muscleWeight
				bodyFat
				measuredDate
			}
			sessionHistories {
				id
				date
				costPerSession
				totalCount
				usedCount
				commission
				userId
			}
			userCategoryId
		}
	}
`

export const TrainerDocument = gql`
	query Trainer($id: Int!) {
		trainer(id: $id) {
			id
			email
			userName
			birthDate
			phoneNumber
			gender
			users {
				id
				email
				userName
				birthDate
				phoneNumber
				gender
				graduate
				sessionHistories {
					id
					date
					costPerSession
					totalCount
					usedCount
					commission
					userId
					user {
						userName
					}
				}
				userCategoryId
			}
			sessions {
				id
				userId
				date
				trainerId
				feedback
				# user {
				# 	id
				# 	userName
				# 	gender
				# }
			}
			exerciseCategories {
				id
				name
				trainerId
				exercises {
					isChecked @client
					id
					name
					exerciseCategoryId
				}
			}
			userCategories {
				id
				name
				trainerId
			}
		}
	}
`

export const SessionHistoriesDocument = gql`
	query SessionHistories {
		sessionHistories {
			id
			date
			costPerSession
			totalCount
			usedCount
			commission
			userId
		}
	}
`

export const UserCategoriesDocument = gql`
	query UserCategories {
		userCategories {
			id
			name
			trainerId
		}
	}
`

export const UserCategoryDocument = gql`
	query UserCategory($id: Int!) {
		userCategory(id: $id) {
			id
			name
			trainerId
		}
	}
`

export const CreateUserDocument = gql`
	mutation CreateUser($createUserInput: CreateUserInput!) {
		createUser(createUserInput: $createUserInput) {
			id
			email
			userName
			birthDate
			phoneNumber
			gender
			graduate
		}
	}
`

export const UpdateUserDocument = gql`
	mutation UpdateUser($updateUserInput: UpdateUserInput!) {
		updateUser(updateUserInput: $updateUserInput) {
			id
			email
			userName
			birthDate
			phoneNumber
			gender
			graduate
			userCategoryId
		}
	}
`

export const CreateTrainerDocument = gql`
	mutation CreateTrainer($createTrainerInput: CreateTrainerInput!) {
		createTrainer(createTrainerInput: $createTrainerInput) {
			id
			email
			userName
			birthDate
			phoneNumber
			gender
		}
	}
`

export const UpdateTrainerDocument = gql`
	mutation UpdateTrainer($updateTrainerInput: UpdateTrainerInput!) {
		updateTrainer(updateTrainerInput: $updateTrainerInput) {
			id
			email
			userName
			birthDate
			phoneNumber
			gender
		}
	}
`

export const RemoveTrainerDocument = gql`
	mutation RemoveTrainer($id: Int!) {
		removeTrainer(id: $id) {
			id
			email
			userName
			birthDate
			phoneNumber
			gender
		}
	}
`

export const UpdateSessionDocument = gql`
	mutation UpdateSession($updateSessionInput: UpdateSessionInput!) {
		updateSession(updateSessionInput: $updateSessionInput) {
			id
			userId
			date
			trainerId
			feedback
		}
	}
`

export const RemoveSessionDocument = gql`
	mutation RemoveSession($id: Int!) {
		removeSession(id: $id) {
			id
			userId
			date
			trainerId
			feedback
		}
	}
`

export const CreateSessionExerciseDocument = gql`
	mutation CreateSessionExercise(
		$createSessionExerciseInput: CreateSessionExerciseInput!
	) {
		createSessionExercise(
			createSessionExerciseInput: $createSessionExerciseInput
		) {
			id
			name
			reps
			sets
			weight
			sessionId
		}
	}
`

export const UpdateSessionExerciseDocument = gql`
	mutation UpdateSessionExercise(
		$updateSessionExerciseInput: UpdateSessionExerciseInput!
	) {
		updateSessionExercise(
			updateSessionExerciseInput: $updateSessionExerciseInput
		) {
			id
			name
			reps
			sets
			weight
			sessionId
		}
	}
`

export const RemoveSessionExerciseDocument = gql`
	mutation RemoveSessionExercise($id: Int!) {
		removeSessionExercise(id: $id) {
			id
			name
			reps
			sets
			weight
			sessionId
		}
	}
`

export const CreateExerciseCategoryDocument = gql`
	mutation CreateExerciseCategory(
		$createExerciseCategoryInput: CreateExerciseCategoryInput!
	) {
		createExerciseCategory(
			createExerciseCategoryInput: $createExerciseCategoryInput
		) {
			id
			name
			trainerId
		}
	}
`

export const CreateExerciseDocument = gql`
	mutation CreateExercise($createExerciseInput: CreateExerciseInput!) {
		createExercise(createExerciseInput: $createExerciseInput) {
			id
			name
			exerciseCategoryId
		}
	}
`

export const RemoveExerciseDocument = gql`
	mutation RemoveExercise($id: Int!) {
		removeExercise(id: $id) {
			id
			name
			exerciseCategoryId
		}
	}
`

export const CreateNonRegisteredUserDocument = gql`
	mutation CreateNonRegisteredUser(
		$createNonRegisteredUserInput: CreateNonRegisteredUserInput!
	) {
		createNonRegisteredUser(
			createNonRegisteredUserInput: $createNonRegisteredUserInput
		) {
			id
			userName
			phoneNumber
			gender
			trainerId
		}
	}
`

export const CreateInbodyDocument = gql`
	mutation CreateTrainer($createInbodyInput: CreateInbodyInput!) {
		createInbody(createInbodyInput: $createInbodyInput) {
			id
			bodyWeight
			muscleWeight
			bodyFat
			measuredDate
			userId
		}
	}
`

export const CreateSessionHistoryDocument = gql`
	mutation CreateSessionHistory(
		$createSessionHistoryInput: CreateSessionHistoryInput!
	) {
		createSessionHistory(
			createSessionHistoryInput: $createSessionHistoryInput
		) {
			id
			date
			costPerSession
			totalCount
			usedCount
			commission
			usedCount
			userId
		}
	}
`

export const CreateUserCategoryDocument = gql`
	mutation CreateUserCategory(
		$createUserCategoryInput: CreateUserCategoryInput!
	) {
		createUserCategory(createUserCategoryInput: $createUserCategoryInput) {
			id
			status
			trainerId
		}
	}
`
