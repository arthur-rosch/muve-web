import { useMutation } from 'react-query'
import { ProfileService } from '../services/ProfileService'

export const useProfile = () => {
  const updatePassword = useMutation(
    async ({
      newPassword,
      password,
    }: {
      password: string
      newPassword: string
    }) => {
      const { data, success, error } = await ProfileService.updatePassword(
        password,
        newPassword,
      )

      return { data, success, error }
    },
  )

  const updateEmail = useMutation(
    async ({
      email,
      newEmail,
      password,
    }: {
      email: string
      newEmail: string
      password: string
    }) => {
      const { data, success, error } = await ProfileService.updateEmail(
        email,
        newEmail,
        password,
      )

      return { data, success, error }
    },
  )

  return {
    updateEmail,
    updatePassword,
  }
}
