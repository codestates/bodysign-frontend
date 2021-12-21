import { makeVar } from '@apollo/client'

interface UserData {
	birthDate: Date
	createdAt: Date
	email: string
	gender: string
	id: number
	loginType: string
	phoneNumber: null
	status: string
	updatedAt: Date
	userName: string
}

export const loginTypeVar = makeVar('local')
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
export const accessTokenVar = makeVar('token')
export const userDataVar = makeVar<UserData | null>(null)
