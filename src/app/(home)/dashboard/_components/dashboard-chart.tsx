'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { Project } from '@/lib/graphql/__generated__/index';

export function DashboardChart({ projects }: { projects: Project[] }) {
  const calculatePriceRangeData = (projects: Project[]) => {
    const ranges = [
      { min: 0, max: 1000, label: '0-1,000' },
      { min: 1000, max: 3000, label: '1,000-3,000' },
      { min: 3000, max: 5000, label: '3,000-5,000' },
      { min: 5000, max: 10000, label: '5,000-10,000' },
      { min: 10000, max: 30000, label: '10,000-30,000' },
      { min: 30000, max: 50000, label: '30,000-50,000' },
      { min: 50000, max: 100000, label: '50,000-100,000' },
      { min: 100000, max: Infinity, label: '100,000以上' },
    ];

    return ranges.map((range, index) => {
      const count = projects.filter(
        (project) => project.price >= range.min && project.price < range.max,
      ).length;

      return {
        range: range.label,
        count,
        fill: `hsl(var(--chart-${index + 1}))`,
      };
    });
  };

  const priceRangeData = calculatePriceRangeData(projects);

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロジェクト価格帯別分布</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: 'プロジェクト数',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceRangeData}>
              <XAxis dataKey="range" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
