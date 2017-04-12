describe('angularjs todo mvc homepage', function() {
	it('should have a title', function() {
		browser.get('http://todomvc.com/examples/angularjs/#/');

		expect(browser.getTitle()).toEqual('AngularJS • TodoMVC');
	});
});
