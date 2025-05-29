const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1300,
  viewportHeight: 660,
  e2e: {
    baseUrl: 'https://secure.fastcheckout.vtexdemostores.com',
    chromeWebSecurity: false,
    testIsolation: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "results",
      overwrite: false,
      html: false,
      json: true
    },
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chrome') {
          launchOptions.args.push('--disable-cache');
        }
        return launchOptions;
      });
    },
    defaultCommandTimeout: 15000,
  },
});
