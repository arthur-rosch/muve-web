import type { FC } from 'react'
import type { Folder } from '../../../../types'
import { Folder as IconFolder } from '@phosphor-icons/react'

export const ContainerFolder: FC<{
  folder: Folder
  setSelectedFolder: (folder: Folder) => void
}> = ({ folder, setSelectedFolder }) => {
  return (
    <div key={folder.id} className="w-[90%] max-h-[60%]">
      <button
        onClick={() => setSelectedFolder(folder)}
        className="text-white items-center justify-center flex-col"
      >
        <IconFolder size={82} weight="fill" color="white" />
        {folder.name}
      </button>
    </div>
  )
}
