import { type FC } from "react";
import { motion } from "framer-motion";
import { InputSelect } from "@/components";
import { cardVariants } from "@/animations";
import { MetricsCard, ListCharts } from "./";
import type { Video, VideoMetrics } from "@/types";
import { FolderDashed } from "@phosphor-icons/react";

interface AnalyticsContentProps {
  loading: boolean;
  selectedVideo?: Video;
  metrics: VideoMetrics | null;
  selectedTypeDataChart: string;
  onChartTypeChange: (type: string) => void;
}

export const AnalyticsContent: FC<AnalyticsContentProps> = ({
  loading,
  selectedVideo,
  metrics,
  selectedTypeDataChart,
  onChartTypeChange,
}) => {
  if (loading) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4"
      >
        <FolderDashed size={64} color="white" />
        <span className="text-white text-sm">Carregando...</span>
      </motion.div>
    );
  }

  if (!selectedVideo || !metrics) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="w-full h-full flex flex-col items-center justify-center mt-12 gap-4 pb-8"
      >
        <FolderDashed size={64} color="white" />
        <span className="text-white text-sm">Nenhum vídeo selecionado</span>
      </motion.div>
    );
  }

  const metricsData = [
    { label: "Plays", value: metrics.plays },
    { label: "Views", value: metrics.views },
    { label: "Play Rate", value: `${metrics.playRate}%` },
    { label: "Engajamento", value: `${metrics.engagement}%` },
    { label: "Plays únicos", value: metrics.uniquePlays },
    { label: "Views únicos", value: metrics.uniqueViews },
  ];

  const availableCharts = ["retenção", "pais", "dispositivos"];

  return (
    <motion.div
      className="w-full h-full flex flex-col"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start justify-start gap-4 flex-wrap">
          {metricsData.map(({ label, value }) => (
            <MetricsCard key={label} label={label} value={value} />
          ))}
        </div>
        <InputSelect
          options={availableCharts.map((chart) => ({
            value: chart,
            label: chart.charAt(0).toUpperCase() + chart.slice(1),
          }))}
          onChange={(value) => onChartTypeChange(value)}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <ListCharts typeChart={selectedTypeDataChart} video={selectedVideo} />
      </motion.div>
    </motion.div>
  );
};
