import { z } from 'zod'
import { type FC, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFolder, useVideo } from '../../../../hooks'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import {
  Input,
  Button,
  CheckBox,
  toastError,
  CustomModal,
  toastSuccess,
  InputSelect,
} from '../../../../components'

const createVideoSchema = z.object({
  url: z.string().url('URL inválida'),
  duration: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Duração deve estar no formato mm:ss'),
  folderId: z.string().nonempty('Selecione uma pasta'),
  type: z.enum(['Vsl', 'Curso'], {
    errorMap: () => ({ message: 'Tipo de vídeo é obrigatório' }),
  }),
  format: z.enum(['9/16', '16/9'], {
    errorMap: () => ({ message: 'Formato do vídeo é obrigatório' }),
  }),
  fictitiousProgress: z.boolean().optional(),
  color: z.string().optional(),
  chapters: z
    .array(
      z.object({
        title: z.string().nonempty('Título do capítulo é obrigatório'),
        startTime: z
          .string()
          .regex(/^\d{2}:\d{2}$/, 'Início deve estar no formato mm:ss'),
        endTime: z
          .string()
          .regex(/^\d{2}:\d{2}$/, 'Fim deve estar no formato mm:ss'),
      }),
    )
    .optional(),
})

type CreateVideoFormValues = z.infer<typeof createVideoSchema>

interface CustomCreateVideoModalProps {
  urlVideo: string
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export const CustomCreateVideoModal: FC<CustomCreateVideoModalProps> = ({
  urlVideo,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { getAllFolderByUserId } = useFolder()
  const { data: folders } = getAllFolderByUserId

  const { createVideo, getAllVideosByUserId } = useVideo()

  const {
    reset,
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVideoFormValues>({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      url: urlVideo,
      fictitiousProgress: false,
      chapters: [],
    },
  })

  const selectedType = watch('type')
  const [loading, setLoading] = useState(false)
  const [chapterData, setChapterData] = useState({
    title: '',
    startTime: '',
    endTime: '',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chapters',
  })

  const handleCreateVideo = async (data: CreateVideoFormValues) => {
    setLoading(true)

    const { success } = await createVideo.mutateAsync({
      ...data,
      colorProgress: data.color,
    })

    if (success) {
      reset()
      setLoading(false)
      setIsModalOpen(false)
      await getAllVideosByUserId.refetch()
      await getAllFolderByUserId.refetch()
      toastSuccess({
        text: `Vídeo criado com sucesso`,
      })
    } else {
      reset()
      setLoading(false)
      setIsModalOpen(false)
      toastError({
        text: `Erro ao criar vídeo`,
      })
    }
  }

  const handleAddChapter = () => {
    const { title, startTime, endTime } = chapterData

    if (title && startTime && endTime) {
      const convertToMinutes = (time: string) => {
        const [minutes, seconds] = time.split(':').map(Number)
        return minutes * 60 + seconds
      }
      const newDuration = convertToMinutes(watch('duration'))
      const newStartTime = convertToMinutes(startTime)
      const newEndTime = convertToMinutes(endTime)

      if (newEndTime > newDuration) {
        toastError({
          text: `Não é possível adicionar um capítulo que ultrapassa a duração do video`,
        })
        return
      }

      const isOverlapping = fields.some((chapter) => {
        const chapterStartTime = convertToMinutes(chapter.startTime)
        const chapterEndTime = convertToMinutes(chapter.endTime)
        return newStartTime < chapterEndTime && newEndTime > chapterStartTime
      })

      if (isOverlapping) {
        toastError({
          text: `Não é possível adicionar um capítulo que sobreponha um intervalo existente.`,
        })
        return
      }

      append({ title, startTime, endTime })
      setChapterData({ title: '', startTime: '', endTime: '' }) // Reset local state
    }
  }

  return (
    <CustomModal.Root
      styles={'h-auto w-[50rem]'}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    >
      <CustomModal.Title
        setIsOpen={setIsModalOpen}
        title={'Crie o seu vídeo'}
      />
      <form
        onSubmit={handleSubmit(handleCreateVideo)}
        className="w-full h-full max-h-full p-8 flex flex-col justify-between mb-4"
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-col">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <RadioGroup.Root
                    className="flex gap-4"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroup.Item
                        value="Vsl"
                        id="type-vsl"
                        className="w-6 h-6 bg-[#1d1f21] border border-gray-600 rounded-full flex items-center justify-center"
                      >
                        <RadioGroup.Indicator className="text-white">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </RadioGroup.Indicator>
                      </RadioGroup.Item>
                      <label htmlFor="type-vsl" className="text-white">
                        VSL
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroup.Item
                        value="Curso"
                        id="type-curso"
                        className="w-6 h-6 bg-[#1d1f21] border border-gray-600 rounded-full flex items-center justify-center"
                      >
                        <RadioGroup.Indicator className="text-white">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </RadioGroup.Indicator>
                      </RadioGroup.Item>
                      <label htmlFor="type-curso" className="text-white">
                        Curso
                      </label>
                    </div>
                  </RadioGroup.Root>
                )}
              />
              {errors.type && (
                <span className="text-red-500">{errors.type.message}</span>
              )}
              <Controller
                name="format"
                control={control}
                render={({ field }) => (
                  <RadioGroup.Root
                    className="flex gap-4"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroup.Item
                        value="9/16"
                        id="format-9/16"
                        className="w-6 h-6 bg-[#1d1f21] border border-gray-600 rounded-full flex items-center justify-center"
                      >
                        <RadioGroup.Indicator className="text-white">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </RadioGroup.Indicator>
                      </RadioGroup.Item>
                      <label htmlFor="format-9/16" className="text-white">
                        9/16
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroup.Item
                        value="16/9"
                        id="format-16/9"
                        className="w-6 h-6 bg-[#1d1f21] border border-gray-600 rounded-full flex items-center justify-center"
                      >
                        <RadioGroup.Indicator className="text-white">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </RadioGroup.Indicator>
                      </RadioGroup.Item>
                      <label htmlFor="format-16/9" className="text-white">
                        16/9
                      </label>
                    </div>
                  </RadioGroup.Root>
                )}
              />
              {errors.format && (
                <span className="text-red-500">{errors.format.message}</span>
              )}
            </div>

            {selectedType === 'Vsl' && (
              <>
                <div className="flex gap-4 items-center">
                  <Controller
                    name="fictitiousProgress"
                    control={control}
                    render={({ field }) => (
                      <CheckBox
                        disabled={false}
                        id="fictitious-progress"
                        checked={field.value || false}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                    )}
                  />
                  <label className="text-white">Progresso Fictício</label>
                </div>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="color"
                      placeholder="Selecione uma cor"
                      className="w-[10rem]"
                    />
                  )}
                />
              </>
            )}

            <Controller
              name="url"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="URL do vídeo" />
              )}
            />

            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Duração (mm:ss)" />
              )}
            />

            <InputSelect
              register={register('folderId')}
              placeholder="Selecione uma pasta"
              options={
                folders
                  ? folders!.map((folder) => ({
                      value: folder.id,
                      label: folder.name,
                    }))
                  : []
              }
            />

            {errors.folderId && (
              <span className="text-red-500">{errors.folderId.message}</span>
            )}

            {selectedType === 'Curso' && (
              <>
                <div className="flex gap-4">
                  <Input
                    placeholder="Título do capítulo"
                    value={chapterData.title}
                    onChange={(e) =>
                      setChapterData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Início (mm:ss)"
                    value={chapterData.startTime}
                    onChange={(e) =>
                      setChapterData((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Fim (mm:ss)"
                    value={chapterData.endTime}
                    onChange={(e) =>
                      setChapterData((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                  />
                  <Button
                    text="Adicionar"
                    type="button"
                    onClick={handleAddChapter}
                  />
                </div>
                <div className="p-4 flex gap-6 max-w-full overflow-x-auto border-dashed border-[1px] border-gray-500">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex flex-col gap-4 items-center mt-2 w-full"
                    >
                      <span className="text-white">{field.title}</span>
                      <span className="text-white">
                        {field.startTime} - {field.endTime}
                      </span>
                      <Button
                        text="Remover"
                        type="button"
                        onClick={() => remove(index)}
                        className="w-6 h-10 bg-red-500 hover:bg-red-700"
                      />
                    </div>
                  ))}
                </div>
                {errors.chapters && (
                  <span className="text-red-500">
                    {errors.chapters.message}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            text="Cancelar"
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-red-500 hover:bg-red-600"
          />
          <Button text="Criar vídeo" type="submit" loading={loading} />
        </div>
      </form>
    </CustomModal.Root>
  )
}
