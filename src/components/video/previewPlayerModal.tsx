import { useState, type FC } from 'react'
import type { Video } from '../../types'
import {
  Input,
  CustomModal,
  VslPreviewPlayer,
  CursePreviewPlayer,
  toastSuccess,
} from '../'
import { Copy } from '@phosphor-icons/react'

interface PreviewPlayerModalProps {
  video: Video
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
}

export const PreviewPlayerModal: FC<PreviewPlayerModalProps> = ({
  video,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [copied, setCopied] = useState(false)
  const iframeCode = `<iframe style="max-width:100%;width:745px;display:block;aspect-ratio:1.767;margin:auto" src="https://web.muveplayer.com/player?videoId=${video.id}" allow="autoplay; gyroscope; picture-in-picture;" allowfullscreen="" frameBorder="0"></iframe>`

  const handleCopy = () => {
    navigator.clipboard
      .writeText(iframeCode)
      .then(() => {
        setCopied(true)
        toastSuccess({
          text: 'Iframe copiado com sucesso',
        })
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <CustomModal.Root
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      styles={'h-auto w-[50rem] flex flex-col mt-auto'}
    >
      <CustomModal.Title
        title={video.name}
        setIsOpen={setIsModalOpen}
        subTitle={video.type}
      />

      <div className="w-full h-full flex flex-col justify-between">
        <div className="min-w-full max-w-full h-[35rem] p-6">
          {video.type === 'Vsl' ? (
            <VslPreviewPlayer video={video} key={video.id} />
          ) : (
            <CursePreviewPlayer video={video} key={video.id} />
          )}
        </div>
        <div className="w-full flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333] gap-2">
          <Input
            id="coverUrl"
            type="text"
            disabled={true}
            placeholder={`<iframe style="max-width:100%;width:745px;display:block;aspect-ratio:1.767;margin:auto" src="${iframeCode}" allow="autoplay; gyroscope; picture-in-picture;" allowfullscreen="" frameBorder="0"></iframe>`}
            className="w-full h-10"
          />
          <Copy
            size={32}
            onClick={handleCopy}
            className={` cursor-pointer hover:text-[#187BF0] ${copied ? 'text-[#187BF0]' : 'text-white'} transition-color duration-300`}
          />
        </div>
      </div>
    </CustomModal.Root>
  )
}
