import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { cn } from '@/utils';
import { useFolder } from '@/hooks'
import type { Video } from '@/types';
import { formVariants } from '@/animations';
import { Input, Button } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { type CreateFolderFormValues, createFolderSchema } from '@/validation';
import { ListVideoNotFolder } from './ListVideoNotFolderModal';

export const FormFolderModal = ({
  videos,
  onClose,
}: {
  videos: Video[];
  onClose: () => void;
  setSuccess: (value: boolean) => void;
}) => {
  const { createFolder, getAllFolderByUserId } = useFolder()
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateFolderFormValues>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      folderName: '',
      coverUrl: '',
      videoIds: [],
    },
  });

  const handleVideoSelection = (checked: boolean, videoId: string) => {
    const currentVideoIds = watch('videoIds') || [];
    setValue(
      'videoIds',
      checked
        ? [...currentVideoIds, videoId]
        : currentVideoIds.filter((id) => id !== videoId)
    );
  };

  const onSubmit = async (data: CreateFolderFormValues) => {
    setLoading(true);

    const { success } = await createFolder.mutateAsync({
      name: data.folderName,
      coverUrl: data.coverUrl,
      videosId: data.videoIds,
    })

    await getAllFolderByUserId.refetch()

    setLoading(false)
    
    reset()
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={formVariants}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full h-full space-y-6"
    >
      <div className="w-full flex-1 space-y-6 p-6">
        <div className="w-full grid grid-cols-2 gap-6">
          <div className="space-y-2 w-full flex flex-col items-start justify-start">
            <label className="text-sm font-medium text-neutral-300">
              Nome da Pasta
            </label>
            <Input
              {...register('folderName')}
              className={cn(
                'bg-neutral-900 border-neutral-800 text-white w-full',
                errors.folderName && 'border-red-500'
              )}
              placeholder="Digite o nome da pasta"
            />
            {errors.folderName && (
              <p className="text-xs text-red-500">{errors.folderName.message}</p>
            )}
          </div>
          <div className="space-y-2 w-full flex flex-col items-start justify-start">
            <label className="text-sm font-medium text-neutral-300">
              URL da Capa
            </label>
            <Input
              {...register('coverUrl')}
              className={cn(
                'bg-neutral-900 border-neutral-800 text-white w-full',
                errors.coverUrl && 'border-red-500'
              )}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.coverUrl && (
              <p className="text-xs text-red-500">{errors.coverUrl.message}</p>
            )}
          </div>
        </div>

        <ListVideoNotFolder handleVideoSelection={handleVideoSelection} videos={videos}/>
      </div>

      <div className="w-full flex gap-3 p-6 border-t border-neutral-800 ">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1 text-neutral-300"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
          isLoading={loading}
          className="flex-1 bg-[#187BF0] text-white hover:bg-[#1567cc]"
        >
           Criar Pasta
        </Button>
      </div>
    </motion.form>
  );
};
