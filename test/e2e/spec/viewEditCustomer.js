describe('Create customer LP test', function() {
	var customerList = element.all(by.repeater('rowData in mdtPaginationHelper.getRows()'));
	var tabs = element.all(by.css('.md-tab'));
	var editBtn = element(by.id('edit-btn'));
	var saveBtn = element(by.id('save-btn'));
	var successAlerts = element.all(by.id('success-alert'));

	var companyName = element(by.name('companyName'));
	var customerName = element(by.name('customerName'));
	var customerAddress = element(by.name('customerAddress'));
	var contactName0 = element(by.name('contactName0'));
	var partnerName0 = element(by.name('partnerName0'));
	var cae = element(by.name('cae'));
	var cei = element(by.name('cei'));
	var ao = element(by.name('ao2'));

	beforeEach(function() {
		browser.get('http://localhost:9001/#/clientes');
	});

	it('All customers should be displayed', function() {
		expect(customerList.count()).toBe(4);
	});

	it('Filter by name or number should displayed the correct customers', function() {
		var filter = element(by.name('searchCustomer'));

		filter.clear();
		filter.sendKeys('3');
		expect(customerList.count()).toBe(3);

		filter.clear();
		filter.sendKeys('32');
		expect(customerList.count()).toBe(1);

		filter.clear();
		filter.sendKeys('5');
		expect(customerList.count()).toBe(1);

		filter.clear();
		filter.sendKeys('503');
		expect(customerList.count()).toBe(1);

		filter.clear();
		filter.sendKeys('972');
		expect(customerList.count()).toBe(0);

		filter.clear();
		filter.sendKeys('co');
		expect(customerList.count()).toBe(2);

		filter.clear();
		filter.sendKeys('CO');
		expect(customerList.count()).toBe(2);

		filter.clear();
		filter.sendKeys('Co');
		expect(customerList.count()).toBe(2);

		filter.clear();
		filter.sendKeys('cO');
		expect(customerList.count()).toBe(2);

		filter.clear();
		filter.sendKeys('com');
		expect(customerList.count()).toBe(1);
	});

	it('Edit PL customer should be possible and all informations ok', function() {
		$('[href="#/clientes/58f8b98e08d9e02f60a09f92"]').click();
		expect(tabs.count()).toBe(12);
		expect(companyName.isEnabled()).toBe(false);
		expect(customerAddress.isEnabled()).toBe(false);
		expect(contactName0.isEnabled()).toBe(false);
		expect(partnerName0.isEnabled()).toBe(false);
		expect(cae.isEnabled()).toBe(false);

		editBtn.click();
		companyName.sendKeys('2');

		tabs.get(1).click();
		customerAddress.sendKeys('a');

		tabs.get(2).click();
		contactName0.sendKeys('a');

		tabs.get(3).click();
		partnerName0.sendKeys('a');

		tabs.get(4).click();
		cae.sendKeys('7');

		tabs.get(5).click();
		ao.click();

		saveBtn.click();
		expect(successAlerts.count()).toBe(1);
	});

	it('Edit SN customer should be possible and all informations ok', function() {
		$('[href="#/clientes/58ef6c7b14a28816e63a590f"]').click();
		expect(tabs.count()).toBe(12);
		expect(companyName.isEnabled()).toBe(false);
		expect(customerAddress.isEnabled()).toBe(false);
		expect(contactName0.isEnabled()).toBe(false);
		expect(partnerName0.isEnabled()).toBe(false);
		expect(cae.isEnabled()).toBe(false);

		editBtn.click();
		companyName.sendKeys('2');

		tabs.get(1).click();
		customerAddress.sendKeys('a');

		tabs.get(2).click();
		contactName0.sendKeys('a');

		tabs.get(3).click();
		partnerName0.sendKeys('a');

		tabs.get(4).click();
		cae.sendKeys('7');

		tabs.get(5).click();
		ao.click();

		saveBtn.click();
		expect(successAlerts.count()).toBe(1);
	});

	it('Edit PL customer should be possible and all informations ok', function() {
		$('[href="#/clientes/58ef6a6c14a28816e63a590b"]').click();
		expect(tabs.count()).toBe(10);
		expect(customerName.isEnabled()).toBe(false);
		expect(customerAddress.isEnabled()).toBe(false);
		expect(contactName0.isEnabled()).toBe(false);
		expect(cei.isEnabled()).toBe(false);

		editBtn.click();
		customerName.sendKeys('2');

		tabs.get(1).click();
		customerAddress.sendKeys('a');

		tabs.get(2).click();
		contactName0.sendKeys('a');

		tabs.get(3).click();
		cei.sendKeys('7');

		tabs.get(4).click();
		ao.click();

		saveBtn.click();
		expect(successAlerts.count()).toBe(1);
	});

	// TODO
	// it('Edit ED customer should be possible and all informations ok', function() {
	//  browser.sleep(1000000);
	// 	$('[href="#/clientes/58ef6a6c14a28816e63a590b"]').click();
	// 	expect(tabs.count()).toBe(10);
	// 	expect(customerName.isEnabled()).toBe(false);
	// 	expect(customerAddress.isEnabled()).toBe(false);
	// 	expect(contactName0.isEnabled()).toBe(false);
	// 	expect(cei.isEnabled()).toBe(false);
	//
	// 	editBtn.click();
	// 	customerName.sendKeys('2');
	//
	// 	tabs.get(1).click();
	// 	customerAddress.sendKeys('a');
	//
	// 	tabs.get(2).click();
	// 	contactName0.sendKeys('a');
	//
	// 	tabs.get(3).click();
	// 	cei.sendKeys('7');
	//
	// 	tabs.get(4).click();
	// 	ao.click();
	//
	// 	saveBtn.click();
	// 	expect(successAlerts.count()).toBe(1);
	// });
});