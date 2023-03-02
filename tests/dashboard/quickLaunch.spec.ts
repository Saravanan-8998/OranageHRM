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

test.describe('Should check all functionality in Quick launches', async () => {
    
    test('Should check all the components loaded and visible', async () => {
        await expect(page).toHaveURL(AssertionURL.dashboardURL);
        await dashboard.verifyQuickLaunchesComponents();
    });

    test('Should check the assign leave redirect URL from quick launches', async () => {
        await dashboard.assignLeaveClick();
        await expect(page).toHaveURL(AssertionURL.assignLeaveURL);
        await page.goBack();
        await page.waitForLoadState();
    });

    test('Should check the leave list redirect URL from quick launches', async () => {
        await dashboard.leaveListClick();
        await expect(page).toHaveURL(AssertionURL.viewLeaveListURL);
        await page.goBack();
        await page.waitForLoadState();
    });

    test('Should check the timesheet redirect URL from quick launches', async () => {
        await dashboard.timesheetClick();
        await expect(page).toHaveURL(AssertionURL.viewEmployeeTimesheetURL);
        await page.goBack();
        await page.waitForLoadState();
    });

    test('Should check the apply leave redirect URL from quick launches', async () => {
        await dashboard.applyLeaveClick();
        await expect(page).toHaveURL(AssertionURL.applyLeaveURL);
        await page.goBack();
        await page.waitForLoadState();
    });

    test('Should check the my leave redirect URL from quick launches', async () => {
        await dashboard.myLeaveClick();
        await expect(page).toHaveURL(AssertionURL.viewMyLeaveListURL);
        await page.goBack();
        await page.waitForLoadState();
    });

    test('Should check the my timesheet redirect URL from quick launches', async () => {
        await dashboard.myTimesheetClick();
        await expect(page).toHaveURL(AssertionURL.viewMyTimesheetURL);
        await page.goBack();
        await page.waitForLoadState();
    });
});

test.afterAll(async () => {
    await page.close();
});