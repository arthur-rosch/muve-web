import { PlayButton } from "@vidstack/react";
import { PlayIcon } from "lucide-react";
import type { Video } from "../../../types";

interface EndedOverlayProps {
  video: Video;
  onPlay: () => void;
}

export function EndedOverlay({ video, onPlay }: EndedOverlayProps) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
      onClick={onPlay}
    >
      {video.ImageOfFinished && video.UrlCoverImageOfFinished ? (
        <div className="relative">
          <img
            src={video.UrlCoverImageOfFinished}
            alt=""
            className="w-full h-auto rounded-md"
          />
          <PlayButton
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center play-button bg-opacity-80 w-32 h-32 rounded-full hover:opacity-100 ${!video.color ? "bg-blue-500" : ""}`}
            style={video.color ? { backgroundColor: video.color } : {}}
          >
            <PlayIcon className="w-12 h-12 translate-x-px" />
          </PlayButton>
        </div>
      ) : (
        <PlayButton
          className={`flex items-center justify-center play-button bg-opacity-80 w-32 h-32 rounded-full hover:opacity-100 ${!video.color ? "bg-blue-500" : ""}`}
          style={video.color ? { backgroundColor: video.color } : {}}
        >
          <PlayIcon className="w-12 h-12 translate-x-px" />
        </PlayButton>
      )}
    </div>
  );
}
