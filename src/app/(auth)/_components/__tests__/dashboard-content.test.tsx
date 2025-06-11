import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardContent } from '../dashboard-content';

jest.mock('../dashboard-stats', () => ({
  DashboardStats: ({ stats }: { stats: unknown }) => (
    <div data-testid="dashboard-stats" data-stats={JSON.stringify(stats)}>
      Mock Dashboard Stats
    </div>
  ),
}));

jest.mock('../dashboard-chart', () => ({
  DashboardChart: ({ projects }: { projects: unknown }) => (
    <div data-testid="dashboard-chart" data-projects={JSON.stringify(projects)}>
      Mock Dashboard Chart
    </div>
  ),
}));

jest.mock('../dashboard-stats-skeleton', () => ({
  DashboardStatsSkeleton: () => (
    <div data-testid="dashboard-stats-skeleton">Loading Stats...</div>
  ),
}));

jest.mock('../dashboard-chart-skeleton', () => ({
  DashboardChartSkeleton: () => (
    <div data-testid="dashboard-chart-skeleton">Loading Chart...</div>
  ),
}));

jest.mock('../../_server-actions/fetchers', () => ({
  getDashboardStats: jest.fn().mockResolvedValue({
    totalProjects: 10,
    totalUsers: 5,
    totalRevenue: 100000,
    averageProjectPrice: 10000,
    maxProjectPrice: 50000,
    recentProjectsCount: 2,
  }),
}));

jest.mock('../../projects/_server-actions/fetchers', () => ({
  getProjects: jest.fn().mockResolvedValue([
    { id: '1', title: 'Project 1', price: 1000 },
    { id: '2', title: 'Project 2', price: 2000 },
  ]),
}));

// Mock React's Suspense to avoid async component issues in tests
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    Suspense: ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) => {
      return fallback;
    },
  };
});

describe('ダッシュボードコンテンツ', () => {
  it('正しいレイアウトでメインコンテナをレンダリングすること', () => {
    render(<DashboardContent />);

    const container = screen.getByTestId('dashboard-stats-skeleton').parentElement;
    expect(container).toHaveClass('space-y-6');
  });

  it('初期状態でローディングスケルトンをレンダリングすること', () => {
    render(<DashboardContent />);

    expect(screen.getByTestId('dashboard-stats-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-chart-skeleton')).toBeInTheDocument();
  });

  it('2つのメインセクションで正しい構造を持つこと', () => {
    render(<DashboardContent />);

    const statsSection = screen.getByTestId('dashboard-stats-skeleton').parentElement;
    const chartSection = screen.getByTestId('dashboard-chart-skeleton').parentElement;

    expect(statsSection).toBeInTheDocument();
    expect(chartSection).toBeInTheDocument();
    expect(statsSection?.parentElement).toBe(chartSection?.parentElement);
  });

  it('Suspense境界を正しくレンダリングすること', () => {
    render(<DashboardContent />);

    const skeletons = screen.getAllByText(/Loading/);
    expect(skeletons).toHaveLength(2);
  });

  it('コンポーネント間で適切なスペーシングを持つこと', () => {
    render(<DashboardContent />);

    const mainContainer = screen.getByTestId('dashboard-stats-skeleton').parentElement;
    expect(mainContainer).toHaveClass('space-y-6');
  });
});