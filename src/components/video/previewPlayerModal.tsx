import type { Video } from '../../types'
import { useState, type FC } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism' // Você pode escolher outro tema
import {
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
  const [copiedIframe, setCopiedIframe] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const iframeCode16 = `<div style="width:100%;max-width:60rem;margin:auto"><div style="position:relative;width:100%;overflow:hidden;padding-top:56.25%;transition:0.25s;"><iframe style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%" src="https://web.muveplayer.com/player?videoId=${video.id}" scrolling="no" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div></div>`
  const iframeCode9 = `<div style="width:100%;max-width:360px;margin:auto"><div style="position:relative;width:100%;overflow:hidden;padding-top:177.7%;transition:0.25s;"><iframe style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%" src="https://web.muveplayer.com/player?videoId=${video.id}" scrolling="no" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div></div>`

  const iframeCode = video.format === '16/9' ? iframeCode16 : iframeCode9
  const videoLink = `https://web.muveplayer.com/player?videoId=${video.id}`

  const handleCopyIframe = () => {
    navigator.clipboard
      .writeText(iframeCode)
      .then(() => {
        setCopiedIframe(true)
        toastSuccess({
          text: 'Iframe copiado com sucesso',
        })
        setTimeout(() => setCopiedIframe(false), 2000)
      })
      .catch((err) => {
        console.error('Falha ao copiar: ', err)
      })
  }

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(videoLink)
      .then(() => {
        setCopiedLink(true)
        toastSuccess({
          text: 'Link copiado com sucesso',
        })
        setTimeout(() => setCopiedLink(false), 2000)
      })
      .catch((err) => {
        console.error('Falha ao copiar: ', err)
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

        <div className="w-full flex items-center justify-between py-4 px-6 border rounded-md bg-[#1e1e1e] border-none">
          <SyntaxHighlighter
            language="html"
            style={solarizedlight}
            customStyle={{
              borderRadius: '5px',
              padding: '10px',
              width: '100%',
              overflow: 'hidden',
              background: 'rgb(40, 44, 52)',
            }}
          >
            {iframeCode}
          </SyntaxHighlighter>
          <Copy
            size={32}
            onClick={handleCopyIframe}
            className={`cursor-pointer hover:text-[#187BF0] ${copiedIframe ? 'text-[#187BF0]' : 'text-white'} transition-color duration-300 ml-4`}
          />
        </div>

        <div className="w-full flex items-center justify-between py-4 px-6 border rounded-md bg-[#1e1e1e] border-none">
          <SyntaxHighlighter
            language="text"
            style={solarizedlight}
            customStyle={{
              borderRadius: '5px',
              padding: '10px',
              width: '100%',
              overflow: 'hidden',
              background: 'rgb(40, 44, 52)',
            }}
          >
            {videoLink}
          </SyntaxHighlighter>
          <Copy
            size={32}
            onClick={handleCopyLink}
            className={`cursor-pointer hover:text-[#187BF0] ${copiedLink ? 'text-[#187BF0]' : 'text-white'} transition-color duration-300 ml-4`}
          />
        </div>
      </div>
    </CustomModal.Root>
  )
}
