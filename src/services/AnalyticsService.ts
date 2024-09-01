/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Local } from './Local'
import host from '../utils/host'
import type { AddViewTimestamps, AddViewUnique } from '../types'

export class AnalyticsService {
  static async addViewTimesTamps(data: AddViewTimestamps) {
    const url = `${host()}/add/analytics`

    try {
      const response = await (await this.getAxiosInstance()).post(url, data)
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
        error: 'Erro ao criar Video',
        success: false,
      }
    }
  }

  static async getAnalyticsByVideoId(videoId: string) {
    const url = `${host()}/analytic/${videoId}`
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
        error: 'Erro ao buscar as videos do usuário',
        success: false,
      }
    }
  }

  static async addViewUnique(data: AddViewUnique) {
    const url = `${host()}/analytics/views`
    try {
      const response = await (await this.getAxiosInstance()).post(url, data)
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
        error: 'Erro ao buscar as add view única',
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
