import type { User } from '../../types'
import {
  SET_USER,
  SET_JWT,
  UPDATE_USER_EMAIL,
  UPDATE_USER_INFO,
} from '../constants'

type UserReducerType = {
  user: User
  jwt?: string
}

const initialState: UserReducerType = {
  user: {} as User,
  jwt: '',
}

export const userReducer = (
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; payload: any },
): UserReducerType => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case SET_JWT:
      return {
        ...state,
        jwt: action.payload,
      }
    case UPDATE_USER_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload, // Atualiza apenas o email
        },
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          // Atualiza apenas as propriedades que foram passadas
          ...(action.payload.name && { name: action.payload.name }),
          ...(action.payload.document && { document: action.payload.document }),
          ...(action.payload.phone && { phone: action.payload.phone }),
        },
      }
    default:
      return state
  }
}
