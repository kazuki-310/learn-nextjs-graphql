import { getProject } from '../fetchers';
import { graphQLFetchSdk } from '@/lib/graphql';

// Mock the GraphQL SDK
jest.mock('@/lib/graphql', () => ({
  graphQLFetchSdk: {
    getProject: jest.fn(),
  },
  cacheOptions: {
    static: jest.fn((tags) => ({ revalidate: false, tags, cache: 'force-cache' })),
    revalidate: jest.fn((seconds, tags) => ({ revalidate: seconds, tags, cache: 'force-cache' })),
    noCache: jest.fn(() => ({ cache: 'no-store' })),
  },
}));

// Mock console.error to test error logging
const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

describe('getProjectフェッチャー', () => {
  const mockGraphQLFetchSdk = graphQLFetchSdk as jest.Mocked<typeof graphQLFetchSdk>;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('プロジェクトを正常に取得できること', async () => {
    const projectId = '1';
    const mockResponse = {
      project: {
        id: '1',
        title: 'Test Project',
        description: 'Test description',
        price: 1000,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    };

    mockGraphQLFetchSdk.getProject.mockResolvedValue(mockResponse);

    const result = await getProject(projectId);

    expect(mockGraphQLFetchSdk.getProject).toHaveBeenCalledWith(
      { id: projectId },
      { cache: 'no-store' }
    );
    expect(result).toEqual(mockResponse.project);
  });

  it('プロジェクトが見つからない時にnullを返すこと', async () => {
    const projectId = '999';
    const mockError = new Error('Project not found');

    mockGraphQLFetchSdk.getProject.mockRejectedValue(mockError);

    const result = await getProject(projectId);

    expect(mockGraphQLFetchSdk.getProject).toHaveBeenCalledWith(
      { id: projectId },
      { cache: 'no-store' }
    );
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', mockError);
  });

  it('GraphQLエラーを適切に処理できること', async () => {
    const projectId = '2';
    const mockError = new Error('GraphQL server error');

    mockGraphQLFetchSdk.getProject.mockRejectedValue(mockError);

    const result = await getProject(projectId);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', mockError);
  });

  it('ネットワークエラーを処理できること', async () => {
    const projectId = '3';
    const networkError = new Error('Network error');

    mockGraphQLFetchSdk.getProject.mockRejectedValue(networkError);

    const result = await getProject(projectId);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', networkError);
  });

  it('no-storeキャッシュオプションでGraphQLを呼び出すこと', async () => {
    const projectId = '4';
    const mockResponse = {
      project: {
        id: '4',
        title: 'Another Project',
        description: 'Another description',
        price: 2000,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    };

    mockGraphQLFetchSdk.getProject.mockResolvedValue(mockResponse);

    await getProject(projectId);

    expect(mockGraphQLFetchSdk.getProject).toHaveBeenCalledWith(
      { id: projectId },
      { cache: 'no-store' }
    );
  });

  it('空のプロジェクトIDを処理できること', async () => {
    const projectId = '';
    const mockResponse = {
      project: null,
    };

    mockGraphQLFetchSdk.getProject.mockResolvedValue(mockResponse);

    const result = await getProject(projectId);

    expect(mockGraphQLFetchSdk.getProject).toHaveBeenCalledWith(
      { id: projectId },
      { cache: 'no-store' }
    );
    expect(result).toBeNull();
  });

  it('不正なプロジェクトデータを処理できること', async () => {
    const projectId = '5';
    const mockError = new Error('Invalid project data');

    mockGraphQLFetchSdk.getProject.mockRejectedValue(mockError);

    const result = await getProject(projectId);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', mockError);
  });
});