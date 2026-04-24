const config = require('../config/config.js');
const { test, expect } = require('@playwright/test');

class MyAccountPage {
    constructor(page) {
    this.page = page;
    this.usernameAcc = page.locator('p.username.py-1');
    this.emailAcc = page.locator('p.email.pb-1');
    this.myAccountMenu = page.locator('.navbar-nav').getByText('My Account');
    this.manageDeviceMenu = page.locator('.navbar-nav').getByText('Manage device');
    this.wireguardMenu = page.locator('.navbar-nav').getByText('WireGuard (Beta)');
    this.changePasswordMenu = page.locator('.navbar-nav').getByText('Change Password');
    this.loginTVMenu = page.locator('.navbar-nav').getByText('Login on the TV.');
    this.invoiceMenu = page.locator('.navbar-nav').getByText('Invoice');
    this.affiliateMenu = page.locator('.navbar-nav').getByText('Affiliate Program');
    this.logoutMenu = page.locator('a[data-target="#modal-confirm-logout"]');
    this.confirmlogoutBtn = page.locator('.modal-delete-device-confirm');
  }
}
module.exports = { MyAccountPage };