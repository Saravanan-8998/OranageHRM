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

test.describe('Should check all functionality in Buzz Latest Posts', async () => {
    test('Should check all the components loaded and visible', async () => {
        await expect(page).toHaveURL(AssertionURL.dashboardURL);
        await dashboard.verifyBuzzLatestPostsComponents();
    });

    test('Should check how many posts are available', async () => {
        await expect(page).toHaveURL(AssertionURL.dashboardURL);
        await dashboard.checkSubDiv();
    });
});

test.afterAll(async () => {
    await page.close();
});