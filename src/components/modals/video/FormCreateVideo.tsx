import { useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { Trash2, VideoIcon, Monitor } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';

import { cn } from '@/utils';
import { useVideo } from '@/hooks';
import type { Folder } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { formVariants, listItensDelay } from '@/animations';
import { videoSchema, type VideoFormValues } from '@/validation';
import { CheckBox, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from '@/components'



const typeOptions = [
  { icon: <VideoIcon className="w-8 h-8" />, label: 'VSL', value: 'Vsl' },
  { icon: <Monitor className="w-8 h-8" />, label: 'Curso', value: 'Curso' }
];

interface FormCreateVideoProps {
    folders: Folder[]
    onClose: () => void;
    onSuccess: (success: boolean) => void;
}

export const FormCreateVideo = ({ folders, onClose, onSuccess }: FormCreateVideoProps) => {
  const { createVideo, getAllVideosByUserId } = useVideo()
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      fictitiousProgress: false,
      chapters: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chapters'
  });

  const selectedType = watch('type');
  const fictitiousProgress = watch('fictitiousProgress');

  const handleAddChapter = () => {
    append({ title: '', startTime: '', endTime: '' });
  };

  const onSubmit = async (data: VideoFormValues) => {
    setLoading(true);

    const { success } = await createVideo.mutateAsync(data).finally(() => setLoading(false));
    
    await getAllVideosByUserId(true).refetch()

    setLoading(false);
    onSuccess(success)
    reset()
  };


  return (
          <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6" variants={formVariants}>
            <div className="p-6 space-y-8 h-full">
              <div className="space-y-4">
                <label className="text-sm font-medium text-neutral-300">
                  Tipo de Vídeo
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {typeOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => setValue('type', option.value as 'Vsl' | 'Curso')}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-colors",
                        "hover:border-[#187BF0] hover:bg-[#187BF014] hover:text-[#187BF0]",
                        watch('type') === option.value
                          ? "border-[#187BF0] bg-[#187BF014]"
                          : "border-neutral-800 bg-neutral-900"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-neutral-400">
                          {option.icon}
                        </div>
                        <span className="text-white">{option.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.type && (
                    <p className="text-red-500 text-xs">{errors.type.message}</p>
                )}
              </div>

              <div className="space-y-4 w-full flex flex-col items-start justify-start">
                <label className="text-sm font-medium text-neutral-300">
                  Formato
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      {...register('format')}
                      value="9/16"
                      className="text-[#187BF0] bg-transparent"
                    />
                    <span className="text-neutral-400">9/16</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      {...register('format')}
                      value="16/9"
                      className="text-[#187BF0] bg-transparent"
                    />
                    <span className="text-neutral-400">16/9</span>
                  </label>
                </div>
                {errors.format && (
                  <p className="text-red-500 text-xs">{errors.format.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 w-full flex flex-col items-start justify-start">
                  <label className="text-sm font-medium text-neutral-300">
                    URL do Vídeo
                  </label>
                  <Input
                    {...register('url')}
                    placeholder="https://exemplo.com/video"
                    className="bg-neutral-900 border-neutral-800"
                  />
                  {errors.url && (
                    <p className="text-red-500 text-xs">{errors.url.message}</p>
                  )}
                </div>
                <div className="space-y-2 w-full flex flex-col items-start justify-start">
                  <label className="text-sm font-medium text-neutral-300">
                    Nome do Vídeo
                  </label>
                  <Input
                    {...register('name')}
                    placeholder="Digite o nome do vídeo"
                    className="bg-neutral-900 border-neutral-800"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name.message}</p>
                  )}
                </div>
              </div>


              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 w-full flex flex-col items-start justify-start">
                  <label className="text-sm font-medium text-neutral-300">
                    Duração
                  </label>
                  <Input
                    mask="99:99:99"
                    {...register('duration')}
                    placeholder="hh:mm:ss"
                    className="bg-neutral-900 border-neutral-800"
                    onChange={(e) => setValue('duration', e.target.value)}
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-xs">{errors.duration.message}</p>
                  )}
                </div>
                <div className="space-y-2 w-full flex flex-col items-start justify-start">
                  <label className="text-sm font-medium text-neutral-300">
                    Pasta
                  </label>
                  <Select onValueChange={(value) => setValue('folderId', value)}>
                    <SelectTrigger className="bg-neutral-900 border-neutral-800">
                      <SelectValue placeholder="Selecione uma pasta" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedType === 'Vsl' && (
                <motion.div className="space-y-4" variants={listItensDelay}>
                  <label className="text-sm font-medium text-neutral-300">
                    Progresso Fictício 
                  </label>
                  <div className="flex items-center space-x-4">
                    <CheckBox
                      checked={fictitiousProgress}
                      onCheckedChange={(checked) => setValue('fictitiousProgress', checked as boolean)}
                    />
                    <span className="text-neutral-400">Ativar progresso fictício</span>
                    {fictitiousProgress && (
                      <Input
                        type="color"
                        {...register('color')}
                        className="w-[3rem] h-[3em] p-1"
                      />
                    )}
                  </div>

                </motion.div>
              )}

              {selectedType === 'Curso' && (
                <motion.div className="space-y-6 overflow-auto px-2" variants={listItensDelay}>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-neutral-300">
                      Capítulos
                    </label>
                    <Button
                      type="button"
                      onClick={handleAddChapter}
                      variant="outline"
                      className="border-neutral-800 text-neutral-300"
                    >
                      Adicionar Capítulo
                    </Button>
                  </div>
                  <AnimatePresence initial={false}>
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            opacity: { duration: 0.2 },
                            height: { duration: 0.4, type: "spring" }
                          }}
                          className="p-4 border border-neutral-800 rounded-lg space-y-4"
                        >
                          <motion.div className="flex justify-between items-center"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <h4 className="text-sm font-medium text-white">
                              Capítulo {index + 1}
                            </h4>
                            <Button
                              type="button"
                              variant="link"
                              onClick={() => {
                                remove(index) 
                              }}

                              className="text-red-500 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-3">
                              <Input
                                
                                {...register(`chapters.${index}.title`)}
                                placeholder="Título do capítulo"
                                className="bg-neutral-900 border-neutral-800"
                              />
                            </div>
                            <div>
                              <Input
                                mask="99:99:99"
                                {...register(`chapters.${index}.startTime`)}
                                placeholder="Início (hh:mm:ss)"
                                className="bg-neutral-900 border-neutral-800"
                              />
                            </div>
                            <div>
                              <Input
                                mask="99:99:99"
                                {...register(`chapters.${index}.endTime`)}
                                placeholder="Fim (hh:mm:ss)"
                                className="bg-neutral-900 border-neutral-800"
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t border-neutral-800">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                isLoading={loading}
                className="flex-1 bg-[#187BF0] text-white hover:bg-[#1567cc]"
              >
                Criar Vídeo
              </Button>
            </div>
          </motion.form>
  )
}