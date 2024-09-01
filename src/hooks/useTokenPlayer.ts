import { useMutation } from 'react-query'
import { TokenPlayerService } from '../services/TokenPlayerService'
import type {
  GenerateUrlVariables,
  ValidateUrlVariables,
  InvalidateTokenVariables,
} from '../types'

export const useTokenPlayer = () => {
  const generateSignedUrl = useMutation(
    async (variables: GenerateUrlVariables) => {
      const { data, success, error } =
        await TokenPlayerService.generateSignedUrl(variables)

      return { data, success, error }
    },
  )

  const validateSignedUrl = useMutation(
    async (variables: ValidateUrlVariables) => {
      const { data, success, error } =
        await TokenPlayerService.validateSignedUrl(variables)

      return { data, success, error }
    },
  )

  const invalidateToken = useMutation(
    async (variables: InvalidateTokenVariables) => {
      const { data, success, error } =
        await TokenPlayerService.invalidateToken(variables)

      return { data, success, error }
    },
  )

  return {
    generateSignedUrl,
    validateSignedUrl,
    invalidateToken,
  }
}
