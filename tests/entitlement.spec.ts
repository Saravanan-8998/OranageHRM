import { expect, test, Page } from "@playwright/test";
import { Leave } from "../pageObjects/leave.PO";
import { LoginPage } from "../pageObjects/login_page.PO";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";
import { createAdminUser, getFullName } from "../support/createAdmin";

let page: Page;
let loginPage: LoginPage;
let leave: Leave;

test.beforeAll(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.login);
    loginPage = new LoginPage(page);
    leave = new Leave(page);
    await createAdminUser();
    let USERNAME = await getFullName();
    console.log("USERNAME value --->", USERNAME);
    await loginPage.enterCredentials(USERNAME.slice(14, 32), 'Admin@123');
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