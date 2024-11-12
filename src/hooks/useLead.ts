import { useCallback } from 'react'
import type { LeadVariables } from '../types'
import { LeadService } from '../services/LeadService'

export const useLead = () => {

  const createLed = useCallback(
    async (variables: LeadVariables) => {
      const response = await LeadService.create(variables)

      if (response.success) {
        return {
          success: true,
          Message: 'Lead cadastrado sucesso!',
          data: response.data,
        }
      }
      return { success: false, Erro: response.error }
    },
    [],
  )


  return {
    createLed,
  }
}
