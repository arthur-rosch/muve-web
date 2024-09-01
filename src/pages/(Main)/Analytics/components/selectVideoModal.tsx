import type { FC } from 'react'
import { toast } from 'react-toastify'
import type { Video } from '../../../../types'
import { FilePlus } from '@phosphor-icons/react'
import { CustomModal, VideoThumbnail } from '../../../../components'

interface CustomModalSelectVideoProps {
  listVideos: Video[]
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  onSelectVideo: (video: Video) => void
}

export const CustomModalSelectVideo: FC<CustomModalSelectVideoProps> = ({
  listVideos,
  isModalOpen,
  setIsModalOpen,
  onSelectVideo,
}) => {
  const handleSelectVideo = (video: Video) => {
    onSelectVideo(video)
    setIsModalOpen(false)
    toast.success(`Vídeo selecionado com sucesso`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  return (
    <CustomModal.Root
      styles={'h-[50rem] w-[55rem]'}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    >
      <CustomModal.Title
        setIsOpen={setIsModalOpen}
        title={'Selecione o vídeo para análise'}
      />
      {listVideos.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-center text-white">
          <FilePlus size={32} />
          <p>Cadastre um video para ter analise dele</p>
        </div>
      ) : (
        <div className="w-full h-full max-h-full p-8 grid grid-cols-2 gap-4 overflow-auto">
          {listVideos.map((video) => (
            <div className="flex flex-col gap-2" key={video.id}>
              <VideoThumbnail url={video.url} />
              <button
                onClick={() => handleSelectVideo(video)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>
      )}
    </CustomModal.Root>
  )
}
