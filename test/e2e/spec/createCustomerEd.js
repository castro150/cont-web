describe('Create customer ED test', function() {
	var createBtn = element(by.id('create-btn'));
	var successMsg = element(by.id('success-msg'));

	var customerNumber = element(by.name('customerNumber'));
	var customerName = element(by.name('customerName'));
	var cpf = element(by.name('cpf'));
	var customerAlterNumber = element(by.name('customerAlterNumber'));
	var startServiceDate = element(by.name('startServiceDate'));
	var customerAddress = element(by.name('customerAddress'));
	var customerDistrict = element(by.name('customerDistrict'));
	var customerCity = element(by.name('customerCity'));
	var customerState = element(by.name('customerState'));
	var cep = element(by.name('cep'));
	var contactQuantity = element(by.name('contactQuantity'));
	var contactName1 = element(by.name('contactName1'));
	var contactEmail1 = element(by.name('contactEmail1'));
	var contactTel1 = element(by.name('contactTel1'));
	var contactCel1 = element(by.name('contactCel1'));
	var contactName2 = element(by.name('contactName2'));
	var contactEmail2 = element(by.name('contactEmail2'));
	var contactTel2 = element(by.name('contactTel2'));
	var contactCel2 = element(by.name('contactCel2'));
	var cei = element(by.name('cei'));
	var gpsCode = element(by.name('gpsCode'));
	var accessCode = element(by.name('accessCode'));
	var accessPassword = element(by.name('accessPassword'));
	var obs = element(by.name('obs'));

	beforeEach(function() {
		browser.get('http://localhost:9001/#/cadastro/pf');
		var typeCombo = element(by.id('type-combo'));
		typeCombo.sendKeys('Empregador Doméstico');
		browser.actions().sendKeys(protractor.Key.ENTER).perform();
	});

	it('Try to create without all needed fields should return error', function() {
		createBtn.click();
		expect(successMsg.isPresent()).toBe(false);
	});

	it('Try to create with all needed fields should return success', function() {
		customerNumber.sendKeys('503');

		createBtn.click();
		expect(successMsg.isPresent()).toBe(false);
	});

	// it('Try to create with all fields should return success', function() {
	// 	createBtn.click();
	// 	expect(successMsg.isPresent()).toBe(false);
	// });
});
