import { useEffect } from "react";
import { Player } from "./player";
import { useVideo } from "../../hooks";
import { PlayerVsl } from "./playerVsl";
import { setupPreconnect } from "../../utils";
import { LoadingState, ErrorState } from "../";
import { useLocation } from "react-router-dom";

function useVideoId() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get("videoId");
}

export function PlayerWrapper() {
  const videoId = useVideoId();
  const { getVideoById } = useVideo(videoId!);
  const { data, isLoading, error } = getVideoById(true, videoId);

  //web.muveplayer.com/player?videoId=77d21fb3-d35e-40ee-8631-a42fbbce3f4b

  https: useEffect(() => {
    setupPreconnect();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!data) {
    return <ErrorState message="Vídeo não encontrado" />;
  }

  return data.type === "Vsl" ? (
    <PlayerVsl video={data} />
  ) : (
    <Player video={data} />
  );
}
