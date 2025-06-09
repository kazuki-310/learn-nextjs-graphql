import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardChart } from '../dashboard-chart';
import type { Project } from '@/lib/graphql/__generated__/index';

jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="bar-chart" data-chart-data={JSON.stringify(data)}>
      {children}
    </div>
  ),
  Bar: ({ dataKey, fill }: { dataKey: string; fill: string }) => (
    <div data-testid="bar" data-key={dataKey} data-fill={fill} />
  ),
  XAxis: ({ dataKey }: { dataKey: string }) => <div data-testid="x-axis" data-key={dataKey} />,
  YAxis: () => <div data-testid="y-axis" />,
}));

jest.mock('@/components/ui/chart', () => ({
  ChartContainer: ({
    children,
    config,
    className,
  }: {
    children: React.ReactNode;
    config: unknown;
    className: string;
  }) => (
    <div data-testid="chart-container" data-config={JSON.stringify(config)} className={className}>
      {children}
    </div>
  ),
  ChartTooltip: () => <div data-testid="chart-tooltip" />,
  ChartTooltipContent: () => <div data-testid="chart-tooltip-content" />,
}));

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Project 1',
    description: 'Description 1',
    price: 500,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'Description 2',
    price: 2000,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
  {
    id: '3',
    title: 'Project 3',
    description: 'Description 3',
    price: 4000,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
  {
    id: '4',
    title: 'Project 4',
    description: 'Description 4',
    price: 15000,
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04',
  },
  {
    id: '5',
    title: 'Project 5',
    description: 'Description 5',
    price: 150000,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
];

describe('ダッシュボードチャート', () => {
  it('チャートタイトルをレンダリングすること', () => {
    render(<DashboardChart projects={mockProjects} />);

    expect(screen.getByText('プロジェクト価格帯別分布')).toBeInTheDocument();
  });

  it('チャートコンポーネントをレンダリングすること', () => {
    render(<DashboardChart projects={mockProjects} />);

    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('bar')).toBeInTheDocument();
  });

  it('正しいチャート設定を持つこと', () => {
    render(<DashboardChart projects={mockProjects} />);

    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toHaveClass('h-[300px]');

    const config = JSON.parse(chartContainer.getAttribute('data-config') || '{}');
    expect(config.count.label).toBe('プロジェクト数');
    expect(config.count.color).toBe('hsl(var(--chart-1))');
  });

  it('価格帯データを正しく計算すること', () => {
    render(<DashboardChart projects={mockProjects} />);

    const barChart = screen.getByTestId('bar-chart');
    const chartData = JSON.parse(barChart.getAttribute('data-chart-data') || '[]');

    expect(chartData).toHaveLength(8);

    const range0to1000 = chartData.find((item: { range: string }) => item.range === '0-1,000');
    expect(range0to1000.count).toBe(1);

    const range1000to3000 = chartData.find(
      (item: { range: string }) => item.range === '1,000-3,000',
    );
    expect(range1000to3000.count).toBe(1);

    const range3000to5000 = chartData.find(
      (item: { range: string }) => item.range === '3,000-5,000',
    );
    expect(range3000to5000.count).toBe(1);

    const range10000to30000 = chartData.find(
      (item: { range: string }) => item.range === '10,000-30,000',
    );
    expect(range10000to30000.count).toBe(1);

    const range100000plus = chartData.find(
      (item: { range: string }) => item.range === '100,000以上',
    );
    expect(range100000plus.count).toBe(1);
  });

  it('空のプロジェクト配列を処理すること', () => {
    render(<DashboardChart projects={[]} />);

    const barChart = screen.getByTestId('bar-chart');
    const chartData = JSON.parse(barChart.getAttribute('data-chart-data') || '[]');

    expect(chartData).toHaveLength(8);
    chartData.forEach((item: { count: number }) => {
      expect(item.count).toBe(0);
    });
  });

  it('価格帯境界値のプロジェクトを処理すること', () => {
    const boundaryProjects: Project[] = [
      {
        id: '1',
        title: 'Project 1',
        description: 'Description 1',
        price: 1000,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
      {
        id: '2',
        title: 'Project 2',
        description: 'Description 2',
        price: 3000,
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02',
      },
      {
        id: '3',
        title: 'Project 3',
        description: 'Description 3',
        price: 5000,
        createdAt: '2024-01-03',
        updatedAt: '2024-01-03',
      },
    ];

    render(<DashboardChart projects={boundaryProjects} />);

    const barChart = screen.getByTestId('bar-chart');
    const chartData = JSON.parse(barChart.getAttribute('data-chart-data') || '[]');

    const range1000to3000 = chartData.find(
      (item: { range: string }) => item.range === '1,000-3,000',
    );
    expect(range1000to3000.count).toBe(1);

    const range3000to5000 = chartData.find(
      (item: { range: string }) => item.range === '3,000-5,000',
    );
    expect(range3000to5000.count).toBe(1);

    const range5000to10000 = chartData.find(
      (item: { range: string }) => item.range === '5,000-10,000',
    );
    expect(range5000to10000.count).toBe(1);
  });

  it('正しいバー設定を持つこと', () => {
    render(<DashboardChart projects={mockProjects} />);

    const bar = screen.getByTestId('bar');
    expect(bar).toHaveAttribute('data-key', 'count');
    expect(bar).toHaveAttribute('data-fill', 'var(--color-count)');
  });

  it('正しい軸設定を持つこと', () => {
    render(<DashboardChart projects={mockProjects} />);

    const xAxis = screen.getByTestId('x-axis');
    expect(xAxis).toHaveAttribute('data-key', 'range');
  });

  it('カード構造を正しくレンダリングすること', () => {
    render(<DashboardChart projects={mockProjects} />);

    const title = screen.getByText('プロジェクト価格帯別分布');
    const card = title.closest('[class*="border"]');
    expect(card).toBeInTheDocument();
  });
});
