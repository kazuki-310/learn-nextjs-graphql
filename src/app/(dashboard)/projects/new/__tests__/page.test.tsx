import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';

jest.mock('../../_components/project-form', () => ({
  ProjectForm: () => <div data-testid="project-form">Project Form Component</div>,
}));

describe('Projects New Page', () => {
  it('should render page title', () => {
    render(<Page />);

    expect(screen.getByText('新規プロジェクト作成')).toBeInTheDocument();
  });

  it('should render ProjectForm component', () => {
    render(<Page />);

    expect(screen.getByTestId('project-form')).toBeInTheDocument();
  });

  it('should have correct page structure', () => {
    render(<Page />);

    const container = screen.getByText('新規プロジェクト作成').closest('.container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('space-y-8');
  });
});
