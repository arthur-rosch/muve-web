
import host from '../utils/host';
import { getAxiosInstance } from './GetAxiosInstance'; 
import { handleRequest, type ApiResponse } from './HandleRequest';

export const ProfileService = {
  updateEmail: async (
    email: string,
    newEmail: string,
    password: string
  ): Promise<ApiResponse<any>> => {
    const url = `${host()}/update/email`;
    const instance = await getAxiosInstance(); 
    return handleRequest(
      instance.post(url, {
        email,
        newEmail,
        password,
      })
    );
  },

  updatePassword: async (
    password: string,
    newPassword: string
  ): Promise<ApiResponse<any>> => {
    const url = `${host()}/update/password`;
    const instance = await getAxiosInstance(); 
    return handleRequest(
      instance.post(url, {
        password,
        newPassword,
      })
    );
  },

  updateProfile: async (
    name: string,
    document: string,
    phone: string
  ): Promise<ApiResponse<any>> => {
    const url = `${host()}/update/profile`;
    const instance = await getAxiosInstance(); 
    return handleRequest(
      instance.post(url, {
        name,
        document,
        phone,
      })
    );
  },
};
