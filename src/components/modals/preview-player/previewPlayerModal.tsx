import { toast } from 'sonner';
import { X } from 'lucide-react';
import type { Video } from '@/types';
import { CodeBlock } from './codeBlock';
import { useState, type FC } from 'react';
import { Modal, VslPreviewPlayer, CursePreviewPlayer } from '@/components';

interface PreviewPlayerModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewPlayerModal: FC<PreviewPlayerModalProps> = ({
  video,
  isOpen,
  onClose,
}) => {
  const iframeCode16 = `<div style="width:100%;max-width:60rem;margin:auto"><div style="position:relative;width:100%;overflow:hidden;padding-top:56.25%;transition:0.25s;"><iframe style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%" src="https://player.muveplayer.com/?videoId=${video.id}" scrolling="no" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div></div>`;
  const iframeCode9 = `<div style="width:100%;max-width:360px;margin:auto"><div style="position:relative;width:100%;overflow:hidden;padding-top:177.7%;transition:0.25s;"><iframe style="position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%" src="https://player.muveplayer.com/?videoId=${video.id}" scrolling="no" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div></div>`;

  const iframeCode = video.format === '16/9' ? iframeCode16 : iframeCode9;
  const videoLink = `https://player.muveplayer.com/?videoId=${video.id}`;

  const handleCopyIframe = () => {
    navigator.clipboard.writeText(iframeCode).then(() => {
      toast.success('Iframe copiado com sucesso');
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoLink).then(() => {
      toast.success('Link copiado com sucesso');
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[50rem] flex flex-col"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{video.name}</h2>
          <p className="text-gray-400">{video.type}</p>
        </div>
      </div>

      <div className="w-full h-full flex flex-col gap-4">
        <div className="min-w-full max-w-full h-[35rem]">
          {video.type === 'Vsl' ? (
            <VslPreviewPlayer video={video} key={video.id} />
          ) : (
            <CursePreviewPlayer video={video} key={video.id} />
          )}
        </div>

        <CodeBlock
          code={iframeCode}
          language="html"
          onCopy={handleCopyIframe}
        />

        <CodeBlock
          code={videoLink}
          language="text"
          onCopy={handleCopyLink}
        />
      </div>
    </Modal>
  );
};