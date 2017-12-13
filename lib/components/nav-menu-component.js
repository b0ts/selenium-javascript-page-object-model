// Nav Menu Component has the functionality to test the menu
// Component of the SLS SPA

"use strict";
const assert = require('assert');
var ComponentBase = require('../component-base');

class NavMenuComponent extends ComponentBase {
	constructor ( 
		webdriver,
		driver,
		waitTimeout = 20000
	) {
    super(webdriver, driver, waitTimeout);
	}

	async clickHomeMenuItem() {
    await this.clickWhenClickableByCss('.menu-home', this.waitTimeout);
	}

  async clickContactMenuItem() {
    await this.clickWhenClickableByCss('.menu-contact', this.waitTimeout);
  }

  async clickThankYouMenuItem() {
    await this.clickWhenClickableByCss('.submenu-info', this.waitTimeout);
    await this.clickWhenClickableByCss('.menu-thank', this.waitTimeout);
  }
}

module.exports = NavMenuComponent;

