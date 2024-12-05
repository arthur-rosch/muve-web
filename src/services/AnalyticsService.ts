import host from '../utils/host';
import { getAxiosInstance } from './GetAxiosInstance';
import { handleRequest, type ApiResponse } from './HandleRequest';
import type { AddViewTimestamps, AddViewUnique } from '../types';

export const AnalyticsService = {
  addViewTimestamps: async (data: AddViewTimestamps): Promise<ApiResponse<any>> => {
    const url = `${host()}/add/analytics`;
    return handleRequest((await getAxiosInstance()).post(url, data));
  },

  getAnalyticsByVideoId: async (videoId: string): Promise<ApiResponse<any>> => {
    const url = `${host()}/analytic/${videoId}`;
    return handleRequest((await getAxiosInstance()).get(url));
  },

  addViewUnique: async (data: AddViewUnique): Promise<ApiResponse<any>> => {
    const url = `${host()}/analytics/views`;
    return handleRequest((await getAxiosInstance()).post(url, data));
  },
};

