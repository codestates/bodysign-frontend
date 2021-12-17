import { makeVar } from '@apollo/client'

export const loginTypeVar = makeVar('local')
export const modalVar = makeVar(false)
export const selectedUserVar = makeVar({
	userId: 0,
	userName: '',
	gender: ''
})
export const managedUserIdrVar = makeVar('')
export const deleteStateVar = makeVar(false)
