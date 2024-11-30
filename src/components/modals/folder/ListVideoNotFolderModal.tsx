import { useState } from "react";
import type { Video } from "@/types"
import { Folder } from "lucide-react"
import { Input, CheckBox } from "@/components"

export const ListVideoNotFolder = ({ videos, handleVideoSelection}: {videos: Video[], handleVideoSelection: (checked: boolean, videoId: string) => void}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredVideos = videos.filter((video) =>
        video.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full space-y-4">
          <div className="space-y-2 w-full flex flex-col items-start justify-start">
            <label className="text-sm font-medium text-neutral-300">
              Vídeos
            </label>
            <Input
              type="search"
              value={searchTerm}
              placeholder="Pesquisar vídeos..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border-neutral-800 text-white"
            />
          </div>

          <div className="border border-neutral-800 rounded-lg overflow-hidden">
            {filteredVideos.length > 0 ? (
              <div className="max-h-[280px] overflow-y-auto">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-4 border-b border-neutral-800 last:border-0 hover:bg-neutral-900/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={video.thumbnail}
                        alt={video.name}
                        className="w-28 h-14 rounded object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {video.name}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {video.analytics.totalViews} visualizações
                        </p>
                      </div>
                    </div>
                    <CheckBox
                      onCheckedChange={(checked) =>
                        handleVideoSelection(checked as boolean, video.id)
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Folder
                  className="mx-auto mb-4 text-neutral-400"
                  size={32}
                />
                <p className="text-sm text-neutral-400">
                  Nenhum vídeo disponível
                </p>
              </div>
            )}
          </div>
        </div>
    )
}