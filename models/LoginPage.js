const config = require('../config/config.js');
const { test, expect } = require('@playwright/test');

class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[id="username"]');
    this.passwordInput = page.locator('input[id="password"]');
    this.loginButton = page.locator('button[id="btn-submit-login"]');
    this.errorNotice = page.locator('div.alert.alert-danger');
    this.errorMessage = page.locator('span.help-block');
  }
  async goto() { await this.page.goto(config.loginUrl); }
  async login(user, pass) {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();

    await this.usernameInput.clear();
    await this.usernameInput.pressSequentially(user, { delay: 100 }); 

    await this.passwordInput.clear();
    await this.passwordInput.pressSequentially(pass, { delay: 100 }); 

    await expect(this.usernameInput).toHaveValue(user);
    await expect(this.passwordInput).toHaveValue(pass);
    
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }
}
module.exports = { LoginPage };