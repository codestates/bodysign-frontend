import { makeVar } from '@apollo/client'

interface UserData {
	id: number
	email: string
	userName: string
	userCategoryId: null
	birthDate: Date
	phoneNumber: null
	gender: string
	graduate: boolean
	trainerId: number
	loginType: string
	status: string
	createdAt: Date
	updatedAt: Date
}

export const loginTypeVar = makeVar('')
export const modalVar = makeVar(false)
export const deleteStateVar = makeVar(false)
export const selectedUserVar = makeVar('')
export const managedUserInfoVar = makeVar({
	userId: 0,
	email: '',
	userName: '',
	gender: ''
})
export const sessionExerciseInputVar = makeVar({
	exerciseName: '',
	sessionId: 0,
	sessionExerciseId: 0
})
export const chatTargetUserIdVar = makeVar<number | null>(null)
export const userDataVar = makeVar<UserData | null>(null)
export const accessTokenVar = makeVar('')
export const refreshTokenVar = makeVar('')