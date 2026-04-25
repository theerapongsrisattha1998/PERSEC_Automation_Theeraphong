import { defineConfig, devices } from '@playwright/test';

module.exports = defineConfig({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true,
  workers: 1,       
  reporter: 'html',
  use: {
    channel: 'chrome',
    headless: process.env.CI ? true : false,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  },
});