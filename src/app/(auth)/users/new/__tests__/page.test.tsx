import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../page';

jest.mock('../../_components/user-form', () => ({
  UserForm: () => <div data-testid="user-form">User Form Component</div>,
}));

describe('ユーザー新規作成ページ', () => {
  it('ページタイトルをレンダーできること', () => {
    render(<Page />);

    expect(screen.getByText('新規ユーザー作成')).toBeInTheDocument();
  });

  it('UserFormコンポーネントをレンダーできること', () => {
    render(<Page />);

    expect(screen.getByTestId('user-form')).toBeInTheDocument();
  });

  it('正しいページ構造を持つこと', () => {
    render(<Page />);

    const container = screen.getByText('新規ユーザー作成').closest('.container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('space-y-8');
  });
});
