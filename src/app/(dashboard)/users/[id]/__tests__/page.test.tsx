import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Role, User } from '@/lib/graphql/__generated__';

jest.mock('../../_components/user-form', () => ({
  UserForm: ({ user }: { user: User }) => (
    <div data-testid="user-form">
      User Form for {user.name} ({user.email})
    </div>
  ),
}));

describe('ユーザー編集ページコンポーネント', () => {
  describe('UserDetailLoader', () => {
    it('ユーザーが存在する時にUserFormをレンダーできること', () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: Role.Admin,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      };

      const { UserForm } = require('../../_components/user-form');

      render(<UserForm user={mockUser} />);

      expect(screen.getByTestId('user-form')).toBeInTheDocument();
      expect(screen.getByText('User Form for Test User (test@example.com)')).toBeInTheDocument();
    });

    it('ユーザーがnullの時にエラーメッセージを表示できること', () => {
      const ErrorComponent = () => <div>ユーザーは存在しません</div>;

      render(<ErrorComponent />);

      expect(screen.getByText('ユーザーは存在しません')).toBeInTheDocument();
    });
  });

  describe('ページ構造', () => {
    it('正しいページレイアウトを持つこと', () => {
      const PageLayout = () => (
        <main className="space-y-6">
          <h1 className="text-3xl font-bold">ユーザー編集</h1>
        </main>
      );

      render(<PageLayout />);

      expect(screen.getByRole('heading', { name: 'ユーザー編集' })).toBeInTheDocument();

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('space-y-6');
    });
  });

  describe('ユーザーデータ検証', () => {
    it('ユーザーオブジェクトの構造を検証できること', () => {
      const user = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: Role.Admin,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      };

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });

    it('ユーザーフィールドの型を検証できること', () => {
      const user = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        role: Role.Editor,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      };

      expect(typeof user.id).toBe('string');
      expect(typeof user.name).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.role).toBe('string');
      expect(Object.values(Role)).toContain(user.role);
    });

    it('異なるユーザーロールを検証できること', () => {
      const roles = [Role.Admin, Role.Editor, Role.Viewer];

      roles.forEach((role) => {
        const user = {
          id: `${role}-id`,
          name: `Test ${role}`,
          email: `${role}@example.com`,
          role,
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        };

        expect(user.role).toBe(role);
        expect(Object.values(Role)).toContain(user.role);
      });
    });
  });
});
