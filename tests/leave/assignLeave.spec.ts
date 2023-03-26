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

test.describe('Should check all functionality in Assign leave Module', async () => {
    
    test('Should assign leave for a employee', async () => {
        await leave.assignALeave();
    });

    test('Should modify the leave search list', async () => {
        await leave.searchLeaveList();
    });

    test('Should verify modified search in Leave list', async () => {
        await leave.verifySearchLeaveList();
    });
});

test.afterAll(async () => {
    await page.close();
});