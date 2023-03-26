import { expect, test, Page } from "@playwright/test";
import { Leave } from "../../pageObjects/leave.PO";
import { LoginPage } from "../../pageObjects/login_page.PO";
import subURL from "../../support/subURL.json";
import { myBrowserFixture } from "../../support/fixtures";
import ENV from "../../support/env";

let page: Page;
let loginPage: LoginPage;
let leave: Leave;

test.beforeAll(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.login);
    loginPage = new LoginPage(page);
    leave = new Leave(page);
    await loginPage.enterCredentials(ENV.USERNAME, ENV.PASSWORD);
    await leave.navigate();
});

test.describe('Should check all functionality in Entitlement Module', async () => {

    test('Should add entitlement in add entitlement page', async () => {
        await leave.addEntitlement();
    });

    test('Should test all the functionality my entitlement page', async () => {
        await leave.myLeaveEntitlement();
        await leave.verifymyLeaveEntitlement();
    });

    test('Should test all the functionality in employee entitlement page', async () => {
        await leave.myLeaveEntitlementPage();
    });
});

test.afterAll(async () => {
    await page.close();
});