import type { CreateFolderVariables, Folder } from '../types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FolderService } from './../services/FolderService';
import { toast } from 'sonner';
import { handleError } from './handle-error';

export const useFolder = () => {
  const createFolder = useMutation({
    mutationFn: async (folder: CreateFolderVariables) => {
      const { data, success, error } = await FolderService.createFolder(folder);
      return { data, success, error };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Pasta criada com sucesso!');
      } else {
        handleError(response.error?.message!);
      }
    },
    onError: (error) => handleError(error.message),
  });

  const deleteFolder = useMutation({
    mutationFn: async (folderId: string) => {
      const { data, success, error } = await FolderService.deleteFolder(folderId);
      return { data, success, error };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Pasta deletada com sucesso!');
      } else {
        handleError(response.error?.message!);
      }
    },
    onError: (error) => handleError(error.message),
  });

  const addFavoriteFolder = useMutation({
    mutationFn: async ({ folderId, value }: { folderId: string; value: boolean }) => {
      const { data, success, error } = await FolderService.addFavoriteFolder(
        folderId,
        value
      );
      return { data, success, error };
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Pasta marcada como favorita!');
      } else {
        handleError(response.error?.message!);
      }
    },
    onError: (error) => handleError(error.message),
  });

  const getAllFolderByUserId = useQuery<Folder[]>({
    queryKey: ['getAllFolderByUserId'],
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { success, data, error } = await FolderService.getAllFolderByUserId();
      if (success) {
        return data.folders;
      } else {
        handleError(error?.message!);
        throw error;
      }
    },
  });

  return {
    createFolder,
    deleteFolder,
    addFavoriteFolder,
    getAllFolderByUserId,
  };
};
