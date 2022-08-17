const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: true,
    videosFolder: 'cypress/videos',
    defaultCommandTimeout: 6000,
    execTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    failOnStatusCode: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    baseUrl: 'https://www.theguardian.com/',
    retries: {
      runMode: 0,
    },
  },
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/**/*{spec.js,feature}',
    supportFile: './cypress/support/index.js',
  },
})
