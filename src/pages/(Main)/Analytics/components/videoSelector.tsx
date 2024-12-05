import { type FC } from "react";
import { motion } from "framer-motion";

import type { Video } from "@/types";
import { Button, Input } from "@/components";
import { Contrast, Plus } from "lucide-react";

interface VideoSelectorProps {
  selectedVideo?: Video;
  onOpenModal: () => void;
}

export const VideoSelector: FC<VideoSelectorProps> = ({
  selectedVideo,
  onOpenModal,
}) => {
  return (
    <motion.div
      className="w-full flex mt-8 gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Button
        type="button"
        variant="primary"
        onClick={onOpenModal}
        className="min-w-48 flex items-center justify-center py-3 px-4 h-10 gap-2"
      >
        <Plus size={16} />
        Selecionar Video
      </Button>
      {/* <Button
        type="button"
        variant="primary"
        onClick={onOpenModal}
        className="min-w-48 flex items-center justify-center py-3 px-4 h-10 gap-2"
      >
        <Contrast size={16} />
        Comparar Videos
      </Button> */}
      <Input
        type="text"
        className="w-full mr-8 brightness-75"
        placeholder="Informações do seu vídeo"
        disabled={true}
        value={
          selectedVideo ? `${selectedVideo.name} | ${selectedVideo.url}` : ""
        }
        readOnly
      />
    </motion.div>
  );
};
