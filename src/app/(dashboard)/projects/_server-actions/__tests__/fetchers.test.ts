import { getProjects } from '../fetchers';
import { graphQLFetchSdk } from '@/lib/graphql';

// Mock the GraphQL SDK
jest.mock('@/lib/graphql', () => ({
  graphQLFetchSdk: {
    getProjects: jest.fn(),
  },
}));

// Mock React cache
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: jest.fn((fn) => fn),
}));

// Mock console.error to test error logging
const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

describe('getProjects fetcher', () => {
  const mockGraphQLFetchSdk = graphQLFetchSdk as jest.Mocked<typeof graphQLFetchSdk>;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('should fetch projects successfully', async () => {
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
    });
    expect(result).toEqual(mockResponse.projects);
  });

  it('should handle empty projects list', async () => {
    const mockResponse = {
      projects: [],
    };

    mockGraphQLFetchSdk.getProjects.mockResolvedValue(mockResponse);

    const result = await getProjects();

    expect(result).toEqual([]);
    expect(mockGraphQLFetchSdk.getProjects).toHaveBeenCalledWith(undefined, {
      revalidate: false,
      tags: ['projects'],
    });
  });

  it('should throw error when GraphQL fails', async () => {
    const mockError = new Error('GraphQL server error');

    mockGraphQLFetchSdk.getProjects.mockRejectedValue(mockError);

    await expect(getProjects()).rejects.toThrow('GraphQL server error');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching projects:', mockError);
    expect(mockGraphQLFetchSdk.getProjects).toHaveBeenCalledWith(undefined, {
      revalidate: false,
      tags: ['projects'],
    });
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network connection failed');

    mockGraphQLFetchSdk.getProjects.mockRejectedValue(networkError);

    await expect(getProjects()).rejects.toThrow('Network connection failed');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching projects:', networkError);
  });

  it('should call GraphQL with correct cache options', async () => {
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
    });
  });

  it('should handle GraphQL response with null projects', async () => {
    const mockResponse = {
      projects: null,
    };

    mockGraphQLFetchSdk.getProjects.mockResolvedValue(mockResponse);

    const result = await getProjects();

    expect(result).toBeNull();
  });

  it('should handle malformed project data', async () => {
    const malformedError = new Error('Invalid project data structure');

    mockGraphQLFetchSdk.getProjects.mockRejectedValue(malformedError);

    await expect(getProjects()).rejects.toThrow('Invalid project data structure');

    expect(consoleSpy).toHaveBeenCalledWith('Error fetching projects:', malformedError);
  });

  it('should call GraphQL only once per request', async () => {
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

  it('should handle projects with various price values', async () => {
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