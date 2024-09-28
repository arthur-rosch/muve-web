import type { User } from '../../types'
import {
  SET_JWT,
  SET_USER,
  UPDATE_INFO_FIRST_ACCESS,
  UPDATE_USER_EMAIL,
  UPDATE_USER_INFO,
} from '../constants'

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

export function updateUserEmail(newEmail: string) {
  return {
    type: UPDATE_USER_EMAIL,
    payload: newEmail,
  }
}

export function updateUserInfo({
  name,
  document,
  phone,
}: {
  name?: string
  document?: string
  phone?: string
}) {
  return {
    type: UPDATE_USER_INFO,
    payload: { name, document, phone },
  }
}

export function updateInfoFirstAccess({
  accountType,
  memberArea,
  videoHosting,
}: {
  accountType: string
  memberArea: string
  videoHosting: string
}) {
  return {
    type: UPDATE_INFO_FIRST_ACCESS,
    payload: { accountType, memberArea, videoHosting },
  }
}
