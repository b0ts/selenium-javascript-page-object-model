// Run from command line via
// $ mocha thank-you-missing-alt-test.js --timeout=40000

// Important to know what type of tests are subject to 
// Selenium Stale Data issues and keep them separated
// Resolving missing alt tags is important for SEO rating and
// website accessibility compliance
// https://www.w3.org/standards/webdesign/accessibility 

const webdriver = require('selenium-webdriver');
const ThankYouPage = require('../../lib/pages/thank-you-page');

const By = webdriver.By;       // DRY
const until = webdriver.until;

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences(); 
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setLoggingPrefs(pref)
    .build();

describe('Thank You Page Missing Alt Tags Test', () => {
  process.on('unhandledRejection', error => {
    throw(error); // promote promise warning to mocha error
  });
  
  before(async () => {
    this.thankYouPage = new ThankYouPage(webdriver, driver);
   });

  it('Thank You Page Missing Alt Test test', async () => {
    console.log('* Start of Thank You Page Missing Alt Tags Test');
    await this.thankYouPage.navigateToArticle();

    console.log('- Testing for missing Alt Tags');
    await this.thankYouPage.checkPageForMissingAltTags();

    console.log('- Checking Webdriver logs');
    await this.thankYouPage.dumpWebDriverLogs();

    console.log('! End of Thank You Page Missing Alt Tags Test\n')
  }); 

  after(async () => await driver.quit() );

});
