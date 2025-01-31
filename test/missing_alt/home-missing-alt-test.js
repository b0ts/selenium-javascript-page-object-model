// Run from command line via
// $ mocha home-missing-alt-test.js --timeout=40000

// Important to know what type of tests are subject to
// Selenium Stale Data issues and keep them separated
// Resolving missing alt tags is important for SEO rating and
// website accessibility compliance
// https://www.w3.org/standards/webdesign/accessibility

const webdriver = require('selenium-webdriver');
const HomePage = require('../../lib/pages/home-page');

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setLoggingPrefs(pref)
  .build();

describe('Home Missing Alt Tags Test', () => {
  process.on('unhandledRejection', (error) => {
    throw (error); // promote promise warning to mocha error
  });

  before(async () => {
    this.homePage = new HomePage(webdriver, driver);
  });

  it('Home Missing Alt Test test', async () => {
    this.homePage.log('* Start of Home Missing Alt Tags Test');
    await this.homePage.navigateToArticle();

    this.homePage.log('- Testing for missing Alt Tags');
    await this.homePage.checkPageForMissingAltTags();

    this.homePage.log('- Checking Webdriver logs');
    await this.homePage.dumpWebDriverLogs();

    this.homePage.log('! End of Home Missing Alt Tags Test\n');
  });

  after(async () => driver.quit());
});
