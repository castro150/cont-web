describe('Create customer SN test', function() {
	var createBtn = element(by.id('create-btn'));
	var successMsg = element(by.id('success-msg'));

	var customerNumber = element(by.name('customerNumber'));
	var customerAlterNumber = element(by.name('customerAlterNumber'));
	var startServiceDate = element(by.name('startServiceDate'));
	var startActivityDate = element(by.name('startActivityDate'));
	var companyName = element(by.name('companyName'));
	var cnpj = element(by.name('cnpj'));
	var customerName = element(by.name('customerName'));
	var stateRegist = element(by.name('stateRegist'));
	var municipalRegist = element(by.name('municipalRegist'));
	var shareCapital = element(by.name('shareCapital'));
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
	var partnerQuantity = element.all(by.name('partnerQuantity')).first();
	var partnerName0 = element(by.name('partnerName0'));
	var partnerIdentity0 = element(by.name('partnerIdentity0'));
	var partnerCpf0 = element(by.name('partnerCpf0'));
	var partnerParticipation0 = element(by.name('partnerParticipation0'));
	var partnerName1 = element(by.name('partnerName1'));
	var partnerIdentity1 = element(by.name('partnerIdentity1'));
	var partnerCpf1 = element(by.name('partnerCpf1'));
	var partnerParticipation1 = element(by.name('partnerParticipation1'));
	var cae = element(by.name('cae'));
	var nirc = element(by.name('nirc'));
	var gpsCode = element(by.name('gpsCode'));
	var management = element(by.name('management'));
	var obs = element(by.name('obs'));
	var cnae = element(by.name('cnae'));
	var addCnaeBtn = element(by.name('add-cnae'));
	var cnae2 = element.all(by.name('cnae2'));
	var registryOffice = element(by.name('registryOffice'));
	var syndicateName = element(by.name('syndicateName'));
	var syndicateCode = element(by.name('syndicateCode'));
	var ao = element(by.name('ao2'));

	beforeEach(function() {
		browser.get('http://localhost:9001/#/cadastro/sn');
	});

	it('Try to create without all needed fields should return error', function() {
		createBtn.click();
		expect(successMsg.isPresent()).toBe(false);
	});

	it('Try to create with all needed fields should return success', function() {
		customerNumber.sendKeys('3');
		companyName.sendKeys('JVJ Acessoria');
		cnpj.sendKeys('11236987000195');
		customerName.sendKeys('Acessoria de JVJ e outros');
		customerAddress.sendKeys('RUA DAS ESTRELAS, 777');
		customerDistrict.sendKeys('VILA DA SERRA');
		customerCity.sendKeys('NOVA LIMA');
		customerState.sendKeys('MG');
		cep.sendKeys('34000000');
		contactName0.sendKeys('Adriana Ferreira');
		contactEmail0.sendKeys('adriana@gmail.com');
		contactTel0.sendKeys('3133333333');
		contactCel0.sendKeys('999999999');
		partnerName0.sendKeys('Adriana Ferreira');
		partnerIdentity0.sendKeys('MG-11111111');
		partnerCpf0.sendKeys('86798584677');
		partnerParticipation0.sendKeys('100%');

		createBtn.click();
		expect(successMsg.isPresent()).toBe(true);
	});

	it('Try to create with all fields should return success', function() {
		customerNumber.sendKeys('3');
		customerAlterNumber.sendKeys('203');
		startServiceDate.sendKeys('01/01/2015');
		startActivityDate.sendKeys('01/01/2015');
		companyName.sendKeys('JVJ Acessoria');
		cnpj.sendKeys('11236987000195');
		customerName.sendKeys('Acessoria de JVJ e outros');
		stateRegist.sendKeys('753951');
		municipalRegist.sendKeys('951753');
		shareCapital.sendKeys('R$10.000,00');
		customerAddress.sendKeys('RUA DAS ESTRELAS, 777');
		customerDistrict.sendKeys('VILA DA SERRA');
		customerCity.sendKeys('NOVA LIMA');
		customerState.sendKeys('MG');
		cep.sendKeys('34000000');
		contactQuantity.click();
		$$('[value="2"]').get(1).click();
		contactName0.sendKeys('Adriana Ferreira');
		contactEmail0.sendKeys('adriana@gmail.com');
		contactTel0.sendKeys('3133333333');
		contactCel0.sendKeys('999999999')
		contactName1.sendKeys('Adriana Ferreira 2');
		contactEmail1.sendKeys('adriana2@gmail.com');
		contactTel1.sendKeys('3133333333');
		contactCel1.sendKeys('999999999');
		partnerQuantity.click();
		$$('[value="2"]').get(2).click();
		partnerName0.sendKeys('Adriana Ferreira');
		partnerIdentity0.sendKeys('MG-11111111');
		partnerCpf0.sendKeys('86798584677');
		partnerParticipation0.sendKeys('80%');
		partnerName1.sendKeys('Camila Ferreira');
		partnerIdentity1.sendKeys('MG-11111111');
		partnerCpf1.sendKeys('86798584677');
		partnerParticipation1.sendKeys('20%');
		cae.sendKeys('7777777');
		nirc.sendKeys('681');
		gpsCode.sendKeys('2108');
		management.sendKeys('Sócios assinam');
		obs.sendKeys('Just an observation');
		cnae.sendKeys('45-11-1-2');
		addCnaeBtn.click();
		cnae2.get(0).sendKeys('45-11-1-1');
		cnae2.get(1).sendKeys('45-11-2-1');
		registryOffice.sendKeys('JAGUARÃO');
		syndicateName.sendKeys('Sindicato dos Acessoristas');
		syndicateCode.sendKeys('123456');
		ao.click();

		createBtn.click();
		expect(successMsg.isPresent()).toBe(true);
	});
});
