import { expect, test, Page } from "@playwright/test";
import { Dashboard } from "../../pageObjects/dashboard.PO";
import { LoginPage } from "../../pageObjects/login_page.PO";
import subURL from "../../support/subURL.json";
import { myBrowserFixture } from "../../support/fixtures";
import ENV from "../../support/env";
import { AssertionURL } from "../../support/url";

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

test.describe('Should check all functionality in My Actions', async () => {

    test('Should check all the components loaded and visible', async () => {
        await expect(page).toHaveURL(AssertionURL.dashboardURL);
        await dashboard.verifyMyActionsComponents();
    });

    test('Should check the leave Request redirect URL from My Actions', async () => {
        await dashboard.leaveRequestClick();
        await expect(page).toHaveURL(AssertionURL.viewLeaveListURL);
        await page.goBack();
        await page.waitForLoadState();
    });

    test('Should check the time sheet redirect URL from My Actions', async () => {
        await dashboard.timeSheetClick();
        await expect(page).toHaveURL(AssertionURL.viewEmployeeTimesheetURL);
        await page.goBack();
        await page.waitForLoadState();
    });

    test('Should check the self review redirect URL from My Actions', async () => {
        await dashboard.selfReviewClick();
        await expect(page).toHaveURL(AssertionURL.myPerformanceReviewURL);
        await page.goBack();
        await page.waitForLoadState();
    });

    test('Should check the interview redirect URL from My Actions', async () => {
        await dashboard.interviewClick();
        await expect(page).toHaveURL(AssertionURL.viewCandidatesURL);
        await page.goBack();
        await page.waitForLoadState();
    });
});

test.afterAll(async () => {
    await page.close();
});