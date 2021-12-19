import { makeVar } from '@apollo/client'

export const loginTypeVar = makeVar('local')
export const modalVar = makeVar(false)
export const selectedUserVar = makeVar('')
export const managedUserInfoVar = makeVar({
	userId: 0,
	email: '',
	userName: '',
	gender: ''
})
export const sessionExerciseInputVar = makeVar({
	name: '',
	sessionId: 0,
	sessionExerciseId: 0
})
export const accessTokenVar = makeVar('token')
