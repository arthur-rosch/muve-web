import { type FC } from 'react';
import { AreaChart } from '@tremor/react';
import { dataFormatter } from '@/utils';
import type { CountryChartData } from '@/types';

interface CountryRetentionChartProps {
  data: CountryChartData[];
  countries: string[];
}

export const CountryRetentionChart: FC<CountryRetentionChartProps> = ({
  data,
  countries,
}) => {
  return (
    <AreaChart
      data={data}
      index="date"
      yAxisWidth={60}
      categories={countries}
      valueFormatter={dataFormatter}
      className="mt-4 w-full h-[500px]"
      onValueChange={(v) => console.log(v)}
      colors={['red', 'yellow', 'rose', 'blue', 'purple', 'indigo']}
    />
  );
};