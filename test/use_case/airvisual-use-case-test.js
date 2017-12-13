// Run from command line via
// $ mocha airvisual-use-case-test.js --timeout=40000

const webdriver = require('selenium-webdriver');
const AirVisualPage = require('../../lib/external-pages/air-visual-page');
const ContactPage = require('../../lib/pages/contact-page');
const HomePage = require('../../lib/pages/home-page');

const By = webdriver.By;       // DRY
const until = webdriver.until;

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences(); 
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setLoggingPrefs(pref)
    .build();

describe('AirVisual Tests', () => {
  process.on('unhandledRejection', error => {
    throw(error); // promote promise warning to mocha error
  });
  
  before(async () => {
    this.homePage = new HomePage(webdriver, driver);
    this.contactPage = new ContactPage(webdriver, driver);
    this.airVisualPage = new AirVisualPage(webdriver, driver, 20000); 
  });

  it('Use case - navigate to AirVisual and back home', async () => {
    console.log('* Start of navigate to AirVisual and back home use case');
    await this.homePage.navigateToArticle();

    console.log('- Click contact menu item to navigate to contact page');
    await this.homePage.menu.clickContactMenuItem();
    await this.contactPage.waitForArticle();
  
    console.log('- Click air visual widget to navigate to AirVisual site');
    await this.contactPage.clickAirVisualWidget();
    await this.airVisualPage.waitForTitle();

    console.log('- Return to contact page');
    await this.airVisualPage.returnFromDestination();
    await this.contactPage.waitForArticle();

    console.log('- Click home menu item to navigate to home page');
    await this.contactPage.menu.clickHomeMenuItem();
    await this.homePage.waitForArticle();

    console.log('- Checking Webdriver logs');
    await this.homePage.dumpWebDriverLogs();

    console.log('! End of navigate to AirVisual site test\n');
  }); 

  after(async () => await driver.quit() );

});
