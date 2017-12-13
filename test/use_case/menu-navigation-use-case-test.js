// Run from command line via
// $ mocha menu-navigation-use-case-test.js --timeout=40000

const webdriver = require('selenium-webdriver');
const HomePage = require('../../lib/pages/home-page');
const ContactPage = require('../../lib/pages/contact-page');
const ThankYouPage = require('../../lib/pages/thank-you-page');

const By = webdriver.By;       // DRY
const until = webdriver.until;

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences(); 
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setLoggingPrefs(pref)
    .build();

describe('Menu Navigation Test', () => {
  process.on('unhandledRejection', error => {
    throw(error); // promote promise warning to mocha error
  });
  
  before(async () => {
    this.homePage = new HomePage(webdriver, driver);
    this.contactPage = new ContactPage(webdriver, driver);
    this.thankYouPage = new ThankYouPage(webdriver, driver);
  });

  it('Use case - sls website menu navigation test', async () => {
    console.log('* Start of sls website menu navigation test');
    
    console.log('- Home Page');
    await this.homePage.navigateToArticle();

    console.log('- Contact Page');
    await this.homePage.menu.clickContactMenuItem();
    await this.contactPage.waitForArticle();

    console.log('- Thank You Page');
    await this.contactPage.menu.clickThankYouMenuItem();
    await this.thankYouPage.waitForArticle(); 

    console.log('- Back to Home Page');
    await this.thankYouPage.menu.clickHomeMenuItem();
    await this.homePage.waitForArticle();

    console.log('- Checking Webdriver logs');
    await this.homePage.dumpWebDriverLogs();

  }); 

  after(async () => await driver.quit() );

});
