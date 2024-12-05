import { type FC } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";
import { cardVariants } from "@/animations";

interface AnalyticsHeaderProps {
  onGoBack: () => void;
}

export const AnalyticsHeader: FC<AnalyticsHeaderProps> = ({ onGoBack }) => {
  return (
    <motion.header
      className="flex flex-col w-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <span className="text-white text-lg flex items-start justify-start">
        <ArrowLeft
          size={24}
          className="mr-8 cursor-pointer"
          onClick={onGoBack}
        />
        Análise
      </span>
      <span className="text-[#909090] text-sm mt-4">
        Veja detalhes analíticos do vídeo
      </span>
    </motion.header>
  );
};
