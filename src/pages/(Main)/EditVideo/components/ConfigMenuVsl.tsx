import { z } from 'zod'
import { motion } from 'framer-motion'
import { useEffect, useState, type FC } from 'react'
import { useVideo } from '../../../../hooks'
import { filterObject } from '../../../../utils'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cardVariants } from '../../../../animations'
import { AddButtonModal, addButtonSchema } from './AddButtonModal'
import type {
  EditPlayerVideoProps,
  Video,
  VideoButton,
} from '../../../../types'
import {
  Button,
  CheckBox,
  Input,
  InputSelect,
  toastError,
  toastSuccess,
} from '../../../../components'
import * as Accordion from '@radix-ui/react-accordion'
import {
  DotsThree,
  GitCommit,
  Info,
  IntersectThree,
  Link,
  Play,
  UsersThree,
} from '@phosphor-icons/react'
import { ChevronDownIcon } from 'lucide-react'
import { AccordionMenuButton } from './AccordionMenuButton'

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
  fictitiousProgress: z.boolean().optional(),
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
  buttonsActive: z.boolean().optional(),
  VideoButtons: z.array(addButtonSchema).optional(),
  fictitiousProgressHeight: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export const ConfigMenuVsl: FC<ConfigMenuProps> = ({ setVideo, video }) => {
  const { editPlayerVideo } = useVideo()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditButton, setIsEditButton] = useState<{
    button: VideoButton
    index: number
  }>()

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

  const { append, remove, update } = useFieldArray({
    control,
    name: 'VideoButtons',
  })

  const handleAddButton = (button: VideoButton) => {
    append(button)

    return 'success'
  }

  const handleEditButton = (updatedButton: VideoButton, index: number) => {
    update(index, updatedButton)

    return 'success'
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
  console.log(video)
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[60%] border-l-[1px] border-l-solid border-[#333333] p-6 ml-4"
      >
        <span className="text-white text-lg flex items-start justify-start">
          Detalhes da apresentação
        </span>
        <span className="text-[#909090] text-sm mt-8">
          Edite aqui os detalhes da apresentação
        </span>

        <div className="mt-8">
          <Accordion.Root type="single" collapsible className="space-y-4">
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
                        placeholder="https://img.youtube.com/vi/hqdefault.jpg"
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

            {/* Aparência */}
            <Accordion.Item
              value="aparencia"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <IntersectThree size={20} />
                  Aparência
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
                  <label
                    htmlFor="colorSmartPlayers"
                    className="text-white text-sm"
                  >
                    Cor do Smart AutoPlay:
                  </label>
                  <div className="flex items-start justify-start gap-2 my-2">
                    <Controller
                      control={control}
                      name="colorSmartPlayers"
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
                      name="colorSmartPlayers"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          className="w-full h-10 ml-2"
                        />
                      )}
                    />
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Assistindo agora */}
            <Accordion.Item
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
            </Accordion.Item>

            {/* Smart AutoPlay */}
            <Accordion.Item
              value="smart-autoplay"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <Play size={20} />
                  Smart AutoPlay
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
                      name="smartAutoPlay"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">Ativo</span>
                  </div>
                  <label
                    htmlFor="UrlCoverImageVideoPause"
                    className="text-white text-sm"
                  >
                    Texto de Cima:
                  </label>
                  <Controller
                    control={control}
                    name="TextTopSmartAutoPlay"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-10 mt-4 mb-4"
                        placeholder="Texto de cima do smart auto play"
                      />
                    )}
                  />
                  <label
                    htmlFor="UrlCoverImageVideoPause"
                    className="text-white text-sm"
                  >
                    Texto de Baixo:
                  </label>
                  <Controller
                    control={control}
                    name="TextButtonSmartAutoPlay"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-10 mt-4 mb-4"
                        placeholder="Texto de baixo do smart auto play"
                      />
                    )}
                  />
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Progresso fictício */}
            <Accordion.Item
              value="progresso-fictício"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <GitCommit size={20} />
                  Progresso fictício
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
                      name="fictitiousProgress"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">Ativo</span>
                  </div>
                  <label
                    htmlFor="fictitiousProgressHeight"
                    className="text-white text-sm"
                  >
                    Tamanho:
                  </label>
                  <Controller
                    control={control}
                    name="fictitiousProgressHeight"
                    render={({ field, fieldState: { error } }) => (
                      <InputSelect
                        {...field}
                        options={[
                          { value: '12px', label: '12px' },
                          { value: '14px', label: '14px' },
                          { value: '16px', label: '16px' },
                          { value: '18px', label: '18px' },
                          { value: '20px', label: '20px' },
                          { value: '24px', label: '24px' },
                          { value: '26px', label: '26px' },
                          { value: '28px', label: '28px' },
                          { value: '30px', label: '30px' },
                          { value: '32px', label: '32px' },
                          { value: '34px', label: '34px' },
                          { value: '36px', label: '36px' },
                          { value: '38px', label: '38px' },
                          { value: '40px', label: '40px' },
                        ]}
                        className="w-full h-10 mt-4 mb-4"
                        placeholder="Tamanho da fonte"
                        error={error?.message}
                      />
                    )}
                  />

                  <label htmlFor="color" className="text-white text-sm">
                    Cor do Progresso:
                  </label>
                  <div className="flex items-start justify-start gap-2 my-2">
                    <Controller
                      control={control}
                      name="color"
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
                      name="color"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          className="w-full h-10 ml-2"
                        />
                      )}
                    />
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>

            {/* CTA */}
            <Accordion.Item
              value="cta"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <Link size={20} />
                  Botão ( CTA )
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
                      name="buttonsActive"
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
                    {video.VideoButtons &&
                      video.VideoButtons.map((button, index) => {
                        return (
                          <div
                            className="flex gap-2 my-4 flex-col bg-[#141414] rounded"
                            key={index}
                          >
                            <div className="w-full p-4 flex justify-between">
                              <div className="flex flex-col">
                                <span className="text-white text-sm font-medium">
                                  {button.buttonText}
                                </span>
                                <span className="text-[#909090] text-sm font-normal">
                                  {button.buttonLink}
                                </span>
                                <span className="text-[#909090] text-sm font-normal">
                                  {button.startTime} | {button.endTime}
                                </span>
                              </div>
                              <AccordionMenuButton
                                index={index}
                                button={button}
                                handleDeleted={remove}
                                setIsModalOpen={setIsModalOpen}
                                setIsEditButton={setIsEditButton}
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
                    text="Adicionar Botão"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  />
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>

            {/* Outros */}
            <Accordion.Item
              value="Outros"
              className="bg-[#1D1D1D] text-white rounded-lg py-5 px-4"
            >
              <Accordion.Header className="flex justify-between items-center">
                <Accordion.Trigger className="w-full flex items-center justify-start gap-2">
                  <DotsThree size={20} />
                  Outros
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
                      name="ImageVideoPause"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">
                      Exibir imagem assim que o vídeo for pausado
                    </span>
                  </div>
                  <label
                    htmlFor="UrlCoverImageVideoPause"
                    className="text-white text-sm"
                  >
                    Url de imagem para mostrar ao vídeo ser pausado:
                  </label>
                  <Controller
                    control={control}
                    name="UrlCoverImageVideoPause"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-10 mt-4 mb-4"
                        placeholder="https://img.youtube.com/vi/hqdefault.jpg"
                      />
                    )}
                  />

                  <p className="text-[#909090] text-sm">
                    Indicamos hospedar as imagens no{' '}
                    <a
                      href="https://postimages.org"
                      className="text-[#187BF0]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      postimages.org
                    </a>
                  </p>

                  <div className="flex gap-2 my-4">
                    <Controller
                      control={control}
                      name="ImageOfFinished"
                      render={({ field }) => (
                        <CheckBox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <span className="text-[#909090] text-sm">
                      Exibir imagem assim que o vídeo finalizar
                    </span>
                  </div>
                  <label
                    htmlFor="UrlCoverImageVideoPause"
                    className="text-white text-sm"
                  >
                    Url de imagem para mostrar ao vídeo ser finalizado:
                  </label>
                  <Controller
                    control={control}
                    name="UrlCoverImageOfFinished"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        className="w-full h-10 mt-4 mb-4"
                        placeholder="https://img.youtube.com/vi/hqdefault.jpg"
                      />
                    )}
                  />
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>

        <Button type="submit" variant="primary" className="mt-8 w-full h-10 ">
          Salvar configurações
        </Button>
      </form>
      <AddButtonModal
        isEditButton={isEditButton}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddButton={handleAddButton}
        handleEditButton={handleEditButton}
      />
    </>
  )
}
