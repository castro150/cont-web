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
	var contactQuantity = element.all(by.name('contactQuantity')).first();
	var contactName0 = element(by.name('contactName0'));
	var contactEmail0 = element(by.name('contactEmail0'));
	var contactTel0 = element(by.name('contactTel0'));
	var contactCel0 = element(by.name('contactCel0'));
	var contactName1 = element(by.name('contactName1'));
	var contactEmail1 = element(by.name('contactEmail1'));
	var contactTel1 = element(by.name('contactTel1'));
	var contactCel1 = element(by.name('contactCel1'));
	var cei = element(by.name('cei'));
	var gpsCode = element(by.name('gpsCode'));
	var accessCode = element(by.name('accessCode'));
	var accessPassword = element(by.name('accessPassword'));
	var obs = element(by.name('obs'));

	beforeEach(function() {
		browser.get('http://localhost:9001/#/cadastro/pf');
		element(by.id('type-combo')).click();
		$('[value="customer.type.pf.ed"]').click();
	});

	it('Try to create without all needed fields should return error', function() {
		createBtn.click();
		expect(successMsg.isPresent()).toBe(false);
	});

	it('Try to create with all needed fields should return success', function() {
		customerNumber.sendKeys('503');
		customerName.sendKeys('ADRIANA CARVALHO FERREIRA');
		cpf.sendKeys('86798584677');
		customerAddress.sendKeys('RUA DAS ESTRELAS, 777');
		customerDistrict.sendKeys('VILA DA SERRA');
		customerCity.sendKeys('NOVA LIMA');
		customerState.sendKeys('MG');
		cep.sendKeys('34000000');
		contactName0.sendKeys('Adriana Ferreira');
		contactEmail0.sendKeys('adriana@gmail.com');
		contactTel0.sendKeys('3133333333');
		contactCel0.sendKeys('999999999');

		createBtn.click();
		expect(successMsg.isPresent()).toBe(true);
	});

	it('Try to create with all fields should return success', function() {
		customerNumber.sendKeys('503');
		customerName.sendKeys('ADRIANA CARVALHO FERREIRA');
		cpf.sendKeys('86798584677');
		customerAlterNumber.sendKeys('00972');
		startServiceDate.sendKeys('01/01/2015');
		customerAddress.sendKeys('RUA DAS ESTRELAS, 777');
		customerDistrict.sendKeys('VILA DA SERRA');
		customerCity.sendKeys('NOVA LIMA');
		customerState.sendKeys('MG');
		cep.sendKeys('34000000');
		contactQuantity.click();
		$('[value="2"]').click();
		contactName0.sendKeys('Adriana Ferreira');
		contactEmail0.sendKeys('adriana@gmail.com');
		contactTel0.sendKeys('3133333333');
		contactCel0.sendKeys('999999999')
		contactName1.sendKeys('Adriana Ferreira 2');
		contactEmail1.sendKeys('adriana2@gmail.com');
		contactTel1.sendKeys('3133333333');
		contactCel1.sendKeys('999999999');
		cei.sendKeys('123456');
		gpsCode.sendKeys('2108');
		accessCode.sendKeys('1111');
		accessPassword.sendKeys('passcode');
		obs.sendKeys('Just an observation');

		createBtn.click();
		expect(successMsg.isPresent()).toBe(true);
	});
});
