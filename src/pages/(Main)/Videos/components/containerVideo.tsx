import { useVideo } from '../../../../hooks'
import type { Video } from '../../../../types'
import { useRef, useState, type FC } from 'react'
import { CopySimple, Eye } from '@phosphor-icons/react'
import { CustomPreviewPlayerModal } from './customPreviewPlayerModal'
import {
  Input,
  toastError,
  toastSuccess,
  VideoThumbnail,
} from '../../../../components'

export const ContainerVideo: FC<{ video: Video }> = ({ video }) => {
  const { deleteVideo, getAllVideosByUserId } = useVideo('')

  const [isOpenPreviewPlayerModal, setIsOpenPreviewPlayerModal] =
    useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const copyToClipboard = () => {
    if (inputRef.current) {
      console.log(inputRef.current)
      navigator.clipboard
        .writeText(video.url)
        .then(() => {
          toastSuccess({
            text: `Texto copiado para a área de transferência`,
          })
          console.log('Texto copiado para a área de transferência')
        })
        .catch((err) => {
          toastError({
            text: `Falha ao copiar para a área de transferência`,
          })
          console.error('Falha ao copiar para a área de transferência', err)
        })
    }
  }

  const handleDeleteVideo = async () => {
    const { success } = await deleteVideo.mutateAsync(video.id)

    if (success) {
      toastSuccess({
        text: `Vídeo excluído com sucesso`,
      })

      await getAllVideosByUserId.refetch()
    } else {
      toastError({
        text: `Algo deu errado, tente mais tarde`,
      })
    }
  }

  return (
    <>
      <div className="w-[90%] h-96 border-[1px] border-gray-600 rounded justify-between p-4 flex flex-col overflow-hidden">
        <div className="w-full">
          <VideoThumbnail url={video.url} />
          <Input
            type="text"
            value={video.url}
            placeholder={video.url}
            className="w-full h-10 bg-[#1d1f21] text-gray-600 border border-[#217CE5] rounded-md p-2 mt-2 focus:outline-none"
          />
        </div>
        <div className="flex items-end justify-between mt-8">
          <div>
            <button
              onClick={() => setIsOpenPreviewPlayerModal(true)}
              className="h-10 px-4 text-white rounded-md transition hover:text-[#217CE5]"
              type="button"
            >
              <Eye size={32} />
            </button>
            <button
              className="h-10 px-4 text-white rounded-md transition hover:text-[#217CE5]"
              type="button"
              onClick={copyToClipboard}
            >
              <CopySimple size={32} />
            </button>
          </div>

          <button
            onClick={handleDeleteVideo}
            className="h-10 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            type="button"
          >
            Deletar
          </button>
        </div>
      </div>
      <CustomPreviewPlayerModal
        video={video}
        isModalOpen={isOpenPreviewPlayerModal}
        setIsModalOpen={setIsOpenPreviewPlayerModal}
      />
    </>
  )
}
