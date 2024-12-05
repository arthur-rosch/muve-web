import { handleRequest, type ApiResponse } from './HandleRequest';
import { getAxiosInstance } from './GetAxiosInstance';  
import host from '../utils/host';

export const SignatureService = {
  getAllSignaturesByUserId: async (): Promise<ApiResponse<any>> => {
    const url = `${host()}/signature`;
    const instance = await getAxiosInstance(); // Usando getAxiosInstance
    return handleRequest(instance.get(url)); // Usando a instância do axios
  },

  createCheckout: async ({ email, plan }: {email: string, plan: string}): Promise<ApiResponse<any>> => {
    const url = `${host()}/create/checkout`;
    const instance = await getAxiosInstance();  
    return handleRequest(instance.post(url, {
      email,
      plan,
    }));  
  },
};
