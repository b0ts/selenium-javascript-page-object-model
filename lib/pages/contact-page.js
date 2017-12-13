// The contact page allows users to contact sweet light studios
"use strict";
const assert = require('assert');
var SpaPageBase = require('../spa-page-base');

class ContactPage extends SpaPageBase {
	constructor ( 
		webdriver,
		driver, 
		targetUrl = 'https://www.sweetlightstudios.com/contact',
		waitTimeout = 20000
		) {
		const articleSelector = 'article.contact'; 
		super(webdriver, driver, targetUrl, articleSelector, waitTimeout);
	}

	async clickAirVisualWidget() {
    await this.clickWhenClickableByName('airvisual_widget', this.waitTimeout);
	}

	async clickHomeMenuItem() {
    await this.clickWhenClickableByCss('.menu-home', this.waitTimeout);
	}

	async clickContactButton() {
    await this.clickWhenClickableByCss('.contact-button', this.waitTimeout);
	}

	async submitForm() {
    await this.driver.findElement(this.webdriver.By.css("form[action=\"https://formspree.io/rhbourbonnais@yahoo.com\"]")).submit();
	}

  async fillOutForm () {
    const testEmail = "testytest@gmail.com";
    const testName = "Mr. Testy Test";
    const radioButtonSelector = "input[value=\"Personal Branding\"]";
    const testPhone = "831-555-1212";
    const testInfo = "I want a new picture for FB";
    const driver = this.driver; // DRY
    const By = this.webdriver.By;
    //await driver.wait(until.elementIsVisible(await driver.findElement(By.css("article.contact"))),10000);

    // fill out form
    await driver.findElement(By.id("formControlsEmail")).sendKeys(testEmail);
    await driver.findElement(By.name("name")).sendKeys(testName);
    await driver.findElement(By.css(radioButtonSelector)).click();
    await driver.findElement(By.name("phone")).sendKeys(testPhone);
    await driver.findElement(By.name("additionalInfo")).sendKeys(testInfo);

    // verify form filled out
    assert.equal(
      await driver.findElement(By.id("formControlsEmail")).getAttribute("value"), 
      testEmail, 
      "Email Not Correct"
    );

    assert.equal( 
      await driver.findElement(By.name("name")).getAttribute("value"),
      testName,
      "Name Not Correct"
    );

    assert(
      await driver.findElement(By.css(radioButtonSelector)).isSelected(),
      "Radio Button not selected" 
    );

    assert.equal(
      await driver.findElement(By.name("phone")).getAttribute("value"),
      testPhone, 
      "Phone Not Correct"
    );

    assert.equal(
      await driver.findElement(By.name("additionalInfo")).getAttribute("value"),
      testInfo, 
      "Info Not Correct"
    );

  };

}

module.exports = ContactPage;