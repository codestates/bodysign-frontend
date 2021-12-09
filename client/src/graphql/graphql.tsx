import { gql } from '@apollo/client'

export const TrainerDocument = gql`
	query Trainer($id: Int!) {
		trainer(id: $id) {
			__typename
			id
			email
			phoneNumber
			gender
			userCategories {
				id
				name
				trainerId
			}
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
					userId
				}
				userCategoryId
			}
		}
	}
`

export const CreateTrainerDocument = gql`
	mutation CreateTrainer($createTrainerInput: CreateTrainerInput!) {
		createTrainer(createTrainerInput: $createTrainerInput) {
			email
			userName
			password
			phoneNumber
			gender
			loginType
		}
	}
`

export const CreateUserDocument = gql`
	mutation CreateUser($createUserInput: CreateUserInput!) {
		createUser(createUserInput: $createUserInput) {
			email
			userName
			password
			phoneNumber
			gender
			loginType
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
			name
			trainerId
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
			status
			trainerId
		}
	}
`
