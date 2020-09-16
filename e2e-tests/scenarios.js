'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {


	it('should automatically redirect to /basic-info when location hash/fragment is empty', function () {
		browser.get('index.html');
		expect(browser.getLocationAbsUrl()).toMatch("/basic-info");
	});


	describe('basic-info', function () {

		beforeEach(function () {
			browser.get('index.html#!/basic-info');
		});


		it('should render basic-info when user navigates to /basic-info', function () {
			expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 1/);
		});

	});


	describe('book-page', function () {

		beforeEach(function () {
			browser.get('index.html#!/book-page');
		});


		it('should render book-page when user navigates to /book-page', function () {
			expect(element.all(by.css('[ng-view] p')).first().getText()).toMatch(/partial for view 2/);
		});

	});
});
