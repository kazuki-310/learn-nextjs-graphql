module.exports = {
  getServerSession: jest.fn(() => Promise.resolve(null)),
  authOptions: {},
  NextAuth: jest.fn(() => ({
    handlers: {
      GET: jest.fn(),
      POST: jest.fn(),
    },
  })),
};