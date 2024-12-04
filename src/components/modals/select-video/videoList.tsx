import { CheckBox } from '../../';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import type { Video } from '@/types';

interface VideoListProps {
  videos: Video[];
  selectedVideo?: Video;
  onVideoSelect: (checked: boolean, video: Video) => void;
}

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

export function VideoList({ videos, selectedVideo, onVideoSelect }: VideoListProps) {
  if (videos.length === 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={listItemVariants}
        className="w-full h-full flex flex-col items-center justify-center mt-6 gap-4"
      >
        <Folder className="w-11 h-11 text-white" />
        <span className="text-white text-sm">Sem vídeos encontrados</span>
      </motion.div>
    );
  }

  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden my-4">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          className="flex items-center justify-between p-4 border-b border-neutral-800 last:border-0 hover:bg-neutral-900/50 transition-colors"
          custom={index}
          initial="hidden"
          animate="visible"
          variants={listItemVariants}
        >
          <div className="flex gap-4">
            <img
              className="w-28 h-14 rounded object-cover"
              alt={`Thumbnail do vídeo ${video.name}`}
              src={video.thumbnail}
            />
            <div className="flex flex-col items-start justify-center gap-2">
              <span className="text-white text-sm font-semibold">
                {video.name}
              </span>
              <span className="text-[#909090] text-sm font-semibold">
                {video.analytics.totalViews} views
              </span>
            </div>
          </div>
          <CheckBox
            checked={selectedVideo?.id === video.id}
            onCheckedChange={(checked) => onVideoSelect(Boolean(checked), video)}
          />
        </motion.div>
      ))}
    </div>
  );
}