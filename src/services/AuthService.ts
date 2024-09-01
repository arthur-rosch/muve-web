/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import host from '../utils/host'
import { Local } from './Local'
import type { SignInVariables } from '../types'

export class AuthService {
  static async signIn(signIn: SignInVariables) {
    const url = `${host()}/sessions`
    try {
      const response = await axios.post(url, {
        email: signIn.email,
        password: signIn.password,
      })
      console.log(response)
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
        error.response?.data?.error || 'Erro ao logar usuário'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async checkEmailExistence(email: string) {
    const url = `${host()}/auth/check/email`

    try {
      const response = await axios.post(url, {
        email,
      })

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
        error.response?.data?.error || 'Erro ao procurar email'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async checkJWT() {
    const url = `/checkJWT`
    try {
      const response = await (await this.getAxiosInstance()).get(url)

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
        error.response?.data?.error || 'Erro ao verificar token'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async getAxiosInstance() {
    const jwt = await Local.get('JWT')

    return axios.create({
      baseURL: `${host()}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
        accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
