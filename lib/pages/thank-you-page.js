// The thank you page rewards the users with a confetti display
"use strict";
var SpaPageBase = require('../spa-page-base');

class ThankYouPage extends SpaPageBase {
	constructor ( 
		webdriver,
		driver, 
		targetUrl = 'https://www.sweetlightstudios.com/thank-you',
		waitTimeout = 10000
		) {
		const articleSelector = 'article.thank-you'; 
		super(webdriver, driver, targetUrl, articleSelector, waitTimeout);
	}

}

module.exports = ThankYouPage;