import { Local } from './Local';
import host from '../utils/host';
import axios from 'axios';
import { getAxiosInstance } from './GetAxiosInstance';
import { handleRequest, type ApiResponse } from './HandleRequest';
import type { SignInVariables, Signature, User, SignUpVariables } from '@/types';



export const AuthService = {
  signIn: async ({ email, password }: SignInVariables): Promise<ApiResponse<{ user: User; token: string; signature: Signature }>> => {
    const url = `${host()}/sessions`;
    return handleRequest(axios.post(url, { email, password }));
  },

  signUp: async ({ name, email, password, document, phone }: SignUpVariables): Promise<ApiResponse<{ user: User }>> => {
    const url = `${host()}/users`;
    return handleRequest(axios.post(url, { name, email, password, document, phone }));
  },

  validateVerificationCode: async ({ email, code }: { email: string; code: string }): Promise<ApiResponse<{ status: boolean }>> => {
    const url = `${host()}/email-verification/validate`;
    return handleRequest(axios.post(url, { email, code }));
  },

  sendVerificationCode: async ({ email }: { email: string }): Promise<ApiResponse<{ status: boolean }>> => {
    const url = `${host()}/email-verification/send`;
    return handleRequest(axios.post(url, { email }));
  },

  generatePasswordResetToken: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    const url = `${host()}/send/password`;
    return handleRequest(axios.post(url, { email }));
  },

  forgotPassword: async (token: string, newPassword: string, confirmNewPassword: string): Promise<ApiResponse<{ user: User }>> => {
    const url = `${host()}/forgot/password`;
    return handleRequest(axios.post(url, { newPassword, confirmNewPassword }, { headers: { Authorization: `Bearer ${token}` } }));
  },

  checkEmailExistence: async (email: string): Promise<ApiResponse<void>> => {
    const url = `${host()}/check/email`;
    return handleRequest(axios.post(url, { email }));
  },

  checkJWT: async (): Promise<ApiResponse<{ user: User }>> => {
    const url = `/checkJWT`;
    const instance = await getAxiosInstance();
    return handleRequest(instance.get(url));
  },

  addInfoFirstAccess: async (accountType: string, memberArea: string, videoHosting: string): Promise<ApiResponse<void>> => {
    const url = `/first/access`;
    const instance = await getAxiosInstance();
    return handleRequest(instance.post(url, { accountType, memberArea, videoHosting }));
  },
};

