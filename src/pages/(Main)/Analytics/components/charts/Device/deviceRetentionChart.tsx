import { type FC } from 'react';
import { dataFormatter } from '@/utils';
import { AreaChart } from '@tremor/react';
import type { DeviceChartData } from '@/types';

interface DeviceRetentionChartProps {
  data: DeviceChartData[];
  devices: string[];
}

export const DeviceRetentionChart: FC<DeviceRetentionChartProps> = ({ data, devices }) => {
  return (
    <AreaChart
      data={data}
      index="date"
      yAxisWidth={60}
      categories={devices}
      valueFormatter={dataFormatter}
      className="mt-4 w-full h-[500px]"
      onValueChange={(v) => console.log(v)}
      colors={['green', 'yellow', 'rose', 'red', 'blue', 'purple', 'indigo']}
    />
  );
};