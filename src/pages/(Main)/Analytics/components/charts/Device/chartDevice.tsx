import { type FC } from 'react';
import { useDeviceData } from '@/hooks';
import type { ChartProps } from '@/types';
import { DeviceMetricsTable } from './deviceMetricsTable';
import { DeviceRetentionChart } from './deviceRetentionChart';

export const ChartDevice: FC<ChartProps> = (props) => {
  const { chartData, deviceMetrics, devices } = useDeviceData(props);

  return (
    <>
      <DeviceRetentionChart data={chartData} devices={devices} />
      <div className="mt-8 hidden">
        <DeviceMetricsTable metrics={deviceMetrics} />
      </div>
    </>
  );
};