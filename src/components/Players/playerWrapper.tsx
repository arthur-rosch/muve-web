import axios from "axios";
import { Player } from "./player";
import host from "../../utils/host";
import { PlayerVsl } from "./playerVsl";
import type { Video } from "../../types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function PlayerWrapper() {
  const location = useLocation();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getVideoIdFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("videoId");
  };
  const fetchVideo = async () => {
    const videoId = getVideoIdFromQuery();

    if (!videoId) {
      setErrorMessage("ID do vídeo não encontrado na URL.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${host()}/video/${videoId}`);
      const video = response.data.video;
      if (video) {
        setVideo(video);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Erro ao buscar vídeo.";
      console.error(errorMsg);
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializePlayer = async () => {
      setIsLoading(true);
      await fetchVideo();
    };

    initializePlayer();
  }, [location.search]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return video ? (
    video.type === "Vsl" ? (
      <PlayerVsl video={video} />
    ) : (
      <Player video={video} />
    )
  ) : (
    <div>Vídeo não encontrado</div>
  );
}
