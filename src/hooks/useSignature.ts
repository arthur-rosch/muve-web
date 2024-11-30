import type { Signature } from '../types';
import { handleError } from './handle-error';
import { useQuery } from '@tanstack/react-query';
import { SignatureService } from '../services/SignatureService';

export const useSignature = () => {
  const { data, isLoading, error } = useQuery<Signature[]>({
    queryKey: ['getAllSignaturesByUserId'],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      try {
        const { success, data, error } = await SignatureService.getAllSignaturesByUserId();
        
        if (success) {
          return data;
        }
        handleError(error?.message! || 'Erro desconhecido ao buscar assinaturas.')
        throw error;
      } catch (error: any) {
        handleError(error?.message! || 'Erro desconhecido ao buscar assinaturas.');
        throw error;
      }
    },
  });

  return {
    data, isLoading, error,
  };
};
