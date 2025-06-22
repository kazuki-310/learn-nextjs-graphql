import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Mock all dependencies to avoid complex React Hook Form interactions
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    handleSubmit: jest.fn(),
    control: {},
    formState: { isValid: true, isSubmitting: false },
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../new/_lib/actions', () => ({
  createProject: jest.fn(),
}));

jest.mock('../../[id]/_lib/actions', () => ({
  updateProject: jest.fn(),
}));

// Mock UI components to avoid complex rendering issues
jest.mock('@/components/ui/form', () => ({
  Form: ({ children }: { children: React.ReactNode }) => <div data-testid="form">{children}</div>,
  FormControl: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormField: ({ render }: { render: any }) => render({ field: {} }),
  FormItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  FormLabel: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
  FormMessage: () => <div />,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    disabled,
    type,
  }: {
    children: React.ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }) => (
    <button type={type} disabled={disabled} data-testid="submit-button">
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ placeholder, type, ...props }: { placeholder?: string; type?: string; [key: string]: any }) => (
    <input placeholder={placeholder} type={type} data-testid="input" {...props} />
  ),
}));

jest.mock('@/components/ui/textarea', () => ({
  Textarea: ({ placeholder, ...props }: { placeholder?: string; [key: string]: any }) => (
    <textarea placeholder={placeholder} data-testid="textarea" {...props} />
  ),
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Loader2: () => <div data-testid="loader-icon" />,
}));

describe('プロジェクトフォーム', () => {
  // Import the component after mocks are set up
  const { ProjectForm } = require('../project-form');

  it('基本構造でフォームをレンダリングすること', () => {
    render(<ProjectForm />);

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByText('タイトル')).toBeInTheDocument();
    expect(screen.getByText('商品説明')).toBeInTheDocument();
    expect(screen.getByText('価格（円）')).toBeInTheDocument();
  });

  it('作成モードで作成ボタンをレンダリングすること', () => {
    render(<ProjectForm />);

    const button = screen.getByTestId('submit-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('作成');
  });

  it('編集モードで更新ボタンをレンダリングすること', () => {
    const mockProject = {
      id: '1',
      title: 'Test Project',
      description: 'Test description',
      price: 1000,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    };

    render(<ProjectForm project={mockProject} />);

    const button = screen.getByTestId('submit-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('更新');
  });

  it('プレースホルダー付きの入力フィールドをレンダリングすること', () => {
    render(<ProjectForm />);

    expect(screen.getByPlaceholderText('タイトルを入力してください')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('商品の説明を入力してください')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
  });

  it('モードに基づいて異なるボタンテキストをレンダリングすること', () => {
    const { rerender } = render(<ProjectForm />);
    expect(screen.getByTestId('submit-button')).toHaveTextContent('作成');

    const mockProject = {
      id: '1',
      title: 'Test Project',
      description: 'Test description',
      price: 1000,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    };

    rerender(<ProjectForm project={mockProject} />);
    expect(screen.getByTestId('submit-button')).toHaveTextContent('更新');
  });

  it('編集モードを正しく検出すること', () => {
    const mockProject = {
      id: '1',
      title: 'Test Project',
      description: 'Test description',
      price: 1000,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    };

    render(<ProjectForm project={mockProject} />);

    // In edit mode, the button should show "更新"
    expect(screen.getByTestId('submit-button')).toHaveTextContent('更新');
  });
});
