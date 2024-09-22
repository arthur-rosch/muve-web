import logo from '../../../../../../assets/logo.svg'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useState, type FC } from 'react'
import { useFolder, useVideo } from '../../../../../../hooks'
import { MonitorPlay, Trash, Video as VideoIcon } from '@phosphor-icons/react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cardVariants } from '../../../../../../animations'
import {
  Button,
  CheckBox,
  CustomModal,
  Input,
  InputSelect,
  toastError,
} from '../../../../../../components'

const createVideoSchema = z.object({
  name: z.string(),
  url: z.string().url('URL inválida'),
  duration: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Duração deve estar no formato mm:ss'),
  folderId: z.string().optional(),
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

interface CreateVideoModalProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export const CreateVideoModal: FC<CreateVideoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { getAllFolderByUserId } = useFolder()
  const { createVideo, getAllVideosByUserId } = useVideo()

  const { data: folders } = getAllFolderByUserId

  const [createdSuccess, setCreatedSuccess] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<'9/16' | '16/9' | null>(
    null,
  )
  const [selectedType, setSelectedType] = useState<'Vsl' | 'Curso' | null>(null)
  const [chapterData, setChapterData] = useState({
    title: '',
    startTime: '',
    endTime: '',
  })

  const { register, reset, handleSubmit, watch, setValue, control, getValues } =
    useForm<CreateVideoFormValues>({
      resolver: zodResolver(createVideoSchema),
      defaultValues: {
        fictitiousProgress: false,
        chapters: [],
      },
    })

  const fictitiousProgress = watch('fictitiousProgress')

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chapters',
  })

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
      console.log(chapterData)
      setChapterData({ title: '', startTime: '', endTime: '' }) // Reset local state
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setValue('fictitiousProgress', checked)
  }

  const handleFormatChange = (value: '16/9' | '9/16') => {
    setSelectedFormat(value)
    setValue('format', value)
  }

  const handleTypeChange = (value: 'Vsl' | 'Curso') => {
    setSelectedType(value)
    setValue('type', value)

    if (value === 'Curso') {
      setValue('fictitiousProgress', false)
      setValue('color', '')
    } else {
      setValue('chapters', [])
    }
  }

  const onSubmit = async (data: CreateVideoFormValues) => {
    const { success, error } = await createVideo.mutateAsync({
      duration: data.duration,
      format: data.format,
      type: data.type,
      url: data.url,
      folderId: data.folderId,
      colorProgress: data.color,
      name: data.name,
      chapters: data.chapters,
    })

    console.log(error)

    if (success) {
      reset()
      setSelectedType(null)
      setSelectedFormat(null)
      setCreatedSuccess(true)
      await getAllVideosByUserId.refetch()
      await getAllFolderByUserId.refetch()
    } else if (error === 'Limite de vídeos excedido.') {
      toastError({ text: error })
    }
  }

  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-auto w-[50rem] flex flex-col'}
    >
      <CustomModal.Title
        title="+ Novo video"
        setIsOpen={setIsModalOpen}
        subTitle="Adicione aqui um novo vídeo à sua conta."
      />
      {createdSuccess ? (
        <>
          <CustomModal.Success text="Vídeo criado com sucesso" />
          <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
            <Button
              type="button"
              variant="primary"
              animation={true}
              variants={cardVariants}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
              onClick={() => {
                setIsModalOpen(false)
                setCreatedSuccess(false)
              }}
            >
              Confirmar
            </Button>
          </div>
        </>
      ) : (
        <>
          <motion.div
            className="w-full max-h-[80%] p-6"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="w-full flex flex-col gap-6">
              <motion.div className="max-h-[35rem] overflow-auto">
                <span className="text-white">Tipo de vídeo</span>

                <div className="flex gap-6 mt-8 items-center justify-center">
                  <div
                    className={`w-full h-48 rounded border-solid border-[1px] border-[#333333]`}
                  >
                    <div className="w-full h-36 bg-black flex items-center justify-center rounded">
                      <VideoIcon size={48} color="white" />
                    </div>
                    <footer className="w-full flex gap-2 px-4 py-2 bg-transparent border-solid border-t-[1px] border-[#333333]">
                      <CheckBox
                        checked={selectedType === 'Vsl'}
                        onCheckedChange={() => handleTypeChange('Vsl')}
                      />
                      <span className="text-white">Vsl</span>
                    </footer>
                  </div>

                  <div
                    className={`w-full h-48 rounded border-solid border-[1px] border-[#333333]`}
                  >
                    <div className="w-full h-36 bg-black flex items-center justify-center rounded">
                      <MonitorPlay size={48} color="white" />
                    </div>
                    <footer className="w-full flex gap-2 px-4 py-2 bg-transparent border-solid border-t-[1px] border-[#333333]">
                      <CheckBox
                        checked={selectedType === 'Curso'}
                        onCheckedChange={() => handleTypeChange('Curso')}
                      />
                      <span className="text-white">Curso</span>
                    </footer>
                  </div>
                </div>

                <div className="flex gap-4 mt-6 border-b-[1px] border-solid border-[#333333] pb-6">
                  <>
                    <CheckBox
                      checked={selectedFormat === '9/16'}
                      onCheckedChange={() => handleFormatChange('9/16')}
                    />
                    <span className="text-[#909090] text-sm">Formato 9/16</span>
                  </>

                  <>
                    <CheckBox
                      checked={selectedFormat === '16/9'}
                      onCheckedChange={() => handleFormatChange('16/9')}
                    />
                    <span className="text-[#909090] text-sm">Formato 16/9</span>
                  </>
                </div>

                {selectedType === 'Vsl' && (
                  <div className="flex flex-col mt-6">
                    <span className="text-white text-sm my-6">
                      Progresso fictício
                    </span>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center gap-2">
                        <CheckBox
                          checked={fictitiousProgress}
                          onCheckedChange={handleCheckboxChange}
                        />
                        <span className="text-[#909090] text-sm">
                          Progresso Fictício
                        </span>
                      </div>

                      <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="color"
                            placeholder="Selecione uma cor"
                            className="w-22 ml-2"
                          />
                        )}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6 mr-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="url" className="text-white text-sm">
                      Url
                    </label>
                    <Controller
                      name="url"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="url"
                          type="text"
                          placeholder="https://imagem.com"
                          className="w-full h-10 mt-2 mb-2"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="url" className="text-white text-sm">
                      Nome
                    </label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="url"
                          type="text"
                          placeholder="Video Teste"
                          className="w-full h-10 mt-2 mb-2"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6 mr-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="duration" className="text-white text-sm">
                      Duração do vídeo
                    </label>
                    <Controller
                      name="duration"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="duration"
                          type="text"
                          placeholder="mm:ss"
                          className="w-full h-10 mt-2 mb-2"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="folderId" className="text-white text-sm">
                      Selecionar vídeo
                    </label>
                    <InputSelect
                      options={folders!.map((folder) => ({
                        value: folder.id,
                        label: folder.name,
                      }))}
                      register={register('folderId')}
                      placeholder="Selecione uma pasta"
                      className="w-full h-10 mt-2 mb-2"
                    />
                  </div>
                </div>

                {selectedType === 'Curso' && (
                  <div className="mr-4">
                    <div className="mt-6">
                      <label
                        htmlFor="chapterTitle"
                        className="text-white text-sm"
                      >
                        Título do capítulo
                      </label>
                      <Input
                        id="chapterTitle"
                        type="text"
                        placeholder="Título do capítulo"
                        className="w-full h-10 mt-2 mb-2"
                        value={chapterData.title}
                        onChange={(e) =>
                          setChapterData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="flex gap-4 mt-6">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="startTime"
                          className="text-white text-sm"
                        >
                          Início
                        </label>
                        <Input
                          id="startTime"
                          type="text"
                          placeholder="mm:ss"
                          className="w-full h-10 mt-2 mb-2"
                          value={chapterData.startTime}
                          onChange={(e) =>
                            setChapterData((prev) => ({
                              ...prev,
                              startTime: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        <label htmlFor="endTime" className="text-white text-sm">
                          Fim
                        </label>
                        <Input
                          id="endTime"
                          type="text"
                          placeholder="mm:ss"
                          className="w-full h-10 mt-2 mb-2"
                          value={chapterData.endTime}
                          onChange={(e) =>
                            setChapterData((prev) => ({
                              ...prev,
                              endTime: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-end justify-end mt-6">
                      <Button
                        type="button"
                        variant="secondary"
                        text="Adicionar capitulo"
                        onClick={handleAddChapter}
                        className="w-60 h-10 rounded py-3 px-4 flex items-center justify-center"
                      />
                    </div>

                    <div className="w-full flex flex-col">
                      <span className="text-white text-sm my-6">Capítulos</span>
                      {getValues('chapters')?.map((chapter, index) => {
                        return (
                          <div
                            key={chapter.title}
                            className="w-full h-24 flex items-center justify-between border-solid border-[#333333] border-[1px] p-5 mb-2"
                          >
                            <div className="flex items-center justify-center gap-4">
                              <img
                                src={logo}
                                alt=""
                                className="w-24 h-20 rounded"
                              />
                              <div className="flex flex-col text-white">
                                <span>Capitulo: {chapter.title}</span>
                                <span>
                                  Inicio: {chapter.startTime} | Fim:{' '}
                                  {chapter.endTime}
                                </span>
                              </div>
                            </div>
                            <Trash
                              size={22}
                              color="red"
                              className="cursor-pointer"
                              onClick={() => {
                                remove(index)
                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Button
              type="button"
              variant="danger"
              animation={true}
              variants={cardVariants}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              animation={true}
              variants={cardVariants}
              onClick={handleSubmit(onSubmit)}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
            >
              Criar
            </Button>
          </motion.div>
        </>
      )}
    </CustomModal.Root>
  )
}
