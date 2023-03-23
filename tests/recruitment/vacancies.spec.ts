import { expect, test, Page } from "@playwright/test";
import { Recruitment } from "../../pageObjects/recruitment.PO";
import { LoginPage } from "../../pageObjects/login_page.PO";
import subURL from "../../support/subURL.json";
import { myBrowserFixture } from "../../support/fixtures";
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

test.describe('Should check all functionality in vacancies', async () => {

    test('Should fill the valid fields', async () => {
        await recruitment.addNewVacancie();
    });

    test('Should check the data created is visible in list page', async () => {
        await recruitment.searchVacancie();
        await recruitment.verifyVacancieSearch();
    });
});

test.afterAll(async () => {
    await page.close();
});