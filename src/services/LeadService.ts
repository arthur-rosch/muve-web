import axios from 'axios';
import host from '../utils/host';
import { handleRequest, type ApiResponse } from './HandleRequest';
import type { LeadVariables } from '../types';

export const LeadService = {
  create: async (lead: LeadVariables): Promise<ApiResponse<any>> => {
    const url = `${host()}/lead`;
    return handleRequest(axios.post(url, lead));
  },
};
