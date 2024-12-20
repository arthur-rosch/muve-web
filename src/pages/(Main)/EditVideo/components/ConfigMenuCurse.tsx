import { z } from 'zod'
import { motion } from 'framer-motion'
import { AddChapterModal } from './AddChapterModal'
import { AccordionMenuChapter } from './AccordionMenuChapter'
import { useEffect, useState, type FC } from 'react'
import { useVideo } from '../../../../hooks'
import { filterObject } from '../../../../utils'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cardVariants } from '../../../../animations'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import type { EditPlayerVideoProps, Video } from '../../../../types'
import {
  Input,
  Button,
  CheckBox,
  toastError,
  toastSuccess,
} from '../../../../components'
import {
  Info,
  Video as VideoIcon,
  ClockCounterClockwise,
  CardsThree,
} from '@phosphor-icons/react'

interface ChapterData {
  title: string
  startTime: string
  endTime: string
}

interface ConfigMenuProps {
  video: Video
  setVideo: (video: Video | ((prevVideo: Video) => Video)) => void
}

const schema = z.object({
  name: z.string().optional(),
  thumbnail: z.string().optional(),
  format: z.enum(['9/16', '16/9']).optional(),
  color: z.string().optional(),
  colorSmartPlayers: z.string().optional(),
  playAndPause: z.boolean().optional(),
  progressBar: z.boolean().optional(),
  timeTraveled: z.boolean().optional(),
  videoDuration: z.boolean().optional(),
  volumeButton: z.boolean().optional(),
  volumeBar: z.boolean().optional(),
  speed: z.boolean().optional(),
  fullscreen: z.boolean().optional(),
  smartAutoPlay: z.boolean().optional(),
  UrlCoverSmartAutoPlay: z.string().optional(),
  TextTopSmartAutoPlay: z.string().optional(),
  TextButtonSmartAutoPlay: z.string().optional(),
  continueWatching: z.boolean().optional(),
  watchingNow: z.boolean().optional(),
  watchingNowFontSize: z.string().optional(),
  watchingNowBgColor: z.string().optional(),
  watchingNowTextColor: z.string().optional(),
  ImageVideoPause: z.boolean().optional(),
  UrlCoverImageVideoPause: z.string().optional(),
  ImageOfFinished: z.boolean().optional(),
  UrlCoverImageOfFinished: z.string().optional(),
  chapterMenu: z.boolean().optional(),
  fictitiousProgressHeight: z.string().optional(),
  Chapter: z
    .array(
      z.object({
        title: z.string().nonempty('Título do capítulo é obrigatório'),
        startTime: z
          .string()
          .regex(
            /^\d{1,2}:\d{2}:\d{2}$/,
            'Duração deve estar no formato hh:mm:ss',
          ),
        endTime: z
          .string()
          .regex(
            /^\d{1,2}:\d{2}:\d{2}$/,
            'Duração deve estar no formato hh:mm:ss',
          ),
      }),
    )
    .optional(),
})

type FormValues = z.infer<typeof schema>

export const ConfigMenuCurse: FC<ConfigMenuProps> = ({ setVideo, video }) => {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const watchedFields = watch()
  const { editPlayerVideo } = useVideo()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [chapterData, setChapterData] = useState({
    title: '',
    startTime: '',
    endTime: '',
  })

  const [isEditChapter, setIsEditChapter] = useState<{
    chapter: ChapterData
    index: number
  }>()

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'Chapter',
  })

  const handleAddChapter = () => {
    const { title, startTime, endTime } = chapterData

    if (title && startTime && endTime) {
      const convertToSeconds = (time: string) => {
        const [hours, minutes, seconds] = time.split(':').map(Number)
        return hours * 3600 + minutes * 60 + seconds
      }

      const newDuration = convertToSeconds(video.duration)
      const newStartTime = convertToSeconds(startTime)
      const newEndTime = convertToSeconds(endTime)

      console.log(newStartTime, newEndTime)

      if (newStartTime >= newEndTime) {
        return 'O horário de início não pode ser maior ou igual ao horário de término.'
      }

      if (newEndTime > newDuration) {
        return 'Não é possível adicionar um capítulo que ultrapassa a duração do vídeo.'
      }

      const isOverlapping = fields.some((chapter) => {
        const chapterStartTime = convertToSeconds(chapter.startTime)
        const chapterEndTime = convertToSeconds(chapter.endTime)
        return newStartTime < chapterEndTime && newEndTime > chapterStartTime
      })

      if (isOverlapping) {
        return 'Não é possível adicionar um capítulo que sobreponha um intervalo existente.'
      }

      append({ title, startTime, endTime })
      console.log(chapterData)
      setChapterData({ title: '', startTime: '', endTime: '' })

      return 'success'
    }

    return 'error'
  }

  const handleEditChapter = (index: number) => {
    const { title, startTime, endTime } = chapterData

    if (title && startTime && endTime) {
      const convertToSeconds = (time: string) => {
        const [hours, minutes, seconds] = time.split(':').map(Number)
        return hours * 3600 + minutes * 60 + seconds
      }

      const newDuration = convertToSeconds(video.duration)
      const newStartTime = convertToSeconds(startTime)
      const newEndTime = convertToSeconds(endTime)

      console.log(newStartTime, newEndTime)

      // Validação de início e término
      if (newStartTime >= newEndTime) {
        return 'O horário de início não pode ser maior ou igual ao horário de término.'
      }

      // Validação de duração do vídeo
      if (newEndTime > newDuration) {
        return 'Não é possível adicionar um capítulo que ultrapassa a duração do vídeo.'
      }

      // Validação de sobreposição ignorando o capítulo atual (com o índice recebido)
      const isOverlapping = fields.some((chapter, chapterIndex) => {
        if (chapterIndex === index) {
          return false // Ignora a validação para o capítulo que está sendo editado
        }
        const chapterStartTime = convertToSeconds(chapter.startTime)
        const chapterEndTime = convertToSeconds(chapter.endTime)

        // Verifica se os horários do novo capítulo sobrepõem algum outro
        return newStartTime < chapterEndTime && newEndTime > chapterStartTime
      })

      // Se houver sobreposição
      if (isOverlapping) {
        return 'Não é possível adicionar um capítulo que sobreponha um intervalo existente.'
      }

      // Atualiza o capítulo
      update(index, { title, startTime, endTime })
      console.log(chapterData)

      // Limpa os dados do formulário
      setChapterData({ title: '', startTime: '', endTime: '' })

      return 'success'
    }

    return 'error'
  }

  const onSubmit = async (data: FormValues) => {
    const { success } = await editPlayerVideo.mutateAsync({
      dataEdit: data as EditPlayerVideoProps,
      videoId: video.id,
    })

    if (success) {
      toastSuccess({
        text: 'Player editado com sucesso',
      })
    } else {
      toastError({
        text: 'Algo deu errado, tente mais tarde',
      })
    }
  }

  useEffect(() => {
    setVideo((prevVideo: Video) => {
      const updatedVideo: Video = {
        ...prevVideo,
        ...(watchedFields as unknown as Partial<Video>),
      }

      if (JSON.stringify(updatedVideo) !== JSON.stringify(prevVideo)) {
        return updatedVideo
      }

      return prevVideo
    })
  }, [watchedFields, setVideo])

  useEffect(() => {
    const schemaKeys = Object.keys(schema.shape) as (keyof FormValues)[]

    const filteredVideoData = filterObject(video, schemaKeys)

    schemaKeys.forEach((key) => {
      const value = filteredVideoData[key]
      if (value !== null && value !== undefined) {
        setValue(key, value)
      }
    })
  }, [video, setValue])

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[60%] border-l-[1px] border-l-solid border-[#333333] p-6 ml-4 max-h-full"
      >
        <span className="text-white text-lg flex items-start justify-start">
          Detalhes da apresentação
        </span>
        <span className="text-[#909090] text-sm mt-8">
          Edite aqui os detalhes da apresentação
        </span>

        <div className="mt-8">
          <Accordion.Root type="single" collapsible className="space-y-4">
            {/* Informações gerais */}
            <Accordion.Item
              value="informacoes-gerais"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <Info size={20} />
                  Informações gerais
                </Accordion.Trigger>
                <Accordion.Trigger className="flex items-center">
                  <ChevronDownIcon className="transition-transform duration-300 ease-in-out AccordionChevron" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="mt-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <label htmlFor="videoName" className="text-white text-sm">
                    Nome do vídeo
                  </label>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        type="text"
                        className="w-full h-10 mt-4 mb-4"
                        placeholder="Nome do vídeo"
                        {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}

                  <label htmlFor="thumbnail" className="text-white text-sm">
                    Link da capa do vídeo
                  </label>
                  <Controller
                    control={control}
                    name="thumbnail"
                    render={({ field }) => (
                      <Input
                        type="text"
                        className="w-full h-10 mt-4 mb-4"
                        placeholder="Link da capa"
                        {...field}
                      />
                    )}
                  />
                  {errors.thumbnail && (
                    <span className="text-red-500 text-sm">
                      {errors.thumbnail.message}
                    </span>
                  )}

                  <div className="flex gap-4 mt-6 pb-6">
                    <div className="flex items-center">
                      <Controller
                        control={control}
                        name="format"
                        render={({ field }) => (
                          <CheckBox
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? '9/16' : undefined)
                              console.log('Formato 9/16', checked)
                            }}
                            checked={field.value === '9/16'}
                          />
                        )}
                      />
                      <span className="text-[#909090] text-sm ml-2">
                        Formato 9/16
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Controller
                        control={control}
                        name="format"
                        render={({ field }) => (
                          <CheckBox
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? '16/9' : undefined)
                              console.log('Formato 16/9', checked)
                            }}
                            checked={field.value === '16/9'}
                          />
                        )}
                      />
                      <span className="text-[#909090] text-sm ml-2">
                        Formato 16/9
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Controles */}
            <Accordion.Item
              value="controles"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <VideoIcon size={20} />
                  Controles
                </Accordion.Trigger>
                <Accordion.Trigger className="flex items-center">
                  <ChevronDownIcon className="transition-transform duration-300 ease-in-out AccordionChevron" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="mt-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <div className="flex gap-2">
                    <Controller
                      control={control}
                      name="playAndPause"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">
                      Botão de Play e Pause
                    </span>
                  </div>
                  <div className="flex gap-2 my-2">
                    <Controller
                      control={control}
                      name="timeTraveled"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">
                      Tempo percorrido
                    </span>
                  </div>
                  <div className="flex gap-2 my-2">
                    <Controller
                      control={control}
                      name="videoDuration"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">
                      Duração do vídeo
                    </span>
                  </div>
                  <div className="flex gap-2 my-2">
                    <Controller
                      control={control}
                      name="volumeButton"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">
                      Botão de volume
                    </span>
                  </div>
                  <div className="flex gap-2 my-2">
                    <Controller
                      control={control}
                      name="volumeBar"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">
                      Barra de volume
                    </span>
                  </div>
                  <div className="flex gap-2 my-2">
                    <Controller
                      control={control}
                      name="speed"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">Velocidade</span>
                  </div>
                  <div className="flex gap-2 my-2">
                    <Controller
                      control={control}
                      name="fullscreen"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">Tela cheia</span>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Continue Assistindo */}
            <Accordion.Item
              value="continue-assistindo"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <ClockCounterClockwise size={20} />
                  Continue Assistindo
                </Accordion.Trigger>
                <Accordion.Trigger className="flex items-center">
                  <ChevronDownIcon className="transition-transform duration-300 ease-in-out AccordionChevron" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="mt-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <div className="flex gap-2 my-4">
                    <Controller
                      control={control}
                      name="continueWatching"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">Ativo</span>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Assistindo agora */}
            {/* <Accordion.Item
              value="assistindo-agora"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <UsersThree size={20} />
                  Assistindo agora
                </Accordion.Trigger>
                <Accordion.Trigger className="flex items-center">
                  <ChevronDownIcon className="transition-transform duration-300 ease-in-out AccordionChevron" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="mt-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <div className="flex gap-2 my-4">
                    <Controller
                      control={control}
                      name="watchingNow"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">
                      Exibir assistindo agora
                    </span>
                  </div>
                  <label
                    htmlFor="watchingNowFontSize"
                    className="text-white text-sm"
                  >
                    Tamanho da fonte:
                  </label>
                  <Controller
                    control={control}
                    name="watchingNowFontSize"
                    render={({ field, fieldState: { error } }) => (
                      <InputSelect
                        {...field}
                        options={[
                          { value: '12px', label: '12px' },
                          { value: '14px', label: '14px' },
                          { value: '16px', label: '16px' },
                          { value: '18px', label: '18px' },
                          { value: '20px', label: '20px' },
                        ]}
                        className="w-full h-10 mt-4 mb-4"
                        placeholder="Tamanho da fonte"
                        error={error?.message}
                      />
                    )}
                  />

                  <div className="flex items-start justify-start flex-col">
                    <label
                      htmlFor="watchingNowBgColor"
                      className="text-white text-sm"
                    >
                      Cor de fundo:
                    </label>

                    <div className="flex items-start justify-start gap-2 my-2">
                      <Controller
                        control={control}
                        name="watchingNowBgColor"
                        render={({ field }) => (
                          <Input
                            type="color"
                            className="h-10 outline-none border-none"
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="watchingNowBgColor"
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            className="w-full h-10 ml-2"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-start flex-col">
                    <label
                      htmlFor="watchingNowTextColor"
                      className="text-white text-sm"
                    >
                      Cor do texto:
                    </label>
                    <div className="flex items-start justify-start gap-2 my-2">
                      <Controller
                        control={control}
                        name="watchingNowTextColor"
                        render={({ field }) => (
                          <Input
                            type="color"
                            className="h-10 outline-none border-none"
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="watchingNowTextColor"
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            className="w-full h-10 ml-2"
                          />
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item> */}

            {/* Capítulos  */}
            <Accordion.Item
              value="capitulos"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <CardsThree size={20} />
                  Capítulos
                </Accordion.Trigger>
                <Accordion.Trigger className="flex items-center">
                  <ChevronDownIcon className="transition-transform duration-300 ease-in-out AccordionChevron" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="mt-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <div className="flex gap-2 my-4">
                    <Controller
                      control={control}
                      name="chapterMenu"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">Ativo</span>
                  </div>
                  <div className="max-h-[28%] h-auto overflow-auto">
                    {video.Chapter &&
                      video.Chapter.map((chapter, index) => {
                        return (
                          <div
                            className="flex gap-2 my-4 flex-col bg-[#141414] rounded"
                            key={index}
                          >
                            <div className="w-full p-4 flex justify-between">
                              <div className="flex flex-col">
                                <span className="text-white text-sm font-medium">
                                  {chapter.title}
                                </span>
                                <span className="text-[#909090] text-sm font-normal">
                                  {chapter.startTime} | {chapter.endTime}
                                </span>
                              </div>
                              <AccordionMenuChapter
                                chapter={chapter}
                                setIsEditChapter={setIsEditChapter}
                                setIsModalOpen={setIsModalOpen}
                                handleDeleted={remove}
                                index={index}
                              />
                            </div>
                          </div>
                        )
                      })}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-14"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >Adicionar capitulo</Button>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>

        <Button
          type="submit"
          className="mt-8 w-full h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Salvar configurações
        </Button>
      </form>
      <AddChapterModal
        video={video}
        isEditChapter={isEditChapter}
        chapterData={chapterData}
        isModalOpen={isModalOpen}
        setChapterData={setChapterData}
        setIsModalOpen={setIsModalOpen}
        handleEditChapter={handleEditChapter}
        handleAddChapter={handleAddChapter}
      />
    </>
  )
}
