'use client';

import { Card, Box } from '@chakra-ui/react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
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

    return ranges.map((range) => {
      const count = projects.filter(
        (project) => project.price >= range.min && project.price < range.max,
      ).length;

      return {
        range: range.label,
        count,
      };
    });
  };

  const priceRangeData = calculatePriceRangeData(projects);

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>プロジェクト価格帯別分布</Card.Title>
      </Card.Header>
      <Card.Body>
        <Box height="300px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceRangeData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card.Body>
    </Card.Root>
  );
}
