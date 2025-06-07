import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from '../page'

// Mock the UserForm component
jest.mock('../../_components/user-form', () => ({
  UserForm: () => <div data-testid="user-form">User Form Component</div>,
}))

describe('Users New Page', () => {
  it('should render page title', () => {
    render(<Page />)
    
    expect(screen.getByRole('heading', { name: 'ユーザー作成' })).toBeInTheDocument()
  })

  it('should render UserForm component', () => {
    render(<Page />)
    
    expect(screen.getByTestId('user-form')).toBeInTheDocument()
  })

  it('should have correct page structure', () => {
    render(<Page />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('space-y-6')
  })
})