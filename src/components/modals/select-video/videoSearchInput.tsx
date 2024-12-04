import { Input } from '../..'
import { motion } from 'framer-motion';

interface VideoSearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function VideoSearchInput({ searchTerm, onSearchChange }: VideoSearchInputProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-full flex flex-col"
    >
      <label htmlFor="videoSearch" className="text-white text-sm">
        Lista de vídeos
      </label>
      <Input
        id="videoSearch"
        type="text"
        className="w-full h-10 mt-7"
        placeholder="Pesquisar vídeo"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </motion.div>
  );
}