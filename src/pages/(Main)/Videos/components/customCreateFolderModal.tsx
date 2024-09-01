import { toast } from 'react-toastify'
import { useState, type FC } from 'react'
import { useFolder } from '../../../../hooks'
import 'react-toastify/dist/ReactToastify.css'
import { CustomModal } from '../../../../components'

interface CustomCreateFolderModaProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export const CustomCreateFolderModal: FC<CustomCreateFolderModaProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [nameFolder, setNameFolder] = useState('')
  const { createFolder, getAllFolderByUserId } = useFolder()
  const handleCreateFolder = async (name: string) => {
    const { success } = await createFolder.mutateAsync({
      name,
    })

    if (success) {
      setIsModalOpen(false)
      await getAllFolderByUserId.refetch()
      toast.success(`Pasta criada com sucesso`, {
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
  }

  return (
    <CustomModal.Root
      styles={'h-[25rem] w-[30rem]'}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    >
      <CustomModal.Title
        setIsOpen={setIsModalOpen}
        title={'Crie a sua pasta'}
      />
      <div className="w-full h-full max-h-full p-8 flex flex-col justify-between">
        <input
          type="text"
          placeholder="Nome da pasta"
          onChange={(e) => setNameFolder(e.target.value)}
          className="w-full h-14 bg-[#1d1f21] text-white border border-gray-600 rounded-md p-2 focus:border-[#217CE5] focus:outline-none"
        />
        <button
          onClick={() => handleCreateFolder(nameFolder)}
          className="w-full mt-4 p-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Criar
        </button>
      </div>
    </CustomModal.Root>
  )
}
