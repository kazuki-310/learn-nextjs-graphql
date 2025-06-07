export interface UserTestData {
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface TestConfig {
  baseUrl: string;
  timeout: number;
  slowMo: number;
  headless: boolean;
  screenshots: {
    enabled: boolean;
    path: string;
  };
}