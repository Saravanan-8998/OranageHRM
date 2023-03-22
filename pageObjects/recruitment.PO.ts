import { expect, Locator, Page } from "@playwright/test";

export class Recruitment {
    readonly page: Page;
    readonly candidates: any;
    readonly vacancies: any;
    readonly toastMessage: any;

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
            totalRecordsList: `(//span[@class='oxd-text oxd-text--span'])[1]`,
        }
        this.vacancies = {
            vacanciesTab: `//a[contains(text(),'Vacancies')]`,
        },
            this.toastMessage = 'p.oxd-text--toast-message';
    }

    async navigate() {
        await this.page.locator(`//span[text()='Recruitment']`).click();
    }

    async clickCandidates() {
        await this.page.locator(this.candidates.candidatesTab).click();
    }

    async clickVacancies() {
        await this.page.locator(this.candidates.vacanciesTab).click();
    }

    async uploadFile() {
        const fileInput: any = await this.page.$('input[type=file]');
        const filePath = 'C:/Users/saravanan.s/Documents/OrangeHRM/OranageHRM/sampleUpload/upload.txt';
        await fileInput.setInputFiles(filePath);
    }

    async clickSave(messageToVerify?: string) {
        await this.page.locator(this.candidates.save).click({ force: true });
        if (messageToVerify) {
            expect(await this.getToastMessage()).toEqual(messageToVerify);
        }
    }

    async getToastMessage() {
        return await this.page.locator(this.toastMessage).textContent();
    }

    async addNewCandidate() {
        await this.page.locator(this.candidates.addACandidate).click();
        await this.page.locator(this.candidates.firstName).fill('Saravanan');
        await this.page.locator(this.candidates.middleName).fill('Sas');
        await this.page.locator(this.candidates.lastName).fill('Subramanian');
        await this.page.locator(`.oxd-select-text-input`).click();
        await this.page.getByRole('option', { name: 'Software Engineer' }).getByText('Software Engineer', { exact: true }).click();
        await this.page.locator(this.candidates.email).fill('saravanan.subramanian@atmecs.com');
        await this.page.locator(this.candidates.contactNumber).fill('9999832378');
        await this.uploadFile();
        await this.page.locator(this.candidates.keywords).fill('Fast Join');
        await this.page.locator(this.candidates.notes).fill('Need a good candidate');
    }

    async searchCandidate(){
        await this.page.locator(`(//div[@class='oxd-select-text-input'])[1]`).click();
        await this.page.getByRole('option', { name: 'Software Engineer' }).getByText('Software Engineer', { exact: true }).click();
        await this.page.locator(`(//div[@class='oxd-select-text-input'])[4]`).click();
        await this.page.getByRole('option', { name: 'Application Initiated' }).getByText('Application Initiated', { exact: true }).click();
        await this.page.locator(this.candidates.search).click();
    }

    async verifySearch(){
        let totalRecords = await this.page.locator(this.candidates.totalRecordsList).allTextContents();
        expect(totalRecords).toBeGreaterThan(0);
    }
}