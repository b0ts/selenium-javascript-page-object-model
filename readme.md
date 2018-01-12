Selenium Webdriver Page Object Model
By Robert Bourbonnais

1.  Demonstrates a way of organizing Selenium Javascript Tests 
Using the Page Object Model popularized by Selenium Java Tests

2.  The primary advantage to using Page Objects is that when a component changes in the underlying application, it only needs to be changed in the Page object instead of each test.

3. Important - when in Chrome inspect to inspect an element on the screen - then control-f to open search window,
lets you search by name, selector or xpath.

4.  Clone this repo

5. There are a variety of drivers for different browsers and environments including:
HTMLUnitDriver
FireFoxDriver
ChromeDriver
OperaDriver 
IEDriver
RemoteDriver for Saucelabs and Grid
Various Mobile Drivers

6.  In order to run the tests, you will need to download at least the ChromeDriver and put it into your path.
I have included a webdrivers folder in this repo, that you can simply copy into your Applications folder and then edit your .bash_profile to add
export PATH="/Applications/webdrivers:$PATH"
to get going. (Note: there are also some files for setting running a Selenium Grid that isn't covered by this readme)

7.  $ npm install

8.  $ npm run test

9. Todo: Create an example of a driver class to allow easy switching and upload to github

10.  Page Model Heirachy - starting from bottom
	a.  component-base.js - base for components and pages

	b.  page-base - base for internal and external pages 
			extends component-base.js

	c.  spa-page-base.js - base for SLS SPA pages has a for non changing components such as nav-menu-component
			extends page-base

	d.  components folder - for example nav-menu-component.js 
			Components that are part of SPA
			extends component-base.js

	e.  external-pages folder - for example air-visual-page.js
			extends page-base

	f.	pages folder - for example home.page.js 
			model SLS SPA pages
			extends spa-page-base

	g.  test/use_case folder - for example menu-navigation-use-case-test.js - tests that model use cases
	Require Selenium webdirver, asserts, and several pages to accomplish testing

	h.  missing_alt folder - for example home-missing-alt-test.js - is an example of a group of tests that must be run separately because of Selenium Webdriver - stale data issues associated with react apps.  The tests should be run separately from the command line or separately via Jenkins.



