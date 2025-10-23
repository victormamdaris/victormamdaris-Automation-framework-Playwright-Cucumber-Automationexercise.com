export interface Environment {
  name: string;
  baseUrl: string;
  apiUrl?: string;
}

export interface BrowserConfig {
  browser: 'chromium' | 'firefox' | 'webkit';
  headless: boolean;
  slowMo: number;
  timeout: number;
  viewport?: {
    width: number;
    height: number;
  };
}

export interface Config {
  environment: Environment;
  browser: BrowserConfig;
  reporting: {
    reportPath: string;
    screenshotOnFailure: boolean;
    videoOnFailure: boolean;
  };
}
