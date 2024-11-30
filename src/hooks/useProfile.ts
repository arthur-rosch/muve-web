import { useMutation } from '@tanstack/react-query';
import { ProfileService } from '../services/ProfileService';
import { toast } from 'sonner';
import { handleError } from './handle-error';

export const useProfile = () => {
  const updatePassword = useMutation({
    mutationFn: async ({
      password,
      newPassword,
    }: {
      password: string;
      newPassword: string;
    }) => {
      const { data, success, error } = await ProfileService.updatePassword(
        password,
        newPassword
      );
      return { data, success, error };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Senha atualizada com sucesso!');
      } else {
        handleError(response.error?.message!);
      }
    },
    onError: (error) => handleError(error.message),
  });

  const updateEmail = useMutation({
    mutationFn: async ({
      email,
      newEmail,
      password,
    }: {
      email: string;
      newEmail: string;
      password: string;
    }) => {
      const { data, success, error } = await ProfileService.updateEmail(
        email,
        newEmail,
        password
      );
      return { data, success, error };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Email atualizado com sucesso!');
      } else {
        handleError(response.error?.message!);
      }
    },
    onError: (error) => handleError(error.message),
  });

  const updateProfile = useMutation({
    mutationFn: async ({
      phone,
      document,
      name,
    }: {
      name: string;
      phone: string;
      document: string;
    }) => {
      const { data, success, error } = await ProfileService.updateProfile(
        name,
        document,
        phone
      );
      return { data, success, error };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Perfil atualizado com sucesso!');
      } else {
        handleError(response.error?.message!);
      }
    },
    onError: (error) => handleError(error.message),
  });

  return {
    updateEmail,
    updateProfile,
    updatePassword,
  };
};
