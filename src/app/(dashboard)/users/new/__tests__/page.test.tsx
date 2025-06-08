import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';

jest.mock('../../_components/user-form', () => ({
  UserForm: () => <div data-testid="user-form">User Form Component</div>,
}));

describe('Users New Page', () => {
  it('should render page title', () => {
    render(<Page />);

    expect(screen.getByText('新規ユーザー作成')).toBeInTheDocument();
  });

  it('should render UserForm component', () => {
    render(<Page />);

    expect(screen.getByTestId('user-form')).toBeInTheDocument();
  });

  it('should have correct page structure', () => {
    render(<Page />);

    const container = screen.getByText('新規ユーザー作成').closest('.container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('space-y-8');
  });
});
