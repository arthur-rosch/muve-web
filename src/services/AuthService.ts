/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import host from '../utils/host'
import { Local } from './Local'
import type { SignInVariables, SignUpVariables } from '../types'

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
      console.log(error.response?.data?.message)
      const errorMessage =
        error.response?.data?.message || 'Erro ao logar usuário'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async signUp(signUp: SignUpVariables) {
    const url = `${host()}/users`
    try {
      const response = await axios.post(url, signUp)
      console.log(response)
      if (response.status === 201) {
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
        error.response?.data?.error || 'Erro ao criar usuário'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async generatePasswordResetToken(email: string) {
    const url = `${host()}/send/password`
    try {
      const response = await axios.post(
        url,
        {
          email,
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
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
      console.log(error.response?.data?.message)
      const errorMessage =
        error.response?.data?.message || 'Erro ao logar usuário'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async forgotPassword(
    newPassword: string,
    confirmNewPassword: string,
    token: string,
  ) {
    const url = `${host()}/forgot/password`

    try {
      const response = await axios.post(
        url,
        {
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )

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
      console.log(error.response?.data?.message)
      const errorMessage =
        error.response?.data?.message || 'Erro ao redefinir a senha'
      return {
        error: errorMessage,
        success: false,
      }
    }
  }

  static async checkEmailExistence(email: string) {
    const url = `${host()}/check/email`

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
