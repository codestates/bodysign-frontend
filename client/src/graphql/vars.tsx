import { makeVar } from '@apollo/client'
import UserData from '../types/userData'

export const loginTypeVar = makeVar('')
export const modalVar = makeVar(false)
export const deleteStateVar = makeVar(false)
export const selectedUserVar = makeVar('')
export const userDataVar = makeVar<UserData | null>(null)
export const accessTokenVar = makeVar('')
export const refreshTokenVar = makeVar('')
