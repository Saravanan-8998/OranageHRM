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

test.describe('Should check all functionality in Leave Module', async () => {

    test('Should verify apply sub module components', async () => {
        await leave.applyModule();
    });

    test('Should modify My Leave search', async () => {
        await leave.myLeaveModule();
    });

    test('Should verify modified search in My leave', async () => {
        await leave.verifyLeaveModule();
    });
});

test.afterAll(async () => {
    await page.close();
});