// Run from command line via
// $ mocha menu-navigation-use-case-test.js --timeout=40000

const webdriver = require('selenium-webdriver');
const HomePage = require('../../lib/pages/home-page');
const ContactPage = require('../../lib/pages/contact-page');
const ThankYouPage = require('../../lib/pages/thank-you-page');

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences();

// run locally
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setLoggingPrefs(pref)
  .build();

// const driver = new webdriver.Builder()
//   .forBrowser('chrome', '', 'MAC')
//   .usingServer('http://192.168.0.144:4444/wd/hub')
//   .setLoggingPrefs(pref)
//   .build();

// const driver = new webdriver.Builder()
//   .forBrowser('chrome', '', 'WINDOWS')
//   .usingServer('http://192.168.0.144:4444/wd/hub')
//   .setLoggingPrefs(pref)
//   .build();

describe('Menu Navigation Test', () => {
  process.on('unhandledRejection', (error) => {
    throw (error); // promote promise warning to mocha error
  });

  before(async () => {
    this.homePage = new HomePage(webdriver, driver);
    this.contactPage = new ContactPage(webdriver, driver);
    this.thankYouPage = new ThankYouPage(webdriver, driver);
  });

  it('Use case - sls website menu navigation test', async () => {
    this.homePage.log('* Start of sls website menu navigation test using grid');

    this.homePage.log('- Home Page');
    await this.homePage.navigateToArticle();

    this.homePage.log('- Contact Page');
    await this.homePage.menu.clickContactMenuItem();
    await this.contactPage.waitForArticle();

    this.contactPage.log('- Thank You Page');
    await this.contactPage.menu.clickThankYouMenuItem();
    await this.thankYouPage.waitForArticle();

    this.contactPage.log('- Back to Home Page');
    await this.thankYouPage.menu.clickHomeMenuItem();
    await this.homePage.waitForArticle();

    this.homePage.log('- Checking Webdriver logs');
    await this.homePage.dumpWebDriverLogs();
  });
  after(async () => driver.quit());
});
