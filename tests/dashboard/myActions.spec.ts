import { expect, test, Page } from "@playwright/test";
import { LoginPage } from "../../pageObjects/login_page.PO";
import subURL from "../../support/subURL.json";
import { myBrowserFixture } from "../../support/fixtures";
import Constants from "../../support/constants.json";
import ENV from "../../support/env";

let page: Page;
let loginPage: LoginPage;

test.beforeAll(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.login);
    loginPage = new LoginPage(page);
});

test.describe('Should check all functionality in My Actions', async () => {

    test('Should check all the components loaded and visible', async () => {
    });
});

test.afterAll(async () => {
    await page.close();
});