import { type FC } from 'react';
import { Card } from '@/components';

interface MetricsCardProps {
  label: string;
  value: string | number;
}

export const MetricsCard: FC<MetricsCardProps> = ({ label, value }) => {
  return (
    <Card
      variant="secondary"
      className="w-44 h-32 flex flex-col justify-between px-5 py-6 rounded-lg bg-transparent"
    >
      <span className="text-[#909090] text-sm">{label}</span>
      <span className="text-white text-3xl">{value}</span>
    </Card>
  );
};