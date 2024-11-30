import { handleRequest, type ApiResponse } from './HandleRequest';
import { getAxiosInstance } from './GetAxiosInstance'; // Importando getAxiosInstance
import host from '../utils/host';

export const SignatureService = {
  getAllSignaturesByUserId: async (): Promise<ApiResponse<any>> => {
    const url = `${host()}/signature`;
    const instance = await getAxiosInstance(); // Usando getAxiosInstance
    return handleRequest(instance.get(url)); // Usando a instância do axios
  },
};
