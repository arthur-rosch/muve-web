import { motion } from 'framer-motion';
import { cardVariants } from '@/animations';
import { FolderDashed } from '@phosphor-icons/react';

export function EmptyFolderState() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-full h-full flex flex-col items-center justify-center mt-6 gap-4"
    >
      <FolderDashed size={44} color="white" />
      <span className="text-white text-sm">
        Sem pastas criadas
      </span>
    </motion.div>
  );
}