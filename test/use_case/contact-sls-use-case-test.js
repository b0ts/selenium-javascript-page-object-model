// Run from command line via
// $ mocha contact-sls-use-case-test.js --timeout=40000

const webdriver = require('selenium-webdriver');
const HomePage = require('../../lib/pages/home-page');
const ContactPage = require('../../lib/pages/contact-page');
const FormspreePage = require('../../lib/external-pages/formspree-page');

const By = webdriver.By;       // DRY
const until = webdriver.until;

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences(); 
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setLoggingPrefs(pref)
    .build();

describe('Contact Form Tests', () => {
  process.on('unhandledRejection', error => {
    throw(error); // promote promise warning to mocha error
  });
  
  before(async () => {
    this.homePage = new HomePage(webdriver, driver);
    this.contactPage = new ContactPage(webdriver, driver);
    this.formspreePage = new FormspreePage(webdriver, driver); 
  });

  it('Use case - send contact form to formspree via button', async () => {
    console.log('* Start of send contact form to formspree via button');
    await submitForm(true);
    console.log('! End of send contact form to formspree via button\n');
  });

  it('Use case - send contact form to formspree via submit', async () => {
    console.log('* Start of send contact form to formspree via submit');
    await submitForm(false);
    console.log('! End of send contact form to formspree via submit\n');
  });

  let submitForm = async (button = true) => {
    console.log('- Start at home page');
    await this.homePage.navigateToArticle();

    console.log('- Click contact menu item to navigate to contact page');
    await this.homePage.menu.clickContactMenuItem();
    await this.contactPage.waitForArticle();
  
    console.log('- Fill out form with test data');
    await this.contactPage.fillOutForm();

    if (button === true) {
      console.log('- Click the contact button');
      await this.contactPage.clickContactButton();
    } else {
      console.log('- Submit the form');
      await this.contactPage.submitForm();
    }
    this.formspreePage.waitForTitle();

    console.log('- Return to contact page');
    await this.formspreePage.returnFromDestination();
    await this.contactPage.waitForArticle();

    console.log('- Click home menu item to navigate to home page');
    await this.contactPage.clickHomeMenuItem();
    await this.homePage.waitForArticle();

    console.log('- Checking Webdriver logs');
    await this.homePage.dumpWebDriverLogs();

  } 

  after( async () => await driver.quit() );

});
