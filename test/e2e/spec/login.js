/*LOGIN
botão de limpar,
Usuário errado,
senha errada,
sucesso*/

describe('Login page test', function() {
	var userInput = element(by.id('user'));
	var pwdInput = element(by.id('password'));
	var enterButton = element(by.id('enter'));
	var cleanButton = element(by.id('clean'));

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
});
