import { handleRequest, type ApiResponse } from './HandleRequest';
import { getAxiosInstance } from './GetAxiosInstance'; 
import host from '../utils/host';
import type { CreateVideoVariables, EditPlayerVideoProps } from '../types';

export const VideoService = {
  createVideo: async (data: CreateVideoVariables): Promise<ApiResponse<any>> => {
    const url = `${host()}/video`;
    const instance = await getAxiosInstance(); 
    return handleRequest(instance.post(url, data)); 
  },

  deleteVideo: async (videoId: string): Promise<ApiResponse<any>> => {
    const url = `${host()}/video/${videoId}`;
    const instance = await getAxiosInstance(); 
    return handleRequest(instance.delete(url)); 
  },

  ediFolderIdVideo: async (videoId: string, folderId: string): Promise<ApiResponse<any>> => {
    const url = `${host()}/edit/folder/video`;
    const instance = await getAxiosInstance(); 
    return handleRequest(
      instance.post(url, {
        folderId,
        videoId,
      })
    ); 
  },

  getAllVideosByUserId: async (): Promise<ApiResponse<any>> => {
    const url = `${host()}/video/all`;
    const instance = await getAxiosInstance(); 
    return handleRequest(instance.get(url)); 
  },

  getManyVideosNotFolderId: async (): Promise<ApiResponse<any>> => {
    const url = `${host()}/video/not/folder`;
    const instance = await getAxiosInstance(); 
    return handleRequest(instance.get(url)); 
  },

  getVideoById: async (videoId: string): Promise<ApiResponse<any>> => {
    const url = `${host()}/video/${videoId}`;
    const instance = await getAxiosInstance(); 
    return handleRequest(instance.get(url)); 
  },

  editPlayerVideo: async (
    videoId: string,
    data: EditPlayerVideoProps
  ): Promise<ApiResponse<any>> => {
    const url = `${host()}/edit/player/video/${videoId}`;
    const instance = await getAxiosInstance(); 
    return handleRequest(instance.post(url, data)); 
  },
};
