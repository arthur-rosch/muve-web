import coverFolder from '@/assets/pastamuve.png';

import { motion } from 'framer-motion';
import { CheckBox } from '@/components';
import type { Folder } from '@/types';
import { listItensDelay } from '@/animations';

interface FolderItemProps {
  folder: Folder;
  index: number;
  isSelected: boolean;
  onSelect: (folderId: string) => void;
}

export function FolderItem({ folder, index, isSelected, onSelect }: FolderItemProps) {
  return (
    <motion.div
      key={folder.id}
      className="w-full mt-6 flex border-b-[1px] border-[#333333] pb-4 gap-4 items-center justify-between"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={listItensDelay}
    >
      <div className="flex gap-4">
        <img
          className="w-28 h-14 rounded"
          alt="thumbnail folder"
          src={folder.coverUrl || coverFolder}
        />
        <div className="flex flex-col items-start justify-center gap-2">
          <span className="text-white text-sm font-semibold">
            {folder.name}
          </span>
          <span className="text-[#909090] text-sm font-semibold">
            {folder.videos.length} videos
          </span>
        </div>
      </div>
      <CheckBox
        checked={isSelected}
        onCheckedChange={() => onSelect(folder.id)}
      />
    </motion.div>
  );
}