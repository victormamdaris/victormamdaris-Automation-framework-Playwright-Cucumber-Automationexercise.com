import * as dotenv from 'dotenv';
import { Config, Environment, BrowserConfig } from '../types/config.types';

dotenv.config();

const getEnvironment = (): Environment => {
  const env = process.env.ENV || 'dev';
  
  const environments: Record<string, Environment> = {
    dev: {
      name: 'Development',
      baseUrl: process.env.DEV_URL || 'https://automationexercise.com',
      apiUrl: process.env.DEV_API_URL
    },
    staging: {
      name: 'Staging',
      baseUrl: process.env.STAGING_URL || 'https://automationexercise.com',
      apiUrl: process.env.STAGING_API_URL
    },
    prod: {
      name: 'Production',
      baseUrl: process.env.PROD_URL || 'https://automationexercise.com',
      apiUrl: process.env.PROD_API_URL
    }
  };

  return environments[env] || environments.dev;
};

const getBrowserConfig = (): BrowserConfig => {
  return {
    browser: (process.env.BROWSER as 'chromium' | 'firefox' | 'webkit') || 'chromium',
    headless: process.env.HEADLESS === 'true',
    slowMo: parseInt(process.env.SLOW_MO || '0'),
    timeout: parseInt(process.env.TIMEOUT || '30000'),
    viewport: {
      width: 1920,
      height: 1080
    }
  };
};

export const config: Config = {
  environment: getEnvironment(),
  browser: getBrowserConfig(),
  reporting: {
    reportPath: process.env.REPORT_PATH || './reports',
    screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE === 'true',
    videoOnFailure: process.env.VIDEO_ON_FAILURE === 'true'
  }
};

export default config;
