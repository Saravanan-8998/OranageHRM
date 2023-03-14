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

test.describe('Should check all functionality in vacancies', async () => {

    test('Should check all the components loaded and visible', async () => {
    });

    test('Should check all the components loaded and visible in add a vacancies page', async () => {
    });

    test('Should fill the invalid fields', async () => {
    });

    test('Should fill the valid fields', async () => {
    });

    test('Should check the data created is visible in list page', async () => {
    });

    test('Should modify the search option and search with the data created', async () => {
    });

    test('Should modify few fields and able to save the record', async () => {
    });
    
    test('Should able to see the modified data in the list page', async () => {
    });
});

test.afterAll(async () => {
    await page.close();
});