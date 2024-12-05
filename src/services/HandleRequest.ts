import { AxiosError, type AxiosResponse } from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    statusCode?: number;
  };
}

export const handleRequest = async <T>(promise: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> => {
  try {
    const response = await promise;


    if (response.status >= 200 && response.status < 300) {
      return { success: true, data: response.data };
    }


    return {
      success: false,
      error: {
        message: typeof response.data,
        statusCode: response.status,
      },
    };
  } catch (error: unknown) {

    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Erro de conexão';
      return {
        success: false,
        error: { message: errorMessage, statusCode: error.response?.status },
      };
    }


    return {
      success: false,
      error: { message: 'Erro desconhecido', statusCode: undefined },
    };
  }
};

