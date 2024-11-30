import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video as VideoIcon } from 'lucide-react';

import type { Folder } from '@/types';
import { formVariants } from '@/animations';
import { Modal, Button } from '@/components';
import { FormCreateVideo } from './FormCreateVideo';

interface CreateVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  folders: Folder[]; 
}

export function CreateVideoModal({ isOpen, onClose, folders }: CreateVideoModalProps) {
  const [success, setSuccess] = useState(false);


  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-4xl w-full"
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-center items-center border-b border-neutral-800 p-6">
            <h2 className="text-xl font-semibold text-white">Novo Vídeo</h2>
            <p className="text-sm text-neutral-400">Adicione um novo vídeo à sua conta</p>
        </div>

        {success ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className="p-8 text-center"
          >
            <div className="mb-4 text-[#187BF0]">
              <VideoIcon size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white mb-6">Vídeo criado com sucesso!</h3>
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
          <FormCreateVideo folders={folders} onClose={onClose} onSuccess={setSuccess}/>
        )}
      </div>
    </Modal>
  );
}