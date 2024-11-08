/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Local } from './Local'
import host from '../utils/host'
import type { CreateVideoVariables, EditPlayerVideoProps } from '../types'

export class VideoService {
  static async createVideo(data: CreateVideoVariables) {
    const url = `${host()}/video`

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
      if (error.response.data.message === 'Limite de vídeos excedido.') {
        return {
          error: 'Limite de vídeos excedido.',
          success: false,
        }
      }
      return {
        error: 'Erro ao criar Video',
        success: false,
      }
    }
  }

  static async deleteVideo(videoId: string) {
    const url = `${host()}/video/${videoId}`

    try {
      const response = await (await this.getAxiosInstance()).delete(url, {
        
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
        error: 'Erro ao deletar Video',
        success: false,
      }
    }
  }

  static async ediFolderIdVideo(videoId: string, folderId: string) {
    const url = `${host()}/edit/folder/video`

    try {
      const response = await (await this.getAxiosInstance()).post(url, {
        folderId,
        videoId,
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
        error: 'Erro ao mover video de pasta',
        success: false,
      }
    }
  }

  static async getAllVideosByUserId() {
    const url = `${host()}/video/all`
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

  static async getManyVideosNotFolderId() {
    const url = `${host()}/video/not/folder`
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
        error: 'Erro ao buscar as videos sem pasta',
        success: false,
      }
    }
  }

  static async getVideoById(videoId: string) {
    const url = `${host()}/video/${videoId}`
    try {
      const response = await (await this.getAxiosInstance()).get(url)
      console.log(response, url)
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
        error: 'Erro ao buscar o video',
        success: false,
      }
    }
  }

  static async editPlayerVideo(videoId: string, data: EditPlayerVideoProps) {
    const url = `${host()}/edit/player/video/${videoId}`

    try {
      const response = await (await this.getAxiosInstance()).post(url, data)
      console.log(response, url)
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
        error: 'Erro ao editar player do video',
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
