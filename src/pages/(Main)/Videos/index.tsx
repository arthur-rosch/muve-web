import { useState, type FC } from 'react'
import type { Folder } from '../../../types'
import { useFolder, useVideo } from '../../../hooks'
import { ArrowCircleLeft } from '@phosphor-icons/react'
import {
  ContainerVideo,
  ContainerFolder,
  CustomCreateFolderModal,
  CustomCreateVideoModal,
} from './components'

export const Video: FC = () => {
  const [isOpenCreateVideoModal, setIsOpenCreateVideoModal] =
    useState<boolean>(false)

  const [isOpenCreateFolderModal, setIsOpenCreateFolderModal] =
    useState<boolean>(false)

  const [urlVideo, setUrlVideo] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)

  const { getAllFolderByUserId } = useFolder()
  const { data: folders } = getAllFolderByUserId

  const { getAllVideosByUserId } = useVideo()
  const { data: videos } = getAllVideosByUserId

  const handleCloseFolder = () => {
    setSelectedFolder(null)
  }

  return (
    <>
      <div className="w-full h-screen p-8 pb-24 flex flex-col gap-4">
        <div className="w-full flex items-center justify-center">
          <input
            type="text"
            onChange={(e) => setUrlVideo(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=YkVhsv5rkU"
            className="w-[40%] h-10 bg-[#1d1f21] text-white border border-gray-600 rounded-md p-2 focus:border-[#217CE5] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsOpenCreateVideoModal(true)}
            className="ml-2 h-10 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
          <button
            type="button"
            onClick={() => setIsOpenCreateFolderModal(true)}
            className="ml-2 h-10 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Criar Pasta
          </button>
        </div>

        <>
          {selectedFolder ? (
            <div className="w-full h-full border-[1px] border-gray-600 flex flex-col p-8">
              <h1 className="text-white text-2xl font-bold mb-2 flex items-center gap-2">
                <button onClick={handleCloseFolder}>
                  <ArrowCircleLeft size={23} weight="fill" color="white" />
                </button>
                Pasta: {selectedFolder.name}
              </h1>
              <div className="w-full h-full grid grid-cols-3 gap-1 overflow-y-auto">
                {selectedFolder.videos.map((video) => (
                  <ContainerVideo key={video.id} video={video} />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full border-[1px] border-gray-600 flex flex-col gap-4 p-8 overflow-y-auto">
              <div className="grid grid-cols-4 gap-4">
                {folders &&
                  folders.length > 0 &&
                  folders.map((folder) => (
                    <ContainerFolder
                      key={folder.id}
                      folder={folder}
                      setSelectedFolder={setSelectedFolder}
                    />
                  ))}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {videos &&
                  videos
                    .filter((video) => video.folderId === null)
                    .map((video) => (
                      <ContainerVideo key={video.id} video={video} />
                    ))}
              </div>
            </div>
          )}
        </>
      </div>
      <CustomCreateFolderModal
        isModalOpen={isOpenCreateFolderModal}
        setIsModalOpen={setIsOpenCreateFolderModal}
      />
      <CustomCreateVideoModal
        urlVideo={urlVideo}
        isModalOpen={isOpenCreateVideoModal}
        setIsModalOpen={setIsOpenCreateVideoModal}
      />
    </>
  )
}
