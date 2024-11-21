/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import host from '../utils/host'
import type { LeadVariables } from '../types'

export class LeadService {
  static async create(lead: LeadVariables) {
    const url = `${host()}/lead`
    try {
      const response = await axios.post(url, {
        ...lead,
      })
      
      if (response.status === 201) {
        return { data: response.data, success: true }
      } else {
        return {
          error: response.data?.message || 'Erro desconhecido',
          success: false,
        }
      }
    } catch (error: any) {
      console.log(error.response?.data?.message)
      const errorMessage =
        error.response?.data?.message || 'Erro ao criar o lead'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }
}
