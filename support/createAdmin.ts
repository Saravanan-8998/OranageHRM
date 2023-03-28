import { expect, test, Page } from "@playwright/test";
import { LoginPage } from "../pageObjects/login_page.PO";
import subURL from "../support/subURL.json";
import { myBrowserFixture } from "../support/fixtures";
import { Dashboard } from "../pageObjects/dashboard.PO";
import ENV from "../support/env";
import { PIMPage } from "../pageObjects/main.PO";

let page: Page;
let dashboard: Dashboard;
let loginPage: LoginPage;
let pimPage: PIMPage;
let result: string = '';
let fullNameValue: string;
let nameValues = ['Saravanan', autoGenerate(99), 'Test', autoGenerate(9999)];

function autoGenerate(max: number) {
    let num = Math.floor(Math.random() * max  + 92) + 99;
    return num.toString();
}

export async function getFullName() {
    for (let i = 0; i < 2; i++) {
        result += nameValues[i] + " ";
    }
    return fullNameValue = result + 'Test';
}

async function before() {
    page = (await myBrowserFixture()).page;
    await page.goto(subURL.login);
    dashboard = new Dashboard(page);
    loginPage = new LoginPage(page);
    pimPage = new PIMPage(page);
    await loginPage.enterCredentials(ENV.USERNAME, ENV.PASSWORD);
}

async function createUser() {
    await page.goto(subURL.pim);
    await pimPage.clickAddEmployeeMenu();
    let namesLocators = [pimPage.firstName, pimPage.middleName, pimPage.lastName, pimPage.employeeId];
    await pimPage.fillFieldValues(namesLocators, nameValues);
    await pimPage.clickSave(pimPage.save, 1, 'Successfully Saved');
    await page.waitForTimeout(5000);
}

async function updateUserToAdmin() {
    await page.goto(subURL.admin);
    let fullName = await getFullName();
    await pimPage.addEmpToAdmin(fullName);
}

async function after() {
    await page.close();
}

export async function createAdminUser() {
    await before();
    await createUser();
    await updateUserToAdmin();
    await after();
}