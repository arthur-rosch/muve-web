import type { User } from '../../types'
import { SET_JWT, SET_USER } from '../constants'

export function setUser(user: User) {
  return {
    type: SET_USER,
    payload: user,
  }
}

export function setJwt(jwt: string) {
  return {
    type: SET_JWT,
    payload: jwt,
  }
}
