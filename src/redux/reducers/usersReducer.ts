import { Role, type User } from '../../types'

const initialState: UserReducerType = {
  user: {} as User, 
  jwt: '', 
};


import {
  SET_USER,
  SET_JWT,
  UPDATE_USER_EMAIL,
  UPDATE_USER_INFO,
  UPDATE_INFO_FIRST_ACCESS,
} from '../constants'

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetJwtAction {
  type: typeof SET_JWT;
  payload: string;
}

interface UpdateUserEmailAction {
  type: typeof UPDATE_USER_EMAIL;
  payload: string;
}

interface UpdateUserInfoAction {
  type: typeof UPDATE_USER_INFO;
  payload: Partial<Pick<User, 'name' | 'document' | 'phone'>>;
}

interface UpdateInfoFirstAccessAction {
  type: typeof UPDATE_INFO_FIRST_ACCESS;
  payload: Partial<Pick<User, 'accountType' | 'memberArea' | 'videoHosting'>>;
}

export type UserActionTypes =
  | SetUserAction
  | SetJwtAction
  | UpdateUserEmailAction
  | UpdateUserInfoAction
  | UpdateInfoFirstAccessAction;


export type UserReducerType = {
  user: User
  jwt?: string
}

export const userReducer = (
  state = initialState,
  action: UserActionTypes,
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

    case UPDATE_INFO_FIRST_ACCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...(action.payload.accountType && {
            accountType: action.payload.accountType,
          }),
          ...(action.payload.memberArea && {
            memberArea: action.payload.memberArea,
          }),
          ...(action.payload.videoHosting && {
            videoHosting: action.payload.videoHosting,
          }),
        },
      }
    default:
      return state
  }
}
