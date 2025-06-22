module.exports = {
  getCurrentUser: jest.fn(() => Promise.resolve({
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  })),
  authOptions: {},
};