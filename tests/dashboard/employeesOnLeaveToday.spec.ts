import { expect, test, Page } from "@playwright/test";
import { LoginPage } from "../../pageObjects/login_page.PO";
import subURL from "../../support/subURL.json";
import { myBrowserFixture } from "../../support/fixtures";
import { AssertionURL } from "../../support/url";
import { Dashboard } from "../../pageObjects/dashboard.PO";
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

test.describe('should check all the functionality in Employees on Leave Today', async () => {
    test('should check components in Employees on Leave Today', async () => {
        await expect(page).toHaveURL(AssertionURL.dashboardURL);
        await dashboard.verifyEmployeeLeaveTodayComponents();
    });

    test('should check settings components visible', async () => {
        await dashboard.verifyEmployeeLeaveTodaySettingsComponents();
    });

    test('should check toggle functionality in Employee leave settings', async () => {
        await dashboard.toggle();
    });

    test('should check cancel functionality in Employee leave settings', async () => {
        await dashboard.cancel();
    });

    test('should check save functionality in Employee leave settings', async () => {
        await dashboard.save();
    });

    test('should check close popup functionality in Employee leave settings', async () => {
        await dashboard.close();
    });
});

test.afterAll(async () => {
    await page.close();
});