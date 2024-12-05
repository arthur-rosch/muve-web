import { toast } from 'sonner';
import { useState, type FC } from 'react';

import type { Video } from '@/types';
import { Button, Modal } from '@/components';
import { useFolder, useVideo } from '@/hooks';

import { FolderItem } from './folderItem';
import { EmptyFolderState } from './emptyFolderState';
import { X } from 'lucide-react';

interface MoveVideoModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

export const MoveVideoModal: FC<MoveVideoModalProps> = ({
  video,
  isOpen,
  onClose,
}) => {
    const [isLoading, setIsLoading] = useState(false);

  const { ediFolderIdVideo, getManyVideosNotFolderId } = useVideo();
  const { getAllFolderByUserId } = useFolder();
  const { data: allFolders } = getAllFolderByUserId;

  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(
    video.folderId
  );

  const handleSubmit = async () => {
    setIsLoading(true)
    if (selectedFolderId && video.folderId !== selectedFolderId) {
        setIsLoading(true)
      const { success } = await ediFolderIdVideo.mutateAsync({
        videoId: video.id,
        folderId: selectedFolderId,
      }).finally(() => setIsLoading(false));

      await getAllFolderByUserId.refetch()
      await getManyVideosNotFolderId(true).refetch()

      setIsLoading(false)
      if (success) {
        onClose();
        toast.success('Vídeo movido com sucesso');
      } else {
        toast.error('Ops... Algo deu errado');
      }
    }
    setIsLoading(false)
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl w-full"
    >

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
      </button>
        
      
        <div className="flex flex-col justify-center items-center border-b border-neutral-800 p-6">
          <h2 className="text-xl font-semibold text-white">+ Mover video</h2>
          <p className="text-gray-400">Seleciona a pasta para mover o video</p>
        </div>
      

      <div className="w-full max-h-[25rem] overflow-auto p-6">
        <div className="flex flex-col gap-2 mt-6">
          {allFolders && allFolders.length > 0 ? (
            allFolders.map((folder, index) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                index={index}
                isSelected={selectedFolderId === folder.id}
                onSelect={setSelectedFolderId}
              />
            ))
          ) : (
            <EmptyFolderState />
          )}
        </div>
      </div>

      <div className="w-full gap-12 flex items-center justify-between py-6 px-8 border-t-[1px] border-solid border-[#333333]">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="w-full flex items-center justify-center py-3 px-4 h-10 text-gray-300"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full flex items-center justify-center py-3 px-4 h-10"
        >
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};