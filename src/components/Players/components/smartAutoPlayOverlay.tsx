import { SpeakerSimpleSlash } from "@phosphor-icons/react";
import type { Video } from "../../../types";

interface SmartAutoPlayOverlayProps {
  video: Video;
  onPlay: () => void;
}

export function SmartAutoPlayOverlay({
  video,
  onPlay,
}: SmartAutoPlayOverlayProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-60">
      <div
        onClick={onPlay}
        style={
          video.colorSmartPlayers
            ? { backgroundColor: video.colorSmartPlayers }
            : {}
        }
        className={`p-4 flex items-center justify-center bg-[#187BF0] text-white gap-12 rounded`}
      >
        <SpeakerSimpleSlash size={64} />
        <div>
          <p className="text-lg">{video.TextTopSmartAutoPlay}</p>
          <p className="text-lg">{video.TextButtonSmartAutoPlay}</p>
        </div>
      </div>
    </div>
  );
}
