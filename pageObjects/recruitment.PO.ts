import { expect, Locator, Page } from "@playwright/test";
import subURL from "../support/subURL.json";
import testData from "../support/testDate.json";
import constants from "../support/constants.json";

export class Recruitment {
    readonly page: Page; candidates: any; vacancies: any; toastMessage: any; submit: any; shortlistLocators: any; rejectLocators: any; recruitmentNavigation: any;

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
            resume: `input[type=file]`,
            keywords: `(//label[text()='Keywords']/following::input)[1]`,
            dateOfApplication: `//input[@placeholder='yyyy-mm-dd']`,
            notes: `textarea[placeholder='Type here']`,
            consentToKeepData: `//input[@type='checkbox']/following-sibling::span[1]`,
            subDiv: `oxd-table-filter`,
            head: `//h5[text()='Candidates']`,
            reset: `//button[text()=' Reset ']`,
            search: `//button[text()=' Search ']`,
            mainDiv: `.orangehrm-container`,
            totalRecordsList: `(//span[@class='oxd-text oxd-text--span'])[1]`,
            filter1: `(//div[@class='oxd-select-text-input'])[2]`,
            filter2: `(//div[@class='oxd-select-text-input'])[4]`,
        };
        this.vacancies = {
            vacanciesTab: `//a[contains(text(),'Vacancies')]`,
            addANewVacancie: `//button[text()=' Add ']`,
            vacancieName: `(//input[@class='oxd-input oxd-input--active'])[2]`,
            vacancieRole: `div.oxd-select-text-input`,
            vacancieDescription: `//textarea[@placeholder='Type description here']`,
            recruiter: `//input[@placeholder='Type for hints...']`,
            totalOpenings: `(//input[@class='oxd-input oxd-input--active'])[3]`,
            filter1: `(//div[@class='oxd-select-text-input'])[1]`,
            filter2: `(//div[@class='oxd-select-text-input'])[2]`,
        };
        this.shortlistLocators = {
            viewCandidate: `//i[@class='oxd-icon bi-eye-fill']`,
            shortListACandidate: `//button[text()=' Shortlist ']`,
            shortListTextArea: `//textarea[@placeholder='Type here']`,
            status: `//p[text()='Status: Shortlisted']`,
        }
        this.rejectLocators = {
            rejectACandidate: `//button[text()=' Reject ']`,
            rejectTextArea: `//textarea[@placeholder='Type here']`,
            status: `//p[text()='Status: Rejected']`,
        }
        this.recruitmentNavigation = `//span[text()='Recruitment']`;
        this.toastMessage = 'p.oxd-text--toast-message';
        this.submit = `//button[@type='submit']`;
    }

    async navigate() {
        await this.page.locator(this.recruitmentNavigation).click();
    }

    async clickCandidates() {
        await this.page.locator(this.candidates.candidatesTab).click();
    }

    async clickVacancies() {
        await this.page.locator(this.candidates.vacanciesTab).click();
    }

    async uploadFile() {
        const fileInput: any = await this.page.$(this.candidates.resume);
        const filePath = subURL.filePath;
        await fileInput.setInputFiles(filePath);
    }

    async clickSave(messageToVerify?: string) {
        await this.page.locator(this.submit).click({ force: true });
        if (messageToVerify) {
            expect(await this.getToastMessage()).toEqual(messageToVerify);
        }
    }

    async getToastMessage() {
        return await this.page.locator(this.toastMessage).textContent();
    }

    async addNewVacancie() {
        await this.page.locator(this.vacancies.vacanciesTab).click();
        await this.page.locator(this.vacancies.addANewVacancie).click();
        await this.page.locator(this.vacancies.vacancieName).fill(testData.vacancy.vacancieName);
        await this.page.locator(this.vacancies.vacancieRole).click();
        await this.page.getByRole('option', { name: testData.vacancy.vacancieRole }).getByText(testData.vacancy.vacancieRole, { exact: true }).click();
        await this.page.locator(this.vacancies.vacancieDescription).type(testData.vacancy.vacancieDescription);
        await this.page.locator(this.vacancies.recruiter).fill(testData.vacancy.recruiterFirstName);
        await this.page.getByRole('option', { name: testData.vacancy.recruiterFullName }).getByText(testData.vacancy.recruiterFullName, { exact: true }).click();
        await this.page.locator(this.vacancies.totalOpenings).fill('1');
        await this.page.locator(this.submit).click();
    }

    async searchVacancie() {
        await this.page.goto(subURL.viewJobVacancy);
        await this.page.locator(this.vacancies.filter1).first().click();
        await this.page.getByRole('option', { name: testData.vacancy.vacancieRole }).click();
        await this.page.locator(this.vacancies.filter2).click();
        await this.page.getByRole('option', { name: testData.vacancy.vacancieName }).getByText(testData.vacancy.vacancieName, { exact: true }).click();
        await this.page.locator(this.submit).click();
    }

    async verifyVacancieSearch() {
        let totalRecords = await this.page.locator(this.candidates.totalRecordsList).textContent();
        expect(totalRecords).toContain(constants.assertion.totalRecords);
    }

    async addNewCandidate() {
        await this.page.locator(this.candidates.addACandidate).click();
        await this.page.locator(this.candidates.firstName).fill(testData.candidate.firstName);
        await this.page.locator(this.candidates.middleName).fill(testData.candidate.middleName);
        await this.page.locator(this.candidates.lastName).fill(testData.candidate.lastName);
        await this.page.locator(this.candidates.vaccancy).click();
        await this.page.getByRole('option', { name: testData.candidate.vacancieName }).getByText(testData.candidate.vacancieName, { exact: true }).click();
        await this.page.locator(this.candidates.email).fill(testData.candidate.email);
        await this.page.locator(this.candidates.contactNumber).fill(testData.candidate.number);
        await this.uploadFile();
        await this.page.locator(this.candidates.keywords).fill(testData.candidate.keywords);
        await this.page.locator(this.candidates.notes).fill(testData.candidate.notes);
    }

    async searchCandidate() {
        await this.page.goto(subURL.viewCandidates);
        await this.page.locator(this.candidates.filter1).first().click();
        await this.page.getByRole('option', { name: testData.candidate.filter1Option }).getByText(testData.candidate.filter1Option, { exact: true }).click();
        await this.page.locator(this.candidates.filter2).click();
        await this.page.getByRole('option', { name: testData.candidate.filter2Option }).getByText(testData.candidate.filter2Option, { exact: true }).click();
        await this.page.locator(this.candidates.search).click();
    }

    async verifyCandidateSearch() {
        let totalRecords = await this.page.locator(this.candidates.totalRecordsList).textContent();
        expect(totalRecords).toContain(constants.assertion.totalRecords);
    }

    async shortlist() {
        await this.page.locator(this.shortlistLocators.viewCandidate).click();
        await this.page.locator(this.shortlistLocators.shortListACandidate).click();
        await this.page.locator(this.shortlistLocators.shortListTextArea).type(testData.candidate.successMsg);
        await this.page.locator(this.submit).click();
        let status = await this.page.locator(this.shortlistLocators.status).textContent();
        expect(status).toContain(constants.assertion.status1);
    }

    async reject() {
        await this.page.locator(this.rejectLocators.rejectACandidate).click();
        await this.page.locator(this.rejectLocators.rejectTextArea).type(testData.candidate.failedMsg);
        await this.page.locator(this.submit).click();
        let status = await this.page.locator(this.rejectLocators.status).textContent();
        expect(status).toContain(constants.assertion.status2);
    }
}