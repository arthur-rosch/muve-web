/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import host from '../utils/host'
import type {
  GenerateUrlVariables,
  ValidateUrlVariables,
  InvalidateTokenVariables,
} from '../types'

export class TokenPlayerService {
  static async generateSignedUrl(variables: GenerateUrlVariables) {
    const url = `${host()}/generate/url`
    try {
      const response = await axios.post(url, variables)

      if (response.status === 200) {
        return { data: response.data, success: true }
      } else {
        return {
          error: response.data?.message || 'Erro desconhecido',
          success: false,
        }
      }
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error.response?.data?.error || 'Erro ao gerar URL assinada'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async validateSignedUrl(variables: ValidateUrlVariables) {
    const url = `${host()}/validate/url`
    try {
      const response = await axios.post(url, variables)

      if (response.status === 200) {
        return { data: response.data, success: true }
      } else {
        return {
          error: response.data?.message || 'Erro desconhecido',
          success: false,
        }
      }
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error.response?.data?.error || 'Erro ao validar URL assinada'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async invalidateToken(variables: InvalidateTokenVariables) {
    const url = `${host()}/invalidate/url`
    try {
      const response = await axios.post(url, variables)

      if (response.status === 200) {
        return { data: response.data, success: true }
      } else {
        return {
          error: response.data?.message || 'Erro desconhecido',
          success: false,
        }
      }
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error.response?.data?.error || 'Erro ao invalidar token'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async getAxiosInstance() {
    return axios.create({
      baseURL: `${host()}`,
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
