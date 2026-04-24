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
  },
});