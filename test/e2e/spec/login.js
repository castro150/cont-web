describe('Login page test', function() {
	var userInput = element(by.id('user'));
	var pwdInput = element(by.id('password'));
	var enterButton = element(by.id('enter'));
	var cleanButton = element(by.id('clean'));
	var alerts = element.all(by.id('danger-alert'));

	beforeEach(function() {
		browser.get('http://localhost:9001/#/');
	});

	it('Clean button should clean all fields', function() {
		userInput.sendKeys('admin');
		cleanButton.click();
		expect(userInput.getText()).toEqual('');

		pwdInput.sendKeys('admin');
		cleanButton.click();
		expect(pwdInput.getText()).toEqual('');

		userInput.sendKeys('admin');
		pwdInput.sendKeys('admin');
		cleanButton.click();
		expect(userInput.getText()).toEqual('');
		expect(pwdInput.getText()).toEqual('');
	});

	it('Wrong user should notify', function() {
		userInput.sendKeys('user');
		pwdInput.sendKeys('admin');
		enterButton.click();

		expect(alerts.count()).toEqual(1);
		expect(alerts.first().getText()).toContain('Usuário/Senha inválidos');
	});

	it('Wrong password should notify', function() {
		userInput.sendKeys('admin');
		pwdInput.sendKeys('pwd');
		enterButton.click();

		expect(alerts.count()).toEqual(1);
		expect(alerts.first().getText()).toContain('Usuário/Senha inválidos');
	});

	it('Correct credentials should login', function() {
		userInput.sendKeys('admin');
		pwdInput.sendKeys('admin');
		enterButton.click();

		expect(alerts.count()).toEqual(0);
	});
});
