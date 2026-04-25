const config = require('../config/config.js');
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../models/LoginPage');
const { MyAccountPage } = require('../models/MyAccountPage.js');
import { PATHS, ERROR_MESSAGES, HEADER_MESSAGES } from '../utils/constants';

test.describe(' BullVPN Playwright ', () => {

  test.describe.configure({ mode: 'serial' });

  let page;
  let loginPage;
  let myaccountPage;
  const time = 5000

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      recordVideo: {
      dir: 'test-results/videos/',
      size: { width: 1280, height: 720 }
      },
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
    await expect(loginPage.errorNotice.filter({ hasText: ERROR_MESSAGES.ERROR_NOTICE_MESSAGE }))
          .toBeVisible();
    await expect(loginPage.page)
          .toHaveURL(new RegExp(PATHS.LOGIN_PAGE_PATH));
  });

  test('TC02: Login สำเร็จ', async () => {
    await loginPage.login(config.username, config.password);
    await expect(loginPage.page)
          .toHaveURL(new RegExp(PATHS.MYACCOUNT_PAGE_PATH));
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
          .toHaveURL(new RegExp(PATHS.MANAGE_DEVICE_PAGE_PATH));
  });

  test('TC06: ทดสอบกดเมนู WireGuard (Beta)', async () => {
    await myaccountPage.wireguardMenu
          .click();
    await expect(page)
          .toHaveURL(new RegExp(PATHS.WIREGUARD_PAGE_PATH));
  });

  test('TC07: ทดสอบกดเมนู Change Password', async () => {
    await myaccountPage.changePasswordMenu
          .click();
    await expect(page)
          .toHaveURL(new RegExp(PATHS.CHANGE_PASS_PAGE_PATH));
  });

  test('TC08: ทดสอบกดเมนู Login on the TV.', async () => {
    await myaccountPage.loginTVMenu
          .click();
    await expect(page)
          .toHaveURL(new RegExp(PATHS.LOGIN_TV_PAGE_PATH));
  });

  test('TC09: ทดสอบกดเมนู Invoice', async () => {
    await myaccountPage.invoiceMenu
          .click();
    await expect(page)
          .toHaveURL(new RegExp(PATHS.INVOICE_PAGE_PATH));
  });

  test('TC10: ทดสอบกดเมนู Affiliate Program', async () => {
    await myaccountPage.affiliateMenu
          .click();
    await expect(page)
          .toHaveURL(new RegExp(PATHS.AFFILIATE_PAGE_PATH));
  });

  test('TC11: Logout สำเร็จ', async () => {
    await myaccountPage.logoutMenu
          .click();
    await expect(myaccountPage.confirmlogoutBtn)
          .toBeVisible({ timeout: 5000 });
    await myaccountPage.confirmlogoutBtn
          .click();
    await expect(page)
          .toHaveURL(new RegExp(PATHS.LOGIN_PAGE_PATH)); 
  });

  test('TC12: Login ไม่สำเร็จ : ไม่กรอก username , ไม่กรอก password ', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage.filter({ hasText: ERROR_MESSAGES.ERROR_USER_MESSAGE }))
          .toBeVisible();
    await expect(loginPage.errorMessage.filter({ hasText: ERROR_MESSAGES.ERROR_PASS_MESSAGE }))
          .toBeVisible();
    await expect(loginPage.page)
          .toHaveURL(new RegExp(PATHS.LOGIN_PAGE_PATH));
  });

  test('TC13: ทดสอบกด Forgot your password? ', async () => {
    await loginPage.forgotpassLink.click();
    await expect(loginPage.resetPasswordHeading).toHaveText(ERROR_MESSAGES.ERROR_RESET_PASS_MESSAGE);
    await expect(loginPage.page)
          .toHaveURL(new RegExp(PATHS.FORGOT_PASS_PAGE_PATH));
  });

  test('TC14: ทดสอบกดปุ่ม Get the reset link กรณีไม่กรอกอีเมล', async () => {
    await loginPage.forgotpassBtn.click();
    await expect(loginPage.errorMessage.filter({ hasText: ERROR_MESSAGES.ERROR_REQUIRE_EMAIL_MESSAGE }))
          .toBeVisible();
    await expect(loginPage.page)
          .toHaveURL(new RegExp(PATHS.FORGOT_PASS_PAGE_PATH));
  });

  test('TC15: ทดสอบกดปุ่ม Get the reset link กรณีกรอกอีเมลภาษาไทย', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.emailInput.clear();
    await loginPage.emailInput.pressSequentially('ภาษาไทย', { delay: 100 });
    await loginPage.forgotpassBtn.click();
    await expect(loginPage.errorMessage.filter({ hasText: ERROR_MESSAGES.ERROR_INVALID_EMAIL_MESSAGE }))
          .toBeVisible();
    await expect(loginPage.page)
          .toHaveURL(new RegExp(PATHS.FORGOT_PASS_PAGE_PATH));
  });

  test('TC16: ทดสอบกด Go back to login ', async () => {
    await loginPage.backToLoginLink.click();
    await expect(loginPage.loginpagesubHeading).toHaveText(HEADER_MESSAGES.HEADER_LOGIN_PAGE_MESSAGE);
    await expect(loginPage.page)
          .toHaveURL(new RegExp(PATHS.LOGIN_PAGE_PATH));
  });

  test('TC17: ทดสอบกด Resgister ', async () => {
    await loginPage.registerpageLink.click();
    await expect(loginPage.loginpagesubHeading).toHaveText(HEADER_MESSAGES.HEADER_SIGNUP_PAGE_MESSAGE);
    await expect(loginPage.page)
          .toHaveURL(new RegExp(PATHS.SIGNUP_PAGE_PATH));
  });
});