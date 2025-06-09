import { getDashboardStats } from '../fetchers';
import { graphQLFetchSdk, cacheOptions } from '@/lib/graphql';
import type { GetDashboardStatsQuery } from '@/lib/graphql/__generated__/index';

jest.mock('@/lib/graphql', () => ({
  graphQLFetchSdk: {
    getDashboardStats: jest.fn(),
  },
  cacheOptions: {
    static: jest.fn(),
  },
}));

const mockGraphQLFetchSdk = graphQLFetchSdk as jest.Mocked<typeof graphQLFetchSdk>;
const mockCacheOptionsFunctions = cacheOptions as jest.Mocked<typeof cacheOptions>;

describe('ダッシュボードフェッチャー', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDashboardStats', () => {
    const mockDashboardStats: GetDashboardStatsQuery['dashboardStats'] = {
      totalProjects: 25,
      totalUsers: 10,
      totalRevenue: 500000,
      averageProjectPrice: 20000,
      maxProjectPrice: 100000,
      recentProjectsCount: 3,
    };

    const mockCacheOptions = { cache: 'force-cache', next: { tags: ['users', 'projects'] } } as any;

    it('ダッシュボード統計を正常に取得できること', async () => {
      mockCacheOptionsFunctions.static.mockReturnValue(mockCacheOptions);
      mockGraphQLFetchSdk.getDashboardStats.mockResolvedValue({
        dashboardStats: mockDashboardStats,
      } as GetDashboardStatsQuery);

      const result = await getDashboardStats();

      expect(mockCacheOptionsFunctions.static).toHaveBeenCalledWith(['users', 'projects']);
      expect(mockGraphQLFetchSdk.getDashboardStats).toHaveBeenCalledWith(
        undefined,
        mockCacheOptions,
      );
      expect(result).toEqual(mockDashboardStats);
    });

    it('正しいキャッシュオプションを使用すること', async () => {
      mockCacheOptionsFunctions.static.mockReturnValue(mockCacheOptions);
      mockGraphQLFetchSdk.getDashboardStats.mockResolvedValue({
        dashboardStats: mockDashboardStats,
      } as GetDashboardStatsQuery);

      await getDashboardStats();

      expect(mockCacheOptionsFunctions.static).toHaveBeenCalledWith(['users', 'projects']);
    });

    it('エラーを適切に処理して再スローすること', async () => {
      const error = new Error('GraphQL Error');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      mockCacheOptionsFunctions.static.mockReturnValue(mockCacheOptions);
      mockGraphQLFetchSdk.getDashboardStats.mockRejectedValue(error);

      await expect(getDashboardStats()).rejects.toThrow('GraphQL Error');
      
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching dashboard stats:', error);
      consoleSpy.mockRestore();
    });

    it('ネットワークエラーを適切に処理すること', async () => {
      const networkError = new Error('Network request failed');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      mockCacheOptionsFunctions.static.mockReturnValue(mockCacheOptions);
      mockGraphQLFetchSdk.getDashboardStats.mockRejectedValue(networkError);

      await expect(getDashboardStats()).rejects.toThrow('Network request failed');
      
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching dashboard stats:', networkError);
      consoleSpy.mockRestore();
    });

    it('undefined レスポンスを適切に処理すること', async () => {
      mockCacheOptionsFunctions.static.mockReturnValue(mockCacheOptions);
      mockGraphQLFetchSdk.getDashboardStats.mockResolvedValue({
        dashboardStats: null as any,
      } as GetDashboardStatsQuery);

      const result = await getDashboardStats();

      expect(result).toBeNull();
    });

    it('関数がキャッシュされた関数として維持されること', () => {
      expect(getDashboardStats).toBeInstanceOf(Function);
    });
  });
});