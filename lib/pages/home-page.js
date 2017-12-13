// The contact page allows users to contact sweet light studios
"use strict";
var SpaPageBase = require('../spa-page-base');

class HomePage extends SpaPageBase {
	constructor ( 
		webdriver,
		driver, 
		targetUrl = 'https://www.sweetlightstudios.com/home',
		waitTimeout = 10000
		) {
		const articleSelector = 'article.home'; 
		super(webdriver, driver, targetUrl, articleSelector, waitTimeout);
	}

}

module.exports = HomePage;