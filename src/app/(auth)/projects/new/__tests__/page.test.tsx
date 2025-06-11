import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';

jest.mock('../../_components/project-form', () => ({
  ProjectForm: () => <div data-testid="project-form">Project Form Component</div>,
}));

describe('プロジェクト新規作成ページ', () => {
  it('ページタイトルをレンダリングすること', () => {
    render(<Page />);

    expect(screen.getByText('新規プロジェクト作成')).toBeInTheDocument();
  });

  it('ProjectFormコンポーネントをレンダリングすること', () => {
    render(<Page />);

    expect(screen.getByTestId('project-form')).toBeInTheDocument();
  });

  it('正しいページ構造を持つこと', () => {
    render(<Page />);

    const container = screen.getByText('新規プロジェクト作成').closest('.container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('space-y-8');
  });
});
