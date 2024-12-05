import { Button, Modal } from "../..";
import type { Video } from "@/types";
import { VideoList } from "./videoList";
import { useState, useEffect } from "react";
import { VideoSearchInput } from "./videoSearchInput";
import { X } from "lucide-react";

interface SelectVideoModalProps {
  videos: Video[];
  isOpen: boolean;
  onClose: () => void;
  onVideoSelect: (video: Video | undefined) => void;
}

export function SelectVideoModal({
  videos,
  isOpen,
  onClose,
  onVideoSelect,
}: SelectVideoModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>();

  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVideoSelect = (checked: boolean, video: Video) => {
    setSelectedVideo(checked ? video : undefined);
  };

  const handleConfirm = () => {
    onVideoSelect(selectedVideo);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setSelectedVideo(undefined);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl w-full">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center border-b border-neutral-800 p-6">
          <h2 className="text-xl font-semibold text-white">
            + Selecione o video
          </h2>
          <p className="text-sm text-gray-400 mt-1">Analise um video</p>
        </div>

        <div className="w-full max-h-[25rem] overflow-auto p-6">
          <div className="w-full flex flex-col gap-6">
            <VideoSearchInput
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <VideoList
            videos={filteredVideos}
            selectedVideo={selectedVideo}
            onVideoSelect={handleVideoSelect}
          />
        </div>

        <div className="w-full gap-4 flex items-center justify-between p-6 border-t border-[#333333]">
          <Button variant="danger" onClick={onClose} className="w-full">
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm} className="w-full">
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
