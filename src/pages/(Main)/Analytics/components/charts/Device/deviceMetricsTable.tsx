import { type FC } from 'react';
import type { DeviceMetrics } from '@/types';
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeaderCell } from '@tremor/react';

interface DeviceMetricsTableProps {
  metrics: DeviceMetrics[];
}

export const DeviceMetricsTable: FC<DeviceMetricsTableProps> = ({ metrics }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Device</TableHeaderCell>
          <TableHeaderCell>Total Views</TableHeaderCell>
          <TableHeaderCell>Total Plays</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {metrics.map((metric) => (
          <TableRow key={metric.device}>
            <TableCell>{metric.device}</TableCell>
            <TableCell>{metric.totalViews}</TableCell>
            <TableCell>{metric.totalPlays}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};