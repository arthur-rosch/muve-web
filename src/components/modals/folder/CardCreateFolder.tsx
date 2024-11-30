import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderPlus } from 'lucide-react';
import { Modal, Card } from '@/components';
import type { Video } from '@/types';
import { CreateFolderModal } from './CreateFolderModal';


const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const iconVariants = {
  initial: { rotate: 0 },
  hover: { 
    rotate: 15,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    }
  },
};

export function CreateFolderCard({ videosNotFolderId }:{videosNotFolderId: Video[]}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover="hover"
        whileTap="tap"
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Card className="w-72 h-36 mt-4 rounded border border-neutral-800 bg-transparent hover:border-[#187BF0] hover:bg-[#187BF014] transition-colors duration-300 group">
          <div className="p-6 flex flex-col items-start justify-between h-full">
            <motion.div
              variants={iconVariants}
              className="text-neutral-400 group-hover:text-[#187BF0] transition-colors duration-300"
            >
              <FolderPlus size={32} />
            </motion.div>
            <span className="text-lg text-neutral-400 group-hover:text-[#187BF0] transition-colors duration-300">
              + Nova Pasta
            </span>
          </div>
        </Card>
      </motion.div>

       <CreateFolderModal
        isOpen={isOpen}
        videos={videosNotFolderId}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}