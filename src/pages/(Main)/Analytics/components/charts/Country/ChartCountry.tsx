import { type FC } from 'react';
import { useCountryData } from '@/hooks';
import type { ChartProps } from '@/types';
import { CountryMetricsTable } from './CountryMetricsTable';
import { CountryRetentionChart } from './CountryRetentionChart';

export const ChartCountry: FC<ChartProps> = (props) => {
  const { chartData, countryMetrics, countries } = useCountryData(props);

  return (
    <>
      <CountryRetentionChart data={chartData} countries={countries} />
      <div className="mt-8 hidden">
        <CountryMetricsTable metrics={countryMetrics} />
      </div>
    </>
  );
};