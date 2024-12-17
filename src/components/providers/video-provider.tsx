import {
  isHLSProvider,
  isYouTubeProvider,
  type MediaProviderAdapter,
} from "@vidstack/react";
import { getYoutubeVideoId } from "../../utils";

export function getVideoUrl(url: string) {
  if (isYouTubeProvider(url)) {
    const videoId = getYoutubeVideoId(url);
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&showinfo=0&modestbranding=0&rel=0&loop=0&enablejsapi=1`;
  }
  return url;
}

export function configureProvider(provider: MediaProviderAdapter | null) {
  if (!provider) return;

  if (isYouTubeProvider(provider)) {
    provider.cookies = true;
  }

  if (isHLSProvider(provider)) {
    provider.library =
      "https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js";
    provider.config = {};
  }
}
