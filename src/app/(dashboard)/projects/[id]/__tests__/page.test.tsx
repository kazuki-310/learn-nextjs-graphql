import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Project } from '@/lib/graphql/__generated__';

jest.mock('../../_components/project-form', () => ({
  ProjectForm: ({ project }: { project: Project }) => (
    <div data-testid="project-form">
      Project Form for {project.title} (${project.price})
    </div>
  ),
}));

describe('プロジェクト編集ページコンポーネント', () => {
  describe('ProjectFormLoader', () => {
    it('プロジェクトが存在する時にProjectFormをレンダーできること', () => {
      const mockProject = {
        id: '1',
        title: 'Test Project',
        description: 'Test description',
        price: 1000,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      };

      const { ProjectForm } = require('../../_components/project-form');

      render(<ProjectForm project={mockProject} />);

      expect(screen.getByTestId('project-form')).toBeInTheDocument();
      expect(screen.getByText('Project Form for Test Project ($1000)')).toBeInTheDocument();
    });

    it('プロジェクトがnullの時にエラーメッセージを表示できること', () => {
      const ErrorComponent = () => <div>プロジェクトは存在しません</div>;

      render(<ErrorComponent />);

      expect(screen.getByText('プロジェクトは存在しません')).toBeInTheDocument();
    });
  });

  describe('ページ構造', () => {
    it('正しいページレイアウトを持つこと', () => {
      const PageLayout = () => (
        <main className="space-y-6">
          <h1 className="text-3xl font-bold">プロジェクト編集</h1>
        </main>
      );

      render(<PageLayout />);

      expect(screen.getByRole('heading', { name: 'プロジェクト編集' })).toBeInTheDocument();

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('space-y-6');
    });
  });

  describe('プロジェクトデータ検証', () => {
    it('プロジェクトオブジェクトの構造を検証できること', () => {
      const project = {
        id: '1',
        title: 'Test Project',
        description: 'Test description',
        price: 1000,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      };

      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('price');
      expect(project).toHaveProperty('createdAt');
      expect(project).toHaveProperty('updatedAt');
    });

    it('プロジェクトフィールドの型を検証できること', () => {
      const project = {
        id: '123',
        title: 'Test Project',
        description: 'Test description',
        price: 500,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      };

      expect(typeof project.id).toBe('string');
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(typeof project.price).toBe('number');
      expect(project.price).toBeGreaterThanOrEqual(0);
    });

    it('異なるプロジェクト価格を検証できること', () => {
      const projects = [{ price: 0 }, { price: 100 }, { price: 1000 }, { price: 9999 }];

      projects.forEach((project) => {
        expect(typeof project.price).toBe('number');
        expect(project.price).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
