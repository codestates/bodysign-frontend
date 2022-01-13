import { makeVar } from '@apollo/client'
import UserData from '../types/userData'

export const modalVar = makeVar(false)
export const accessTokenVar = makeVar<string | undefined>(undefined)
export const refreshTokenVar = makeVar<string | undefined>(undefined)
export const loginTypeVar = makeVar('local')
export const userDataVar = makeVar<UserData | null>(null)
