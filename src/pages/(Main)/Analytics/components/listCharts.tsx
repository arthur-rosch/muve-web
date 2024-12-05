import type { FC } from "react";
import type { Video } from "@/types";
import { useEffect, useState } from "react";
import { ChartCountry, ChartDevice, ChartRetention } from "./Charts";

interface ListChartsProps {
  typeChart: string;
  video: Video;
}

export const ListCharts: FC<ListChartsProps> = ({ typeChart, video }) => {
  const [userPlan, setUserPlan] = useState<string>("");

  useEffect(() => {
    const storedPlan = localStorage.getItem("@storage:plan");
    if (storedPlan) {
      try {
        const parsedPlan = JSON.parse(storedPlan);
        setUserPlan(parsedPlan.plan);
      } catch (error) {
        console.error(
          "Erro ao buscar o plano do usuário no localStorage:",
          error
        );
      }
    }
  }, []);

  return (
    <div className={`w-full h-full mt-8 `}>
      {typeChart === "retenção" ? (
        <ChartRetention analytics={video.analytics} selectedVideo={video} />
      ) : typeChart === "pais" ? (
        <ChartCountry analytics={video.analytics} selectedVideo={video} />
      ) : (
        <ChartDevice analytics={video.analytics} selectedVideo={video} />
      )}
    </div>
  );
};
