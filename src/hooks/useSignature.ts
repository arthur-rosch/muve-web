import type { Signature } from '../types';
import { handleError } from './handle-error';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SignatureService } from '../services/SignatureService';
import { toast } from 'sonner';

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

  const createCheckout = useMutation({
    mutationFn: async ({email, plan}: {email: string, plan: string}) => {
      const { data, success, error } = await SignatureService.createCheckout({
        email, plan
      });
      return { data, success, error };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Ira ser redirecionado para o checkout.');
        window.location.href = response.data.url;
      } else {
        handleError(response.error?.message!);
      }
    },
    onError: (error) => handleError(error.message),
  });

  return {
    data, isLoading, error, createCheckout,
  };
};
