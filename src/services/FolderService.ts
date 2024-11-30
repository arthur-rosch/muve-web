import axios from 'axios';
import host from '../utils/host';
import { handleRequest, type ApiResponse } from './HandleRequest';
import type { CreateFolderVariables } from '../types';
import { Local } from './Local';
import { getAxiosInstance } from './GetAxiosInstance';

export const FolderService = {
  createFolder: async (data: CreateFolderVariables): Promise<ApiResponse<any>> => {
    const url = `${host()}/folder`;
    return handleRequest((await getAxiosInstance()).post(url, data));
  },

  deleteFolder: async (folderId: string): Promise<ApiResponse<any>> => {
    const url = `${host()}/folder/${folderId}`;
    return handleRequest((await getAxiosInstance()).delete(url));
  },

  addFavoriteFolder: async (folderId: string, value: boolean): Promise<ApiResponse<any>> => {
    const url = `${host()}/folder/favorite`;
    return handleRequest((await getAxiosInstance()).post(url, { folderId, value }));
  },

  getAllFolderByUserId: async (): Promise<ApiResponse<any>> => {
    const url = `${host()}/folder/all`;
    return handleRequest((await getAxiosInstance()).get(url));
  },

};
