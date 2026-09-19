import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests', timeout: 60000, fullyParallel: false,
 use: { baseURL: 'http://localhost:3000', channel: 'msedge', headless: true },
 webServer: { command: 'npm.cmd run start -- --host 127.0.0.1', url: 'http://localhost:3000', reuseExistingServer: false },
});
