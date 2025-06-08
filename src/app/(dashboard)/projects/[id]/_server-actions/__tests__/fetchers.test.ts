import { getProject } from '../fetchers';
import { graphQLFetchSdk } from '@/lib/graphql';

// Mock the GraphQL SDK
jest.mock('@/lib/graphql', () => ({
  graphQLFetchSdk: {
    getProject: jest.fn(),
  },
}));

// Mock console.error to test error logging
const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

describe('getProject fetcher', () => {
  const mockGraphQLFetchSdk = graphQLFetchSdk as jest.Mocked<typeof graphQLFetchSdk>;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('should fetch a project successfully', async () => {
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

  it('should return null when project is not found', async () => {
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

  it('should handle GraphQL errors gracefully', async () => {
    const projectId = '2';
    const mockError = new Error('GraphQL server error');

    mockGraphQLFetchSdk.getProject.mockRejectedValue(mockError);

    const result = await getProject(projectId);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', mockError);
  });

  it('should handle network errors', async () => {
    const projectId = '3';
    const networkError = new Error('Network error');

    mockGraphQLFetchSdk.getProject.mockRejectedValue(networkError);

    const result = await getProject(projectId);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', networkError);
  });

  it('should call GraphQL with no-store cache option', async () => {
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

  it('should handle empty project ID', async () => {
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

  it('should handle malformed project data', async () => {
    const projectId = '5';
    const mockError = new Error('Invalid project data');

    mockGraphQLFetchSdk.getProject.mockRejectedValue(mockError);

    const result = await getProject(projectId);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project:', mockError);
  });
});