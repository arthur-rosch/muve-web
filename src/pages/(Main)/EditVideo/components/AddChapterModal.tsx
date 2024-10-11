import { type FC } from 'react'
import type { Video } from '../../../../types'
import { cardVariants } from '../../../../animations'
import {
  Input,
  Button,
  CustomModal,
  toastError,
  toastSuccess,
} from '../../../../components'

interface ChapterData {
  title: string
  startTime: string
  endTime: string
}

interface AddChapterModalProps {
  video: Video
  isModalOpen: boolean
  chapterData: ChapterData
  handleAddChapter: () => string
  setIsModalOpen: (value: boolean) => void
  setChapterData: React.Dispatch<React.SetStateAction<ChapterData>>
}

export const AddChapterModal: FC<AddChapterModalProps> = ({
  video,
  isModalOpen,
  chapterData,
  setChapterData,
  setIsModalOpen,
  handleAddChapter,
}) => {
  const handleValidationsChapters = () => {
    const result = handleAddChapter()

    const errorMessages = {
      durationError:
        'Não é possível adicionar um capítulo que ultrapassa a duração do vídeo',
      overlapError:
        'Não é possível adicionar um capítulo que sobreponha um intervalo existente.',
      fieldError: 'Todos os campos são obrigatório',
      timeError:
        'O horário de início não pode ser maior ou igual ao horário de término.',
    }

    // Verifica os erros de validação
    if (Object.values(errorMessages).includes(result)) {
      toastError({ text: result })
    }
    // Se não houver erro, exibe a mensagem de sucesso
    else if (result === 'success') {
      toastSuccess({ text: 'Capítulo adicionado com sucesso' })
    }
  }

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
                value={chapterData.title}
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
                  isMask={true}
                  mask="99:99:99"
                  placeholder="hh:mm:ss"
                  className="w-full h-10 mt-2 mb-2"
                  value={chapterData.startTime}
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
                  isMask={true}
                  mask="99:99:99"
                  placeholder="hh:mm:ss"
                  className="w-full h-10 mt-2 mb-2"
                  value={chapterData.endTime}
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
            onClick={handleValidationsChapters}
            className="w-full flex items-center justify-center py-3 px-4 h-10"
          >
            Adicionar
          </Button>
        </div>
      </>
    </CustomModal.Root>
  )
}
