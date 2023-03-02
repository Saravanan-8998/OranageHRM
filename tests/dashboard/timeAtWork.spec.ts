import { expect, test, Page } from "@playwright/test";
import { Dashboard } from "../../pageObjects/dashboard.PO";
import { LoginPage } from "../../pageObjects/login_page.PO";
import subURL from "../../support/subURL.json";
import { myBrowserFixture } from "../../support/fixtures";
import { AssertionURL } from "../../support/url";
import ENV from "../../support/env";

let page: Page;
let dashboard: Dashboard;
let loginPage: LoginPage;

test.beforeAll(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.login);
    dashboard = new Dashboard(page);
    loginPage = new LoginPage(page);
    await loginPage.enterCredentials(ENV.USERNAME, ENV.PASSWORD);
});

test.describe('Should check all functionality in Time at Work', async () => {
    
    test('Should check all the components loaded and visible', async () => {
        await expect(page).toHaveURL(AssertionURL.dashboardURL);
        await dashboard.verifyTimeAtWorkComponents();
    });

    test('Should check the redirect URL from timer', async () => {
        await dashboard.timerClick();
        await page.waitForLoadState();
        await expect(page).toHaveURL(AssertionURL.punchInURL);
    });
});

test.afterAll(async () => {
    await page.close();
});