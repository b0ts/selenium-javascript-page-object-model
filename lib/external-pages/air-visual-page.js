// Air visual is an external page on the air visual site that
// Gives additional information about the air quality
"use strict";

var PageBase = require('../page-base');

class AirVisualPage extends PageBase {
	constructor(
		webdriver, 
		driver, 
		waitTimeout = 30000) {
		const titleContents = 'AirVisual - Real-time air quality';
		const targetUrl = 'https://www.airvisual.com/usa/california/san-francisco';
		super(webdriver, driver, targetUrl, titleContents, waitTimeout);
	}
}

module.exports = AirVisualPage;
