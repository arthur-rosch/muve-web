import { type FC } from 'react';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
} from '@tremor/react';
import type { CountryMetrics } from '@/types';

interface CountryMetricsTableProps {
  metrics: CountryMetrics[];
}

export const CountryMetricsTable: FC<CountryMetricsTableProps> = ({
  metrics,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Country</TableHeaderCell>
          <TableHeaderCell>Total Views</TableHeaderCell>
          <TableHeaderCell>Total Plays</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.country}>
            <TableCell>{metric.country}</TableCell>
            <TableCell>{metric.totalViews}</TableCell>
            <TableCell>{metric.totalPlays}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};