const config = require('../config/config.js');
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../models/LoginPage');
const { MyAccountPage } = require('../models/MyAccountPage.js');

test.describe(' BullVPN Playwright ', () => {

  test.describe.configure({ mode: 'serial' });

  let page;
  let loginPage;
  let myaccountPage;
  const time = 5000

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    });
    page = await context.newPage();

    loginPage = new LoginPage(page);
    myaccountPage = new MyAccountPage(page);

    await loginPage.goto();
  });

  test('TC01: Login ไม่สำเร็จ : กรอก username ผิด , กรอก password ผิด', async () => {
    await loginPage.login('wronguser', 'wrongpass');
    await expect(loginPage.errorNotice)
          .toBeVisible({ timeout: time });
    await expect(loginPage.errorNotice.filter({ hasText: config.errorNoticeMsg }))
          .toBeVisible();
    await expect(loginPage.page)
          .toHaveURL(/login/);
  });

  test('TC02: Login สำเร็จ', async () => {
    await loginPage.login(config.username, config.password);
    await expect(loginPage.page)
          .toHaveURL(/account/);
  });

  test('TC03: ตรวจสอบชื่อในหน้า My Account', async () => {
    await expect(myaccountPage.usernameAcc)
          .toBeVisible();
    await expect(myaccountPage.usernameAcc)
          .toHaveText(config.username);
  });

  test('TC04: ตรวจสอบอีเมลในหน้า My Account', async () => {
    await expect(myaccountPage.emailAcc)
          .toBeVisible();
    await expect(myaccountPage.emailAcc)
          .toContainText(config.email);
  });

  test('TC05: ทดสอบกดเมนู Manage device', async () => {
    await myaccountPage.manageDeviceMenu
          .click();
    await expect(page)
          .toHaveURL(/manage-device/);
  });

  test('TC06: ทดสอบกดเมนู WireGuard (Beta)', async () => {
    await myaccountPage.wireguardMenu
          .click();
    await expect(page)
          .toHaveURL(/wireguard/);
  });

  test('TC07: ทดสอบกดเมนู Change Password', async () => {
    await myaccountPage.changePasswordMenu
          .click();
    await expect(page)
          .toHaveURL(/change-password/);
  });

  test('TC08: ทดสอบกดเมนู Login on the TV.', async () => {
    await myaccountPage.loginTVMenu
          .click();
    await expect(page)
          .toHaveURL(/login-tv/);
  });

  test('TC09: ทดสอบกดเมนู Invoice', async () => {
    await myaccountPage.invoiceMenu
          .click();
    await expect(page)
          .toHaveURL(/premium/);
  });

  test('TC10: ทดสอบกดเมนู Affiliate Program', async () => {
    await myaccountPage.affiliateMenu
          .click();
    await expect(page)
          .toHaveURL(/affiliate/);
  });

  test('TC11: Logout สำเร็จ', async () => {
    await myaccountPage.logoutMenu
          .click();
    await expect(myaccountPage.confirmlogoutBtn)
          .toBeVisible({ timeout: 5000 });
    await myaccountPage.confirmlogoutBtn
          .click();
    await expect(page).toHaveURL(/login/); 
  });
});