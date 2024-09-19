/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Local } from './Local'
import host from '../utils/host'

export class ProfileService {
  static async updateEmail(email: string, newEmail: string, password: string) {
    const url = `${host()}/update/email`

    try {
      const response = await (
        await this.getAxiosInstance()
      ).post(url, {
        email,
        newEmail,
        password,
      })
      if (response.status === 200) {
        return { data: response.data, success: true }
      } else {
        return {
          error: response.data.message,
          success: false,
        }
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        }
      return {
        error: 'Erro ao editar Email',
        success: false,
      }
    }
  }

  static async updatePassword(password: string, newPassword: string) {
    const url = `${host()}/update/password`

    try {
      const response = await (
        await this.getAxiosInstance()
      ).post(url, {
        password,
        newPassword,
      })
      if (response.status === 200) {
        return { data: response.data, success: true }
      } else {
        return {
          error: response.data.message,
          success: false,
        }
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false,
        }
      return {
        error: 'Erro ao editar Senha',
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
