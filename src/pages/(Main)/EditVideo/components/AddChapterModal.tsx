import { type FC } from 'react'
import type { Video } from '../../../../types'
import { cardVariants } from '../../../../animations'
import { Input, Button, CustomModal } from '../../../../components'

interface ChapterData {
  title: string
  startTime: string
  endTime: string
}

interface AddChapterModalProps {
  video: Video
  isModalOpen: boolean
  handleAddChapter: () => void
  setIsModalOpen: (value: boolean) => void
  setChapterData: React.Dispatch<React.SetStateAction<ChapterData>>
}

export const AddChapterModal: FC<AddChapterModalProps> = ({
  video,
  isModalOpen,
  setChapterData,
  setIsModalOpen,
  handleAddChapter,
}) => {
  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-auto w-[50rem] flex flex-col m-auto'}
    >
      <CustomModal.Title
        title={video.name}
        setIsOpen={setIsModalOpen}
        subTitle={video.type}
      />

      <>
        <div className="min-w-full max-w-full max-h-[35rem] p-6">
          <div className="mr-4">
            <div className="mt-6">
              <label htmlFor="chapterTitle" className="text-white text-sm">
                Título do capítulo
              </label>
              <Input
                id="chapterTitle"
                type="text"
                placeholder="Título do capítulo"
                className="w-full h-10 mt-2 mb-2"
                onChange={(e) =>
                  setChapterData((prev: ChapterData) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex flex-col w-full">
                <label htmlFor="startTime" className="text-white text-sm">
                  Início
                </label>
                <Input
                  id="startTime"
                  type="text"
                  placeholder="mm:ss"
                  className="w-full h-10 mt-2 mb-2"
                  onChange={(e) =>
                    setChapterData((prev: ChapterData) => ({
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
                  onChange={(e) =>
                    setChapterData((prev: ChapterData) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
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
            Fechar
          </Button>
          <Button
            type="button"
            variant="primary"
            animation={true}
            variants={cardVariants}
            onClick={handleAddChapter}
            className="w-full flex items-center justify-center py-3 px-4 h-10"
          >
            Adicionar
          </Button>
        </div>
      </>
    </CustomModal.Root>
  )
}
