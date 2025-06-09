import { updateProject, deleteProject } from '../actions';
import { graphQLFetchSdk } from '@/lib/graphql';

jest.mock('@/lib/graphql', () => ({
  graphQLFetchSdk: {
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
  },
}));

jest.mock('@/lib/utils/server-action-wrapper', () => ({
  withServerAction: jest.fn((fn) => fn),
}));

describe('プロジェクトアクション', () => {
  const mockGraphQLFetchSdk = graphQLFetchSdk as jest.Mocked<typeof graphQLFetchSdk>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateProject', () => {
    it('プロジェクトを正常に更新できること', async () => {
      const projectId = '1';
      const mockUpdateData = {
        title: 'Updated Project',
        description: 'Updated description',
        price: 1500,
      };

      const mockResponse = {
        updateProject: {
          id: '1',
          title: 'Updated Project',
          description: 'Updated description',
          price: 1500,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
        },
      };

      mockGraphQLFetchSdk.updateProject.mockResolvedValue(mockResponse);

      const result = await updateProject(projectId, mockUpdateData);

      expect(mockGraphQLFetchSdk.updateProject).toHaveBeenCalledWith({
        id: projectId,
        input: mockUpdateData,
      });
      expect(result).toEqual(mockResponse.updateProject);
    });

    it('更新時のGraphQLエラーを処理できること', async () => {
      const projectId = '1';
      const mockUpdateData = {
        title: 'Updated Project',
        description: 'Updated description',
        price: 1500,
      };

      const mockError = new Error('Project not found');
      mockGraphQLFetchSdk.updateProject.mockRejectedValue(mockError);

      await expect(updateProject(projectId, mockUpdateData)).rejects.toThrow('Project not found');

      expect(mockGraphQLFetchSdk.updateProject).toHaveBeenCalledWith({
        id: projectId,
        input: mockUpdateData,
      });
    });

    it('部分的な更新を処理できること', async () => {
      const projectId = '2';
      const mockUpdateData = {
        title: 'Only Title Updated',
        description: 'Original description',
        price: 1000,
      };

      const mockResponse = {
        updateProject: {
          id: '2',
          ...mockUpdateData,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-03T00:00:00Z',
        },
      };

      mockGraphQLFetchSdk.updateProject.mockResolvedValue(mockResponse);

      const result = await updateProject(projectId, mockUpdateData);

      expect(result.title).toBe('Only Title Updated');
      expect(mockGraphQLFetchSdk.updateProject).toHaveBeenCalledWith({
        id: projectId,
        input: mockUpdateData,
      });
    });

    it('価格が0のプロジェクトを更新できること', async () => {
      const projectId = '3';
      const mockUpdateData = {
        title: 'Free Project',
        description: 'Now free',
        price: 0,
      };

      const mockResponse = {
        updateProject: {
          id: '3',
          ...mockUpdateData,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-04T00:00:00Z',
        },
      };

      mockGraphQLFetchSdk.updateProject.mockResolvedValue(mockResponse);

      const result = await updateProject(projectId, mockUpdateData);

      expect(result.price).toBe(0);
      expect(mockGraphQLFetchSdk.updateProject).toHaveBeenCalledWith({
        id: projectId,
        input: mockUpdateData,
      });
    });
  });

  describe('deleteProject', () => {
    it('プロジェクトを正常に削除できること', async () => {
      const projectId = '1';
      const mockResponse = {
        deleteProject: {
          id: '1',
          title: 'Deleted Project',
          description: 'This project was deleted',
          price: 1000,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      };

      mockGraphQLFetchSdk.deleteProject.mockResolvedValue(mockResponse);

      const result = await deleteProject(projectId);

      expect(mockGraphQLFetchSdk.deleteProject).toHaveBeenCalledWith({
        id: projectId,
      });
      expect(result).toEqual(mockResponse.deleteProject);
    });

    it('削除時のGraphQLエラーを処理できること', async () => {
      const projectId = '999';
      const mockError = new Error('Project not found');

      mockGraphQLFetchSdk.deleteProject.mockRejectedValue(mockError);

      await expect(deleteProject(projectId)).rejects.toThrow('Project not found');

      expect(mockGraphQLFetchSdk.deleteProject).toHaveBeenCalledWith({
        id: projectId,
      });
    });

    it('空のプロジェクトIDを処理できること', async () => {
      const projectId = '';
      const mockError = new Error('Invalid project ID');

      mockGraphQLFetchSdk.deleteProject.mockRejectedValue(mockError);

      await expect(deleteProject(projectId)).rejects.toThrow('Invalid project ID');

      expect(mockGraphQLFetchSdk.deleteProject).toHaveBeenCalledWith({
        id: projectId,
      });
    });

    it('GraphQLのdeleteProjectを一度だけ呼び出すこと', async () => {
      const projectId = '5';
      const mockResponse = {
        deleteProject: {
          id: '5',
          title: 'Project to Delete',
          description: 'Will be deleted',
          price: 500,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      };

      mockGraphQLFetchSdk.deleteProject.mockResolvedValue(mockResponse);

      await deleteProject(projectId);

      expect(mockGraphQLFetchSdk.deleteProject).toHaveBeenCalledTimes(1);
      expect(mockGraphQLFetchSdk.deleteProject).toHaveBeenCalledWith({
        id: projectId,
      });
    });
  });
});
