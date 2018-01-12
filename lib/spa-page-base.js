// Added functionality for internal Single Page Application (SPA) pages
const assert = require('assert');

const PageBase = require('./page-base');
const NavMenuComponent = require('./components/nav-menu-component');

class SpaPageBase extends PageBase {
  constructor(
    webdriver,
    driver,
    targetUrl = null,
    articleSelector = null,
    waitTimeout = 10000,
  ) {
    // all sweet light studios SPA pages have same titleContents
    const titleContents = 'South San Francisco';
    super(webdriver, driver, targetUrl, titleContents, waitTimeout);
    this.articleSelector = articleSelector;
    this.menu = new NavMenuComponent(webdriver, driver);
  }

  async navigateToArticle() {
    await this.navigate();
    await this.waitForArticle();
  }

  async waitForArticle() {
    console.log(`- Expecting article with name: ${this.articleSelector}`);
    await this.waitForElementByCss(this.articleSelector, this.waitTimeout);
  }

  async checkPageForMissingAltTags() {
    const skipSrc = 'https://dbeg14ta4byob.cloudfront.net/img/logo/';
    // skipSrc = " "; // comment this in to see test fail
    const images = await this.waitForElementsByCss('img');
    await images.forEach(async (image) => {
      const altText = await image.getAttribute('alt');
      const srcText = await image.getAttribute('src');
      assert(altText.length > 0 || srcText.startsWith(skipSrc), `No altText for: ${srcText}`);
    });
  }
}

module.exports = SpaPageBase;
