import { gql } from '@apollo/client'

export const UserDocument = gql`
	query User($id: Int!) {
		user(id: $id) {
			id
			email
			userName
			birthDate
			phoneNumber
			gender
			graduate
			trainerId
			userCategoryId
			sessions {
				id
				userId
				trainerId
				feedback
				sentFeedback
				date
				sessionExercises {
					id
					name
					sessionId
					sessionExerciseVolumes {
						reps
						sets
						weight
					}
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
		}
	}
`
