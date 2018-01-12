// Run from command line via
// $ mocha contact-sls-use-case-test.js --timeout=40000

const webdriver = require('selenium-webdriver');
const HomePage = require('../../lib/pages/home-page');
const ContactPage = require('../../lib/pages/contact-page');
const FormspreePage = require('../../lib/external-pages/formspree-page');

// The pref exposes console errors to the tests
const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setLoggingPrefs(pref)
  .build();

describe('Contact Form Tests', () => {
  process.on('unhandledRejection', (error) => {
    throw (error); // promote promise warning to mocha error
  });

  before(async () => {
    this.homePage = new HomePage(webdriver, driver);
    this.contactPage = new ContactPage(webdriver, driver);
    this.formspreePage = new FormspreePage(webdriver, driver);
  });

  const submitForm = async (button = true) => {
    this.homePage.log('- Start at home page on grid');
    await this.homePage.navigateToArticle();

    this.homePage.log('- Click contact menu item to navigate to contact page');
    await this.homePage.menu.clickContactMenuItem();
    await this.contactPage.waitForArticle();

    this.contactPage.log('- Fill out form with test data');
    await this.contactPage.fillOutForm();

    if (button === true) {
      this.contactPage.log('- Click the contact button');
      await this.contactPage.clickContactButton();
    } else {
      this.contactPage.log('- Submit the form');
      await this.contactPage.submitForm();
    }
    this.formspreePage.waitForTitle();

    this.formspreePage.log('- Return to contact page');
    await this.formspreePage.returnFromDestination();
    await this.contactPage.waitForArticle();

    this.contactPage.log('- Click home menu item to navigate to home page');
    await this.contactPage.clickHomeMenuItem();
    await this.homePage.waitForArticle();

    this.contactPage.log('- Checking Webdriver logs');
    await this.homePage.dumpWebDriverLogs();
  };

  it('Use case - send contact form to formspree via button', async () => {
    this.contactPage.log('* Start of send contact form to formspree via button');
    await submitForm(true);
    this.contactPage.log('! End of send contact form to formspree via button\n');
  });

  it('Use case - send contact form to formspree via submit', async () => {
    this.contactPage.log('* Start of send contact form to formspree via submit');
    await submitForm(false);
    this.contactPage.log('! End of send contact form to formspree via submit\n');
  });

  after(async () => driver.quit());
});
