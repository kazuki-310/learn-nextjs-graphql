import { createProject } from '../actions';
import { graphQLFetchSdk } from '@/lib/graphql';

// Mock the GraphQL SDK
jest.mock('@/lib/graphql', () => ({
  graphQLFetchSdk: {
    createProject: jest.fn(),
  },
}));

// Mock the server action wrapper
jest.mock('@/lib/utils/server-action-wrapper', () => ({
  withServerAction: jest.fn((fn) => fn),
}));

describe('プロジェクト作成アクション', () => {
  const mockGraphQLFetchSdk = graphQLFetchSdk as jest.Mocked<typeof graphQLFetchSdk>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('プロジェクトを正常に作成できること', async () => {
    const mockProjectData = {
      title: 'Test Project',
      description: 'Test description',
      price: 1000,
    };

    const mockResponse = {
      createProject: {
        id: '1',
        title: 'Test Project',
        description: 'Test description',
        price: 1000,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    };

    mockGraphQLFetchSdk.createProject.mockResolvedValue(mockResponse);

    const result = await createProject(mockProjectData);

    expect(mockGraphQLFetchSdk.createProject).toHaveBeenCalledWith({
      input: mockProjectData,
    });
    expect(result).toEqual(mockResponse.createProject);
  });

  it('GraphQLエラーを処理できること', async () => {
    const mockProjectData = {
      title: 'Test Project',
      description: 'Test description',
      price: 1000,
    };

    const mockError = new Error('GraphQL error');
    mockGraphQLFetchSdk.createProject.mockRejectedValue(mockError);

    await expect(createProject(mockProjectData)).rejects.toThrow('GraphQL error');

    expect(mockGraphQLFetchSdk.createProject).toHaveBeenCalledWith({
      input: mockProjectData,
    });
  });

  it('正しい入力構造でGraphQLを呼び出すこと', async () => {
    const mockProjectData = {
      title: 'Another Project',
      description: 'Another description',
      price: 2000,
    };

    const mockResponse = {
      createProject: {
        id: '2',
        ...mockProjectData,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    };

    mockGraphQLFetchSdk.createProject.mockResolvedValue(mockResponse);

    await createProject(mockProjectData);

    expect(mockGraphQLFetchSdk.createProject).toHaveBeenCalledTimes(1);
    expect(mockGraphQLFetchSdk.createProject).toHaveBeenCalledWith({
      input: expect.objectContaining({
        title: 'Another Project',
        description: 'Another description',
        price: 2000,
      }),
    });
  });

  it('空の説明を処理できること', async () => {
    const mockProjectData = {
      title: 'Project without description',
      description: '',
      price: 500,
    };

    const mockResponse = {
      createProject: {
        id: '3',
        ...mockProjectData,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    };

    mockGraphQLFetchSdk.createProject.mockResolvedValue(mockResponse);

    const result = await createProject(mockProjectData);

    expect(result).toEqual(mockResponse.createProject);
    expect(mockGraphQLFetchSdk.createProject).toHaveBeenCalledWith({
      input: mockProjectData,
    });
  });

  it('ゼロ価格を処理できること', async () => {
    const mockProjectData = {
      title: 'Free Project',
      description: 'This is free',
      price: 0,
    };

    const mockResponse = {
      createProject: {
        id: '4',
        ...mockProjectData,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    };

    mockGraphQLFetchSdk.createProject.mockResolvedValue(mockResponse);

    const result = await createProject(mockProjectData);

    expect(result).toEqual(mockResponse.createProject);
    expect(result.price).toBe(0);
  });
});