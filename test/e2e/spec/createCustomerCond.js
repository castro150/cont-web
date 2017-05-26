describe('Create customer SN test', function() {
	var createBtn = element(by.id('create-btn'));
	var successMsg = element(by.id('success-msg'));
	var addSyndicBtn = element(by.name('addSyndicBtn'));
	var removeSyndicBtn = element.all(by.name('removeSyndicBtn')).first();

	var customerNumber = element(by.name('customerNumber'));
	var customerAlterNumber = element(by.name('customerAlterNumber'));
	var startServiceDate = element(by.name('startServiceDate'));
	var startActivityDate = element(by.name('startActivityDate'));
	var cnpj = element(by.name('cnpj'));
	var customerName = element(by.name('customerName'));
	var stateRegist = element(by.name('stateRegist'));
	var municipalRegist = element(by.name('municipalRegist'));
	var customerAddress = element(by.name('customerAddress'));
	var customerDistrict = element(by.name('customerDistrict'));
	var customerCity = element(by.name('customerCity'));
	var customerState = element(by.name('customerState'));
	var cep = element(by.name('cep'));
	var syndicName0 = element(by.name('syndicName0'));
	var syndicEmail0 = element(by.name('syndicEmail0'));
	var syndicTel0 = element(by.name('syndicTel0'));
	var syndicPeriod0 = element(by.name('syndicPeriod0'));
	var syndicCpf0 = element(by.name('syndicCpf0'));
	var syndicIdentity0 = element(by.name('syndicIdentity0'));
	var syndicName1 = element(by.name('syndicName1'));
	var syndicEmail1 = element(by.name('syndicEmail1'));
	var syndicTel1 = element(by.name('syndicTel1'));
	var syndicPeriod1 = element(by.name('syndicPeriod1'));
	var syndicCpf1 = element(by.name('syndicCpf1'));
	var syndicIdentity1 = element(by.name('syndicIdentity1'));
	var cae = element(by.name('cae'));
	var nirc = element(by.name('nirc'));
	var gpsCode = element(by.name('gpsCode'));
	var management = element(by.name('management'));
	var obs = element(by.name('obs'));
	var cnae = element(by.name('cnae'));
	var registryOffice = element(by.name('registryOffice'));
	var syndicateName = element(by.name('syndicateName'));
	var syndicateCode = element(by.name('syndicateCode'));
	var ao = element(by.name('ao1'));

	beforeEach(function() {
		browser.get('http://localhost:9001/#/cadastro/cond');
	});

	it('Try to create without all needed fields should return error', function() {
		createBtn.click();
		expect(successMsg.isPresent()).toBe(false);
	});

	it('Try to create with all needed fields should return success', function() {
		customerNumber.sendKeys('3');
		cnpj.sendKeys('11236987000195');
		customerName.sendKeys('Acessoria de JVJ e outros');
		customerAddress.sendKeys('RUA DAS ESTRELAS, 777');
		customerDistrict.sendKeys('VILA DA SERRA');
		customerCity.sendKeys('NOVA LIMA');
		customerState.sendKeys('MG');
		cep.sendKeys('34000000');
		syndicName0.sendKeys('Adriana Ferreira');
		syndicEmail0.sendKeys('adriana@gmail.com');
		syndicTel0.sendKeys('3133333333');
		syndicPeriod0.sendKeys('2015/2016');
		syndicCpf0.sendKeys('95175384277');
		syndicIdentity0.sendKeys('MG-5.678.721');

		createBtn.click();
		expect(successMsg.isPresent()).toBe(true);
	});

	it('Try to create with all fields should return success', function() {
		customerNumber.sendKeys('3');
		customerAlterNumber.sendKeys('00203');
		startServiceDate.sendKeys('01/01/2015');
		startActivityDate.sendKeys('01/01/2015');
		cnpj.sendKeys('11236987000195');
		customerName.sendKeys('Acessoria de JVJ e outros');
		stateRegist.sendKeys('753951');
		municipalRegist.sendKeys('951753');
		customerAddress.sendKeys('RUA DAS ESTRELAS, 777');
		customerDistrict.sendKeys('VILA DA SERRA');
		customerCity.sendKeys('NOVA LIMA');
		customerState.sendKeys('MG');
		cep.sendKeys('34000000');
		syndicName0.sendKeys('Adriana Ferreira');
		syndicEmail0.sendKeys('adriana@gmail.com');
		syndicTel0.sendKeys('3133333333');
		syndicPeriod0.sendKeys('2015/2016');
		syndicCpf0.sendKeys('95175384277');
		syndicIdentity0.sendKeys('MG-5.678.721');
		addSyndicBtn.click();
		addSyndicBtn.click();
		removeSyndicBtn.click();
		syndicName1.sendKeys('Adriana Ferreira 2');
		syndicEmail1.sendKeys('adriana2@gmail.com');
		syndicTel1.sendKeys('3133333333');
		syndicPeriod1.sendKeys('2016/2017');
		syndicCpf1.sendKeys('32598741652');
		syndicIdentity1.sendKeys('MG-10.171.324');
		cae.sendKeys('7777777');
		nirc.sendKeys('681');
		gpsCode.sendKeys('2108');
		management.sendKeys('Sócios assinam');
		obs.sendKeys('Just an observation');
		cnae.sendKeys('45-11-1-2');
		registryOffice.sendKeys('JAGUARÃO');
		syndicateName.sendKeys('Sindicato dos Acessoristas');
		syndicateCode.sendKeys('123456');
		ao.click();

		createBtn.click();
		expect(successMsg.isPresent()).toBe(true);
	});
});
