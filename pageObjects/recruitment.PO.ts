import { expect, Locator, Page } from "@playwright/test";

export class Recruitment {
    readonly page: Page;
    readonly candidates: any;
    readonly vacancies: any;

    constructor(page: Page) {
        this.page = page;
        this.candidates = {
            candidatesTab: `//a[contains(text(),'Candidates')]`,
            addACandidate: `i.oxd-icon.bi-plus`,
            firstName: `input[name='firstName']`,
            middleName: `input[name='middleName']`,
            lastName: `input[name='lastName']`,
            vaccancy: `.oxd-select-text-input`,
            email: `(//input[@placeholder='Type here'])[1]`,
            contactNumber: `(//input[@placeholder='Type here'])[2]`,
            resume: `//div[text()='Browse']`,
            keywords: `(//label[text()='Keywords']/following::input)[1]`,
            dateOfApplication: `//input[@placeholder='yyyy-mm-dd']`,
            notes: `textarea[placeholder='Type here']`,
            consentToKeepData: `//input[@type='checkbox']/following-sibling::span[1]`,
            save: `//button[@type='submit']`,
            subDiv: `oxd-table-filter`,
            head: `//h5[text()='Candidates']`,
            reset: `//button[text()=' Reset ']`,
            search: `//button[text()=' Search ']`,
            mainDiv: `.orangehrm-container`,
            totalRecordsList : `(//span[@class='oxd-text oxd-text--span'])[1]`,
        }
        this.vacancies = {
            vacanciesTab: `//a[contains(text(),'Vacancies')]`,
        }
    }

    async clickCandidates(){
        await this.page.locator(this.candidates.candidatesTab).click();
    }

    async clickVacancies(){
        await this.page.locator(this.candidates.vacanciesTab).click();
    }

    async checkAllComponentsInCandidateHomePage(){
        await (await this.page.waitForSelector(this.candidates.subDiv)).isVisible();
        await (await this.page.waitForSelector(this.candidates.head)).isVisible();
        await (await this.page.waitForSelector(this.candidates.reset)).isVisible();
        await (await this.page.waitForSelector(this.candidates.search)).isVisible();
        await (await this.page.waitForSelector(this.candidates.addACandidate)).isVisible();
        await (await this.page.waitForSelector(this.candidates.mainDiv)).isVisible();
        await (await this.page.waitForSelector(this.candidates.totalRecordsList)).isVisible();
    }

    async checkAllComponentsInAddCandidatePage(){
        await this.page.locator(this.candidates.addACandidate).click();
        await (await this.page.waitForSelector(this.candidates.firstName)).isVisible();
        await (await this.page.waitForSelector(this.candidates.middleName)).isVisible();
        await (await this.page.waitForSelector(this.candidates.lastName)).isVisible();
        await (await this.page.waitForSelector(this.candidates.vaccancy)).isVisible();
        await (await this.page.waitForSelector(this.candidates.email)).isVisible();
        await (await this.page.waitForSelector(this.candidates.contactNumber)).isVisible();
        await (await this.page.waitForSelector(this.candidates.resume)).isVisible();
        await (await this.page.waitForSelector(this.candidates.keywords)).isVisible();
        await (await this.page.waitForSelector(this.candidates.dateOfApplication)).isVisible();
        await (await this.page.waitForSelector(this.candidates.notes)).isVisible();
        await (await this.page.waitForSelector(this.candidates.save)).isVisible();
    }

    async addNewCandidate(){
        await this.page.locator(this.candidates.addACandidate).click();
        await this.page.locator(this.candidates.firstName).fill('Saravanan');
        await this.page.locator(this.candidates.middleName).fill('Sas');
        await this.page.locator(this.candidates.lastName).fill('Subramanian');
        await this.page.locator(this.candidates.vaccancy).selectOption('Software Engineer');
        await this.page.locator(this.candidates.email).fill('saravanan.subramanian@atmecs.com');
        await this.page.locator(this.candidates.contactNumber).fill('9999832378');
        await this.page.locator(this.candidates.keywords).fill('Fast Join');
        await this.page.locator(this.candidates.notes).fill('Need a good candidate');
        await this.page.locator(this.candidates.save).click();
    }
}