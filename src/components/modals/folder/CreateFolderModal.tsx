import { useState } from 'react';
import { Folder } from 'lucide-react';
import { motion } from 'framer-motion';

import type { Video } from '@/types';
import { formVariants } from '@/animations';
import { Button, Modal } from '@/components';
import { FormFolderModal } from './FormFolderModal';


interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: Video[];
}

export function CreateFolderModal({ isOpen, onClose, videos }: CreateFolderModalProps) {
  const [success, setSuccess] = useState(false);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-4xl w-full"
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-center items-center border-b border-neutral-800 p-6">
            <h2 className="text-xl font-semibold text-white">Nova Pasta</h2>
            <p className="text-sm text-neutral-400">Crie uma nova pasta para organizar seus vídeos</p>
        </div>

        {success ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className="p-8 text-center"
          >
            <div className="mb-4 text-[#187BF0]">
              <Folder size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white mb-6">Pasta criada com sucesso!</h3>
            <Button
              onClick={() => {
                onClose();
                setSuccess(false);
              }}
              className="w-full bg-[#187BF0] text-white hover:bg-[#1567cc]"
            >
              Fechar
            </Button>
          </motion.div>
        ) : (
          <>
            <FormFolderModal onClose={onClose} videos={videos} setSuccess={setSuccess}/>          
          </>
        )}
      </div>
    </Modal>
  );
}