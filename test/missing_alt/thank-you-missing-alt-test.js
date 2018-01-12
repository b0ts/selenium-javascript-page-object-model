// Run from command line via
// $ mocha thank-you-missing-alt-test.js --timeout=40000

// Important to know what type of tests are subject to
// Selenium Stale Data issues and keep them separated
// Resolving missing alt tags is important for SEO rating and
// website accessibility compliance
// https://www.w3.org/standards/webdesign/accessibility

const webdriver = require('selenium-webdriver');
const ThankYouPage = require('../../lib/pages/thank-you-page');

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setLoggingPrefs(pref)
  .build();

describe('Thank You Page Missing Alt Tags Test', () => {
  process.on('unhandledRejection', (error) => {
    throw (error); // promote promise warning to mocha error
  });

  before(async () => {
    this.thankYouPage = new ThankYouPage(webdriver, driver);
  });

  it('Thank You Page Missing Alt Test test', async () => {
    this.thankYouPage.log('* Start of Thank You Page Missing Alt Tags Test');
    await this.thankYouPage.navigateToArticle();

    this.thankYouPage.log('- Testing for missing Alt Tags');
    await this.thankYouPage.checkPageForMissingAltTags();

    this.thankYouPage.log('- Checking Webdriver logs');
    await this.thankYouPage.dumpWebDriverLogs();

    this.thankYouPage.log('! End of Thank You Page Missing Alt Tags Test\n');
  });
  after(async () => driver.quit());
});
