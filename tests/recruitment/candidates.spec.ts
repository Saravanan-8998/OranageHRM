import { expect, test, Page } from "@playwright/test";
import { Recruitment } from "../../pageObjects/recruitment.PO";
import { LoginPage } from "../../pageObjects/login_page.PO";
import subURL from "../../support/subURL.json";
import { myBrowserFixture } from "../../support/fixtures";
import Constants from "../../support/constants.json";
import ENV from "../../support/env";

let page: Page;
let loginPage: LoginPage;
let recruitment: Recruitment;

test.beforeAll(async () => {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.login);
    loginPage = new LoginPage(page);
    recruitment = new Recruitment(page);
    await loginPage.enterCredentials(ENV.USERNAME, ENV.PASSWORD);
    await recruitment.navigate();
});

test.describe('Should check all functionality in candidated', async () => {

    test('Should fill the valid fields', async () => {
        await recruitment.addNewCandidate();
        await recruitment.clickSave(Constants.assertion.success);
    });

    test('Should check the data created is visible in list page', async () => {
        await recruitment.verifySearch();
    });

    // test('Should modify the search option and search with the data created', async () => {
    // });

    // test('Should modify few fields and able to save the record', async () => {
    // });

    // test('Should able to see the modified data in the list page', async () => {
    // });
});

test.afterAll(async () => {
    await page.close();
});