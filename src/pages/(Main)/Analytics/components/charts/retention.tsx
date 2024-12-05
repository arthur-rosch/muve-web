import { type FC } from "react";
import { AreaChart } from "@tremor/react";
import { dataFormatter } from "@/utils";
import type { ChartProps } from "@/types";
import { useRetentionData } from "@/hooks";

export const ChartRetention: FC<ChartProps> = (props) => {
  const { chartData } = useRetentionData(props);

  return (
    <AreaChart
      data={chartData}
      index="date"
      yAxisWidth={60}
      colors={["blue"]}
      className="mt-4 w-full h-[500px]"
      categories={["Retenção"]}
      valueFormatter={dataFormatter}
      onValueChange={(v) => console.log(v)}
      noDataText="Nenhum dado disponível"
    />
  );
};
