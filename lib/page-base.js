// Functionality for both external and internal page object
"use strict";
var ComponentBase = require('./component-base');

class PageBase extends ComponentBase {
	constructor ( 
		webdriver,
		driver,
		targetUrl,
		titleContents,
		waitTimeout = 10000) {
		super(webdriver, driver, waitTimeout);
		this.targetUrl = targetUrl;
		this.titleContents = titleContents;
		this.waitTimeout = waitTimeout;
	}

	async navigate() {
		await this.driver.navigate().to(this.targetUrl);
 		await this.waitForTitle();
	}

	async waitForTitle() {
		console.log('- Expecting Title to Contain: ' + this.titleContents);
    await this.driver.wait(
    	this.webdriver.until.titleContains(this.titleContents),
    	this.waitTimeout
    );
	}

	// returns from a navigation destination - like pressing browser back button
	async returnFromDestination() {
		return await this.driver.navigate().back();		
	}

	async refreshPage() {
		return await this.driver.navigate().refresh();
	}


}

module.exports = PageBase;