// Run from command line via
// $ mocha contact-missing-alt-test.js --timeout=40000

// Important to know what type of tests are subject to
// Selenium Stale Data issues and keep them separated
// Resolving missing alt tags is important for SEO rating and
// website accessibility compliance
// https://www.w3.org/standards/webdesign/accessibility

const webdriver = require('selenium-webdriver');
const ContactPage = require('../../lib/pages/contact-page');

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setLoggingPrefs(pref)
  .build();

describe('Contact Missing Alt Tags Test', () => {
  process.on('unhandledRejection', (error) => {
    throw (error); // promote promise warning to mocha error
  });

  before(async () => {
    this.contactPage = new ContactPage(webdriver, driver);
  });

  it('Contact Missing Alt Test test', async () => {
    this.contactPage.log('* Start of Contact Missing Alt Tags Test');
    await this.contactPage.navigateToArticle();

    this.contactPage.log('- Testing for missing Alt Tags');
    await this.contactPage.checkPageForMissingAltTags();

    this.contactPage.log('- Checking Webdriver logs');
    await this.contactPage.dumpWebDriverLogs();

    this.contactPage.log('! End of Contact Missing Alt Tags Test\n');
  });

  after(async () => driver.quit());
});
