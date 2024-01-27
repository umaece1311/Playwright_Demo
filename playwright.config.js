// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');
const { run } = require('node:test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  testDir: './tests',
  retries:1,
  workers:5,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
   /*  Maximum time one test can run */
   timeout:50*1000,
  /*  Maximum time for assertion */
  expect:{
  timeout:5000
   },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   browserName:'chromium',
   headless:true,
   screenshot:'on',
   trace:'on'
  },

 
  
});

