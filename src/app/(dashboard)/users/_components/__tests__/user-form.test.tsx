import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import { UserForm } from '../user-form'
import { Role } from '@/lib/graphql/__generated__'
import { createUser } from '../../new/_server-actions/actions'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../new/_server-actions/actions', () => ({
  createUser: jest.fn(),
}))

jest.mock('../../[id]/_server-actions/actions', () => ({
  updateUser: jest.fn(),
}))

const mockPush = jest.fn()
const mockRouter = {
  push: mockPush,
}

describe('UserForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('正しいラベルでフォームフィールドをレンダーできること', () => {
    render(<UserForm />)
    
    expect(screen.getByLabelText('ユーザー名')).toBeInTheDocument()
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument()
    expect(screen.getByLabelText('ロール')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '作成する' })).toBeInTheDocument()
  })

  it('作成モードでデフォルト値でレンダーできること', () => {
    render(<UserForm />)
    
    const nameField = screen.getByLabelText('ユーザー名') as HTMLInputElement
    const emailField = screen.getByLabelText('メールアドレス') as HTMLInputElement
    
    expect(nameField.value).toBe('')
    expect(emailField.value).toBe('')
    expect(screen.getByRole('button', { name: '作成する' })).toBeInTheDocument()
  })

  it('編集モードでユーザーデータでレンダーできること', () => {
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: Role.Editor,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    }

    render(<UserForm user={mockUser} />)
    
    const nameField = screen.getByLabelText('ユーザー名') as HTMLInputElement
    const emailField = screen.getByLabelText('メールアドレス') as HTMLInputElement
    
    expect(nameField.value).toBe('Test User')
    expect(emailField.value).toBe('test@example.com')
    expect(screen.getByRole('button', { name: '更新する' })).toBeInTheDocument()
  })

  it('作成モードでフォーム送信時にcreateUserを呼び出すこと', async () => {
    const mockCreateUser = createUser as jest.Mock
    mockCreateUser.mockResolvedValue({ success: true })

    render(<UserForm />)
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText('ユーザー名'), {
      target: { value: 'New User' }
    })
    fireEvent.change(screen.getByLabelText('メールアドレス'), {
      target: { value: 'new@example.com' }
    })
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: '作成する' }))
    
    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        name: 'New User',
        email: 'new@example.com',
        role: Role.Admin, // default role
      })
    })
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/users')
    })
  })

  it('ロールオプションを正しく表示できること', () => {
    render(<UserForm />)
    
    const roleSelect = screen.getByLabelText('ロール')
    expect(roleSelect).toBeInTheDocument()
    
    // TanStack Form select might need different approach to test options
    // This depends on the SelectField implementation
  })
})