import { motion } from "framer-motion";
import { useState, useEffect, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useVideo } from "@/hooks";
import type { Video, VideoMetrics } from "@/types";
import { HeaderFolder, SelectVideoModal } from "@/components";
import { calculateVideoMetrics, convertDurationToSeconds } from "@/utils";
import {
  AnalyticsHeader,
  VideoSelector,
  AnalyticsContent,
} from "./components/";

export const Analytics: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAllVideosByUserId } = useVideo();
  const { data: videos, isLoading } = getAllVideosByUserId(true);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [metrics, setMetrics] = useState<VideoMetrics | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    location.state?.video
  );
  const [selectedTypeDataChart, setSelectedTypeDataChart] =
    useState("retenção");

  useEffect(() => {
    setLoading(true);
    if (selectedVideo && videos) {
      const foundVideo = videos.find(
        (video: Video) => video.url === selectedVideo.url
      );
      setSelectedVideo(foundVideo || undefined);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [selectedVideo, videos]);

  useEffect(() => {
    if (selectedVideo) {
      const metrics = calculateVideoMetrics(
        convertDurationToSeconds(selectedVideo.duration),
        selectedVideo.analytics
      );
      setMetrics(metrics);
    }
  }, [selectedVideo]);

  if (isLoading || !videos) {
    return null;
  }

  return (
    <section className="w-full max-h-screen mx-8 overflow-auto overflow-x-hidden pr-4 pb-28">
      <HeaderFolder name="Análise" />

      <div className="w-full h-full flex flex-col mt-10">
        <AnalyticsHeader onGoBack={() => navigate("/dashboard")} />

        <VideoSelector
          selectedVideo={selectedVideo}
          onOpenModal={() => setIsModalOpen(true)}
        />

        <motion.div
          className="w-full h-auto p-6 bg-[#141414] mt-8 rounded"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AnalyticsContent
            loading={loading}
            selectedVideo={selectedVideo}
            metrics={metrics}
            selectedTypeDataChart={selectedTypeDataChart}
            onChartTypeChange={setSelectedTypeDataChart}
          />
        </motion.div>
      </div>

      <SelectVideoModal
        videos={videos}
        isOpen={isModalOpen}
        onVideoSelect={setSelectedVideo}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
