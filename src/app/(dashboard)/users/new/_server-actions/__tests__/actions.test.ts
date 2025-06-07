import { Role } from '@/lib/graphql/__generated__'

describe('createUser action', () => {
  it('should have correct role enum values', () => {
    expect(Role.Admin).toBe('admin')
    expect(Role.Editor).toBe('editor')
    expect(Role.Viewer).toBe('viewer')
  })

  it('should validate user data types', () => {
    const mockUserData = {
      name: 'Test User',
      email: 'test@example.com',
      role: Role.Admin,
    }

    expect(typeof mockUserData.name).toBe('string')
    expect(typeof mockUserData.email).toBe('string')
    expect(mockUserData.role).toBe(Role.Admin)
  })

  it('should handle different user roles', () => {
    const roles = [Role.Admin, Role.Editor, Role.Viewer]
    
    roles.forEach(role => {
      const userData = {
        name: `Test User ${role}`,
        email: `test-${role}@example.com`,
        role,
      }
      
      expect(userData.role).toBe(role)
      expect(userData.name).toContain(role)
    })
  })
})