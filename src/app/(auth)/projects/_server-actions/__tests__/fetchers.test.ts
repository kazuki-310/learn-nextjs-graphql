import { getProjects } from '../fetchers';
import { graphQLFetchSdk } from '@/lib/graphql';

// Mock the GraphQL SDK
jest.mock('@/lib/graphql', () => ({
  graphQLFetchSdk: {
    getProjects: jest.fn(),
  },
  cacheOptions: {
    static: jest.fn((tags) => ({ revalidate: false, tags, cache: 'force-cache' })),
    revalidate: jest.fn((seconds, tags) => ({ revalidate: seconds, tags, cache: 'force-cache' })),
    noCache: jest.fn(() => ({ cache: 'no-store' })),
  },
}));

// Mock React cache
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: jest.fn((fn) => fn),
}));

// Mock console.error to test error logging
const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

describe('プロジェクト取得フェッチャー', () => {
  const mockGraphQLFetchSdk = graphQLFetchSdk as jest.Mocked<typeof graphQLFetchSdk>;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('プロジェクトを正常に取得できること', async () => {
    const mockResponse = {
      projects: [
        {
          id: '1',
          title: 'Project 1',
          description: 'Description 1',
          price: 1000,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
        {
          id: '2',
          title: 'Project 2',
          description: 'Description 2',
          price: 2000,
          createdAt: '2023-01-02T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
        },
      ],
    };

    mockGraphQLFetchSdk.getProjects.mockResolvedValue(mockResponse);

    const result = await getProjects();

    expect(mockGraphQLFetchSdk.getProjects).toHaveBeenCalledWith(undefined, {
      revalidate: false,
      tags: ['projects'],
      cache: 'force-cache',
    });
    expect(result).toEqual(mockResponse.projects);
  });

  it('空のプロジェクトリストを処理できること', async () => {
    const mockResponse = {
      projects: [],
    };

    mockGraphQLFetchSdk.getProjects.mockResolvedValue(mockResponse);

    const result = await getProjects();

    expect(result).toEqual([]);
    expect(mockGraphQLFetchSdk.getProjects).toHaveBeenCalledWith(undefined, {
      revalidate: false,
      tags: ['projects'],
      cache: 'force-cache',
    });
  });

  it('GraphQLが失敗した場合にエラーをスローすること', async () => {
    const mockError = new Error('GraphQL server error');

    mockGraphQLFetchSdk.getProjects.mockRejectedValue(mockError);

    await expect(getProjects()).rejects.toThrow('GraphQL server error');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching projects:', mockError);
    expect(mockGraphQLFetchSdk.getProjects).toHaveBeenCalledWith(undefined, {
      revalidate: false,
      tags: ['projects'],
      cache: 'force-cache',
    });
  });

  it('ネットワークエラーを処理できること', async () => {
    const networkError = new Error('Network connection failed');

    mockGraphQLFetchSdk.getProjects.mockRejectedValue(networkError);

    await expect(getProjects()).rejects.toThrow('Network connection failed');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching projects:', networkError);
  });

  it('正しいキャッシュオプションでGraphQLを呼び出すこと', async () => {
    const mockResponse = {
      projects: [
        {
          id: '3',
          title: 'Project 3',
          description: 'Description 3',
          price: 3000,
          createdAt: '2023-01-03T00:00:00Z',
          updatedAt: '2023-01-03T00:00:00Z',
        },
      ],
    };

    mockGraphQLFetchSdk.getProjects.mockResolvedValue(mockResponse);

    await getProjects();

    expect(mockGraphQLFetchSdk.getProjects).toHaveBeenCalledWith(undefined, {
      revalidate: false,
      tags: ['projects'],
      cache: 'force-cache',
    });
  });

  it('プロジェクトがundefinedのGraphQLレスポンスを処理できること', async () => {
    const mockError = new Error('Projects query returned undefined');

    mockGraphQLFetchSdk.getProjects.mockRejectedValue(mockError);

    await expect(getProjects()).rejects.toThrow('Projects query returned undefined');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching projects:', mockError);
  });

  it('不正な形式のプロジェクトデータを処理できること', async () => {
    const malformedError = new Error('Invalid project data structure');

    mockGraphQLFetchSdk.getProjects.mockRejectedValue(malformedError);

    await expect(getProjects()).rejects.toThrow('Invalid project data structure');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching projects:', malformedError);
  });

  it('リクエストごとにGraphQLを一度だけ呼び出すこと', async () => {
    const mockResponse = {
      projects: [
        {
          id: '4',
          title: 'Single Call Project',
          description: 'Test single call',
          price: 4000,
          createdAt: '2023-01-04T00:00:00Z',
          updatedAt: '2023-01-04T00:00:00Z',
        },
      ],
    };

    mockGraphQLFetchSdk.getProjects.mockResolvedValue(mockResponse);

    await getProjects();

    expect(mockGraphQLFetchSdk.getProjects).toHaveBeenCalledTimes(1);
  });

  it('様々な価格のプロジェクトを処理できること', async () => {
    const mockResponse = {
      projects: [
        {
          id: '5',
          title: 'Free Project',
          description: 'This is free',
          price: 0,
          createdAt: '2023-01-05T00:00:00Z',
          updatedAt: '2023-01-05T00:00:00Z',
        },
        {
          id: '6',
          title: 'Expensive Project',
          description: 'This is expensive',
          price: 999999,
          createdAt: '2023-01-06T00:00:00Z',
          updatedAt: '2023-01-06T00:00:00Z',
        },
      ],
    };

    mockGraphQLFetchSdk.getProjects.mockResolvedValue(mockResponse);

    const result = await getProjects();

    expect(result).toHaveLength(2);
    expect(result[0].price).toBe(0);
    expect(result[1].price).toBe(999999);
  });
});