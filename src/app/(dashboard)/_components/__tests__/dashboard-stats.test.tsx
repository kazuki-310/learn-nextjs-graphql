import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardStats } from '../dashboard-stats';
import type { GetDashboardStatsQuery } from '@/lib/graphql/__generated__/index';

const mockStats: GetDashboardStatsQuery['dashboardStats'] = {
  totalProjects: 42,
  totalUsers: 18,
  totalRevenue: 1234567,
  averageProjectPrice: 29394.21,
  maxProjectPrice: 150000,
  recentProjectsCount: 5,
};

describe('ダッシュボード統計', () => {
  it('すべての統計カードをレンダリングすること', () => {
    render(<DashboardStats stats={mockStats} />);

    expect(screen.getByText('総プロジェクト数')).toBeInTheDocument();
    expect(screen.getByText('総ユーザー数')).toBeInTheDocument();
    expect(screen.getByText('総売上')).toBeInTheDocument();
    expect(screen.getByText('平均プロジェクト価格')).toBeInTheDocument();
    expect(screen.getByText('最高価格')).toBeInTheDocument();
    expect(screen.getByText('今月の新規プロジェクト')).toBeInTheDocument();
  });

  it('正しい統計値を表示すること', () => {
    render(<DashboardStats stats={mockStats} />);

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('¥1,234,567')).toBeInTheDocument();
    expect(screen.getByText('¥29,394')).toBeInTheDocument();
    expect(screen.getByText('¥150,000')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('通貨値を正しくフォーマットすること', () => {
    const stats = {
      ...mockStats,
      totalRevenue: 1000000,
      averageProjectPrice: 12345.67,
      maxProjectPrice: 50000,
    };

    render(<DashboardStats stats={stats} />);

    expect(screen.getByText('¥1,000,000')).toBeInTheDocument();
    expect(screen.getByText('¥12,346')).toBeInTheDocument();
    expect(screen.getByText('¥50,000')).toBeInTheDocument();
  });

  it('ゼロ値を正しく処理すること', () => {
    const stats = {
      ...mockStats,
      totalProjects: 0,
      totalUsers: 0,
      totalRevenue: 0,
      averageProjectPrice: 0,
      maxProjectPrice: 0,
      recentProjectsCount: 0,
    };

    render(<DashboardStats stats={stats} />);

    expect(screen.getAllByText('0')).toHaveLength(3);
    expect(screen.getAllByText('¥0')).toHaveLength(3);
  });

  it('正しいグリッドレイアウトを持つこと', () => {
    render(<DashboardStats stats={mockStats} />);

    const grid = screen.getByText('総プロジェクト数').closest('div')?.parentElement?.parentElement?.parentElement;
    expect(grid).toHaveClass('grid', 'gap-4', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('カード構造を正しくレンダリングすること', () => {
    render(<DashboardStats stats={mockStats} />);

    const projectCard = screen.getByText('総プロジェクト数').closest('[class*="border"]');
    expect(projectCard).toBeInTheDocument();

    const cardTitle = screen.getByText('総プロジェクト数');
    expect(cardTitle).toHaveClass('text-sm', 'font-medium');

    const cardValue = screen.getByText('42');
    expect(cardValue).toHaveClass('text-2xl', 'font-bold');
  });

  it('平均価格を正しく四捨五入すること', () => {
    const stats = {
      ...mockStats,
      averageProjectPrice: 12345.89,
    };

    render(<DashboardStats stats={stats} />);

    expect(screen.getByText('¥12,346')).toBeInTheDocument();
  });

  it('大きな数値を正しく表示すること', () => {
    const stats = {
      ...mockStats,
      totalRevenue: 9999999,
      maxProjectPrice: 999999,
    };

    render(<DashboardStats stats={stats} />);

    expect(screen.getByText('¥9,999,999')).toBeInTheDocument();
    expect(screen.getByText('¥999,999')).toBeInTheDocument();
  });
});