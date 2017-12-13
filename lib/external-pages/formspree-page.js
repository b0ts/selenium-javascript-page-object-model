// Air visual is an external page on the air visual site that
// Gives additional information about the air quality
"use strict";

var PageBase = require('../page-base');

class FormspreePage extends PageBase {
	constructor(
		webdriver, 
		driver, 
		waitTimeout = 30000) {
		const titleContents = 'Formspree';
		const targetUrl = 'https://formspree.io/rhbourbonnais@yahoo.com';
		super(webdriver, driver, targetUrl, titleContents, waitTimeout);
	}
}

module.exports = FormspreePage;
