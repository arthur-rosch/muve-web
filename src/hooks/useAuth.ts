import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { setUser } from '../redux/actions/user'

import { Local } from '../services/Local'
import type { SignInVariables, SignUpVariables } from '../types'
import { AuthService } from '../services/AuthService'

export const useAuth = () => {
  const dispatch = useDispatch()

  const signIn = useCallback(
    async (variables: SignInVariables) => {
      console.log(variables)
      const response = await AuthService.signIn(variables)

      if (response.success) {
        dispatch(setUser(response.data.user))
        await Local.setJWT(response.data.token)
        return { success: true, Message: 'Usuário fez login com sucesso!' }
      }
      return { success: false, Erro: response.error }
    },
    [dispatch],
  )

  const signUp = useCallback(async (variables: SignUpVariables) => {
    const response = await AuthService.signUp(variables)

    if (response.success) {
      return { success: true, Message: 'Usuário cadastrado com sucesso!' }
    }
    return { success: false, Erro: response.error }
  }, [])

  const checkEmailExistence = useMutation(
    async ({ email }: { email: string }) => {
      const response = await AuthService.checkEmailExistence(email)
      if (response.success) {
        return { success: true }
      }
      return { success: false, Erro: response.error }
    },
  )

  const checkJWT = useCallback(async () => {
    const response = await AuthService.checkJWT()

    if (response.success) {
      dispatch(setUser(response.data.user))
      return { success: true, data: response.data.user }
    }
    return { success: false }
  }, [])

  return {
    signIn,
    signUp,
    checkJWT,
    checkEmailExistence,
  }
}
