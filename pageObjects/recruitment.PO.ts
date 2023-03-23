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
        await this.page.waitForTimeout(4000);
    }

    async getToastMessage() {
        return await this.page.locator(this.toastMessage).textContent();
    }

    async addNewVacancie() {
        await this.page.locator(this.vacancies.vacanciesTab).click();
        await this.page.locator(`//button[text()=' Add ']`).click();
        await this.page.locator(`(//input[@class='oxd-input oxd-input--active'])[2]`).fill('Test Vaccancy 1');
        await this.page.locator(`div.oxd-select-text-input`).click();
        await this.page.getByRole('option', { name: 'QA Engineer' }).getByText('QA Engineer', { exact: true }).click();
        await this.page.locator(`//textarea[@placeholder='Type description here']`).type('This is a sample Vacancie which is developed for testing purposes');
        await this.page.locator(`//input[@placeholder='Type for hints...']`).fill('Odis');
        await this.page.getByRole('option', { name: 'Odis  Adalwin' }).getByText('Odis  Adalwin', { exact: true }).click();
        await this.page.locator(`(//input[@class='oxd-input oxd-input--active'])[3]`).fill('1');
        await this.page.locator(`//button[@type='submit']`).click();
        await this.page.waitForTimeout(5000);
    }

    async searchVacancie(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy");
        await this.page.locator(`(//div[@class='oxd-select-text-input'])[1]`).first().click();
        await this.page.getByRole('option', { name: 'QA Engineer' }).click();
        await this.page.locator(`(//div[@class='oxd-select-text-input'])[2]`).click();
        await this.page.getByRole('option', { name: 'Test Vaccancy 1' }).getByText('Test Vaccancy 1', { exact: true }).click();
        await this.page.locator(`//button[@type='submit']`).click();
        await this.page.waitForTimeout(5000);
    }

    async verifyVacancieSearch(){
        let totalRecords = await this.page.locator(this.candidates.totalRecordsList).textContent();
        expect(totalRecords).toContain(`(1) Record Found`);
    }

    async addNewCandidate() {
        await this.page.locator(this.candidates.addACandidate).click();
        await this.page.locator(this.candidates.firstName).fill('Test');
        await this.page.locator(this.candidates.middleName).fill('User');
        await this.page.locator(this.candidates.lastName).fill('1');
        await this.page.locator(`.oxd-select-text-input`).click();
        await this.page.getByRole('option', { name: 'Test Vaccancy 1' }).getByText('Test Vaccancy 1', { exact: true }).click();
        await this.page.locator(this.candidates.email).fill('saravanan.subramanian@atmecs.com');
        await this.page.locator(this.candidates.contactNumber).fill('9999832378');
        await this.uploadFile();
        await this.page.locator(this.candidates.keywords).fill('Fast Join');
        await this.page.locator(this.candidates.notes).fill('Need a good candidate');
    }

    async searchCandidate(){
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates");
        await this.page.locator(`(//div[@class='oxd-select-text-input'])[2]`).first().click();
        await this.page.getByRole('option', { name: 'Test Vaccancy 1' }).getByText('Test Vaccancy 1', { exact: true }).click();
        await this.page.locator(`(//div[@class='oxd-select-text-input'])[4]`).click();
        await this.page.getByRole('option', { name: 'Application Initiated' }).getByText('Application Initiated', { exact: true }).click();
        await this.page.locator(this.candidates.search).click();
        await this.page.waitForTimeout(4000);
    }

    async verifyCandidateSearch(){
        let totalRecords = await this.page.locator(this.candidates.totalRecordsList).textContent();
        expect(totalRecords).toContain('(1) Record Found');
    }

    async shortlist(){
        await this.page.locator(`//i[@class='oxd-icon bi-eye-fill']`).click();
        await this.page.waitForTimeout(4000);
        await this.page.locator(`//button[text()=' Shortlist ']`).click();
        await this.page.locator(`//textarea[@placeholder='Type here']`).type('User is shortlisted');
        await this.page.locator(`//button[text()=' Save ']`).click();
        await this.page.waitForTimeout(4000);
        let status = await this.page.locator(`//p[text()='Status: Shortlisted']`).textContent();
        expect(status).toContain('Status: Shortlisted');
    }

    async reject(){
        await this.page.locator(`//button[text()=' Reject ']`).click();
        await this.page.locator(`//textarea[@placeholder='Type here']`).type('User is rejected');
        await this.page.locator(`//button[@type='submit']`).click();
        await this.page.waitForTimeout(4000);
        let status = await this.page.locator(`//p[text()='Status: Rejected']`).textContent();
        expect(status).toContain('Status: Rejected');
    }
}