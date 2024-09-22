import { z } from 'zod'
import { motion } from 'framer-motion'
import { useState, type FC } from 'react'
import { useFolder } from '../../../../../../hooks'
import type { Video } from '../../../../../../types'
import { FolderDashed } from '@phosphor-icons/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cardVariants, listItensDelay } from '../../../../../../animations'
import {
  Input,
  Button,
  CheckBox,
  CustomModal,
} from '../../../../../../components'

const schema = z.object({
  folderName: z.string().min(1, 'Nome da pasta é obrigatório'),
  coverUrl: z
    .string()
    .url('URL da capa deve ser um link válido')
    .min(1, 'URL da capa é obrigatória')
    .refine((url) => /\.(jpeg|jpg|png|gif|bmp|webp|svg)$/i.test(url), {
      message:
        'A URL deve terminar com uma extensão de arquivo de imagem válida (jpeg, jpg, png, gif, bmp, webp, svg)',
    })
    .optional(),
  videoIds: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof schema>

interface CreateFolderModalProps {
  isModalOpen: boolean
  videosNotFolderId: Video[]
  setIsModalOpen: (value: boolean) => void
}

export const CreateFolderModal: FC<CreateFolderModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  videosNotFolderId,
}) => {
  const { createFolder, getAllFolderByUserId } = useFolder()

  const [loading, setLoading] = useState(false)
  const [createdSuccess, setCreatedSuccess] = useState(false)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      folderName: '',
      coverUrl: '',
      videoIds: [],
    },
  })

  const handleVideoCheckedChange = (checked: boolean, videoId: string) => {
    const currentVideoIds = watch('videoIds') || []
    if (checked) {
      setValue('videoIds', [...currentVideoIds, videoId])
    } else {
      setValue(
        'videoIds',
        currentVideoIds.filter((id) => id !== videoId),
      )
    }
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(!loading)
    const { success } = await createFolder.mutateAsync({
      name: data.folderName,
      coverUrl: data.coverUrl,
      videosId: data.videoIds,
    })

    if (success) {
      reset()
      setLoading(!loading)
      setCreatedSuccess(!createdSuccess)
      await getAllFolderByUserId.refetch()
    }
  }

  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-auto w-[50rem] flex flex-col'}
    >
      <CustomModal.Title
        title="+ Nova pasta"
        setIsOpen={setIsModalOpen}
        subTitle="Adicione aqui uma nova pasta"
      />
      {createdSuccess ? (
        <>
          <CustomModal.Success text="Pasta criada com sucesso" />
          <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
            <Button
              type="button"
              variant="primary"
              animation={true}
              variants={cardVariants}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
              onClick={() => setIsModalOpen(false)}
            >
              Confirmar
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full p-6">
            <div className="w-full flex flex-col gap-6">
              <div className="flex gap-4">
                <motion.div
                  className="w-full"
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <label htmlFor="folderName" className="text-white text-sm">
                    Nome da pasta
                  </label>
                  <Controller
                    name="folderName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="folderName"
                        type="text"
                        placeholder="Nome"
                        className="w-full h-10 mt-2 mb-2"
                      />
                    )}
                  />
                  {errors.folderName && (
                    <span className="text-red-500 text-xs">
                      {errors.folderName.message}
                    </span>
                  )}
                </motion.div>
                <motion.div
                  className="w-full"
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <label htmlFor="coverUrl" className="text-white text-sm">
                    Capa
                  </label>
                  <Controller
                    name="coverUrl"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="coverUrl"
                        type="text"
                        placeholder="https://imagem.com"
                        className="w-full h-10 mt-2 mb-2"
                      />
                    )}
                  />
                  {errors.coverUrl && (
                    <span className="text-red-500 text-xs">
                      {errors.coverUrl.message}
                    </span>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="w-full flex flex-col"
              >
                <label htmlFor="videoIds" className="text-white text-sm">
                  Lista de vídeos
                </label>
                <Input
                  type="text"
                  className="w-full h-10 mt-7"
                  placeholder="Pesquisar video"
                />
              </motion.div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              {videosNotFolderId && videosNotFolderId?.length > 0 ? (
                videosNotFolderId.map((video, index) => (
                  <motion.div
                    key={index}
                    className="w-full mt-6 flex border-b-[1px] border-[#333333] pb-4 gap-4 items-center justify-between"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={listItensDelay}
                  >
                    <div className="flex gap-4">
                      <img
                        className="w-28 h-14 rounded"
                        alt="thumbnail video"
                        src="https://s2-techtudo.glbimg.com/SSAPhiaAy_zLTOu3Tr3ZKu2H5vg=/0x0:1024x609/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg"
                      />
                      <div className="flex flex-col items-start justify-center gap-2">
                        <span className="text-white text-sm font-semibold">
                          {'teste'}
                        </span>
                        <span className="text-[#909090] text-sm font-semibold">
                          {video.analytics.totalViews} views
                        </span>
                      </div>
                    </div>
                    <CheckBox
                      onCheckedChange={(checked) =>
                        handleVideoCheckedChange(checked, video.id)
                      }
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  className="w-full h-full flex flex-col items-center justify-center mt-6 gap-4"
                >
                  <FolderDashed size={44} color="white" />
                  <span className="text-white text-sm">
                    Sem videos fora de pastas
                  </span>
                </motion.div>
              )}
            </div>
          </div>
          <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
            <Button
              type="button"
              variant="danger"
              animation={true}
              variants={cardVariants}
              onClick={() => setIsModalOpen(false)}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="primary"
              animation={true}
              variants={cardVariants}
              className="w-full flex items-center justify-center py-3 px-4 h-10"
              onClick={handleSubmit(onSubmit)}
            >
              Confirmar
            </Button>
          </div>
        </>
      )}
    </CustomModal.Root>
  )
}
