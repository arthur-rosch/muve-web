/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Local } from './Local'
import host from '../utils/host'

export class FolderService {
  static async createFolder(name: string) {
    const url = `${host()}/folder`

    try {
      const response = await (await this.getAxiosInstance()).post(url, { name })
      if (response.status === 201) {
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
        error: 'Erro ao criar Pasta',
        success: false,
      }
    }
  }

  static async getAllFolderByUserId() {
    const url = `${host()}/folder/all`
    try {
      const response = await (await this.getAxiosInstance()).get(url)
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
        error: 'Erro ao buscar as pastas do usuário',
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
