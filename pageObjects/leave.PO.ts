import { expect, Locator, Page } from "@playwright/test";
import subURL from "../support/subURL.json";
import testData from "../support/testDate.json";
import constants from "../support/constants.json";

export class Leave {

    readonly page: Page;
    readonly apply: any;
    readonly myLeave: any;
    readonly entitlement: any;
    readonly reports: any;
    readonly configure: any;
    readonly leaveList: any;
    readonly assignLeave: any;

    constructor(page: Page) {
        this.page = page;
        this.apply = {
            mainLeave: `//span[text()='Leave']`,
            apply: `//a[contains(text(),'Apply')]`,
            leaveType: `//div[@class='oxd-select-text oxd-select-text--active']//div[1]`,
            fromDate: `(//input[@placeholder='yyyy-mm-dd'])[1]`,
            toDate: `(//input[@placeholder='yyyy-mm-dd'])[2]`,
            comments: `//label[text()='Comments']/following::textarea`,
            submit: `//button[@type='submit']`
        }
        this.myLeave = {
            myLeave: `//a[contains(text(),'My Leave')]`,
            leaveType: `(//div[@class='oxd-select-text-input'])[2]`,
            submit: `//button[@type='submit']`,
            totalRecords: `//span[@class='oxd-text oxd-text--span']`
        }
        this.entitlement = {
            entitlement: `//span[text()='Entitlements ']`,
            addEntitlement: `(//a[@role='menuitem'])[1]`,
            myLeaveEntitlement: `(//a[@role='menuitem'])[2]`,
            myEntitlement: `(//a[@role='menuitem'])[3]`,
            empName: `//input[@placeholder='Type for hints...']`,
            leaveType: `(//div[@class='oxd-select-text-input'])[1]`,
            leaveEntitlement: `(//input[@class='oxd-input oxd-input--active'])[2]`,
            submit: `//button[@type='submit']`,
            search: `//button[text()=' Search ']`,
            totolRecords: `(//span[@class='oxd-text oxd-text--span'])[2]`,
            confirmEntitlement: `//button[text()=' Confirm ']`,
        }
        this.reports = {
            reports: `//span[text()='Reports ']`,
            leaveEntitlement: `(//a[@role='menuitem'])[1]`,
            myLeaveEntitlement: `(//a[@role='menuitem'])[2]`
        }
        this.configure = {
            configure: `//span[text()='Configure ']`,
            leavePeriod: `(//a[@role='menuitem'])[1]`,
            leaveTypes: `(//a[@role='menuitem'])[2]`,
            workWeek: `(//a[@role='menuitem'])[3]`,
            holidays: `(//a[@role='menuitem'])[4]`,
        }
        this.leaveList = {
            leaveList: `//a[contains(text(),'Leave List')]`,
            leaveListTotalRecords: `//span[@class='oxd-text oxd-text--span']`,
            threeDots: `//i[@class='oxd-icon bi-three-dots-vertical']`,
            viewLeaveDetails: `(//p[@class='oxd-text oxd-text--p'])[2]`,
            addAComments: `//button[text()=' Comments ']`,
            comments: `//textarea[contains(@class,'oxd-textarea oxd-textarea--active')]`,
            submit: `//button[text()=' Save ']`,
        }
        this.assignLeave = {
            assignLeave: `//a[contains(text(),'Assign Leave')]`,
            assignLeaveEmpName: `//input[@placeholder='Type for hints...']`,
            assignLeaveType: `oxd-select-text-input`,
            assignLeaveFromDate: `(//input[@placeholder='yyyy-mm-dd'])[1]`,
            assignLeaveToDate: `(//input[@placeholder='yyyy-mm-dd'])[2]`,
            assignLeaveComments: `//label[text()='Comments']/following::textarea`,
            assignLeaveSubmit: `//button[@type='submit']`
        }
    }

    async navigate() {
        await this.page.locator(this.apply.mainLeave).click();
    }

    async addEntitlement(username: any) {
        console.log("Username -->", username);
        await this.page.locator(this.entitlement.entitlement).click();
        await this.page.locator(this.entitlement.addEntitlement).click();
        await this.page.locator(this.entitlement.empName).fill(username);
        await this.page.getByRole('option', { name: username }).getByText(username, { exact: true }).click();
        await this.page.locator(this.entitlement.leaveType).click();
        await this.page.getByRole('option', { name: testData.myLeave.leaveType }).getByText(testData.myLeave.leaveType, { exact: true }).click();
        await this.page.locator(this.entitlement.leaveEntitlement).fill('10');
        await this.page.locator(this.entitlement.submit).click();
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.entitlement.confirmEntitlement).click();
    }

    async myLeaveEntitlement() {
        await this.page.locator(this.entitlement.entitlement).click();
        await this.page.locator(this.entitlement.myEntitlement).click();
        await this.page.locator(this.entitlement.leaveType).click();
        await this.page.getByRole('option', { name: testData.myLeave.leaveType }).getByText(testData.myLeave.leaveType, { exact: true }).click();
        await this.page.locator(this.entitlement.search).click();
        await this.verifymyLeaveEntitlement();
    }

    async myLeaveEntitlementPage(username: any) {
        await this.page.locator(this.entitlement.entitlement).click();
        await this.page.locator(this.entitlement.myLeaveEntitlement).click();
        await this.page.locator(this.entitlement.empName).fill(username);
        await this.page.getByRole('option', { name: username }).getByText(username, { exact: true }).click();
        await this.page.locator(this.entitlement.search).click();
        await this.verifymyLeaveEntitlement();
    }

    async verifymyLeaveEntitlement() {
        let records = await this.page.locator(this.entitlement.totolRecords).textContent();
        expect(records).toBe('(1) Record Found');
    }

    async applyLeave() {
        await this.page.locator(this.apply.apply).click();
        await this.page.locator(this.apply.leaveType).click();
        await this.page.getByRole('option', { name: testData.myLeave.leaveType }).getByText(testData.myLeave.leaveType, { exact: true }).click();
        await this.page.locator(this.apply.fromDate).clear();
        await this.page.locator(this.apply.fromDate).fill('2023-04-12');
        await this.page.locator(this.apply.toDate).clear();
        await this.page.locator(this.apply.toDate).fill('2023-04-14');
        await this.page.locator(this.apply.comments).fill('Testing leave apply module');
        await this.page.locator(this.apply.submit).click();
        await this.page.waitForTimeout(3000);
    }

    async myLeaveList() {
        await this.navigate();
        await this.page.locator(this.myLeave.myLeave).click();
        await this.page.locator(this.myLeave.leaveType).click();
        await this.page.getByRole('option', { name: testData.myLeave.leaveType }).getByText(testData.myLeave.leaveType, { exact: true }).click();
        await this.page.locator(this.myLeave.submit).click();
        let records = await this.page.locator(this.myLeave.totalRecords).textContent();
        expect(records).toBe('(1) Record Found');
    }

    async searchLeaveList() {
        await this.navigate();
        await this.page.locator(this.leaveList.leaveList).click();
        await this.page.waitForTimeout(3000);
        let records = await this.page.locator(this.leaveList.leaveListTotalRecords).textContent();
        expect(records).toBe('(1) Record Found');
        await this.page.locator(this.leaveList.threeDots).click();
        await this.page.locator(this.leaveList.viewLeaveDetails).click();
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.leaveList.addAComments).click();
        await this.page.locator(this.leaveList.comments).fill('Testing for leave list');
        await this.page.locator(this.leaveList.submit).click();
    }

    // async assignALeave() {
    //     await this.page.locator(this.assignLeave.assignLeave).click();
    //     await this.page.locator(this.assignLeave.assignLeaveEmpName).fill('Test User');
    //     await this.page.locator(this.assignLeave.assignLeaveType).click();
    //     await this.page.getByRole('option', { name: 'CAN - FMLA' }).getByText('CAN - FMLA', { exact: true }).click();
    //     await this.page.locator(this.assignLeave.assignLeaveFromDate).fill('12-04-2023');
    //     await this.page.locator(this.assignLeave.assignLeaveToDate).fill('13-04-2023');
    //     await this.page.locator(this.assignLeave.assignLeaveComments).fill('Assigning a leave');
    //     await this.page.locator(this.assignLeave.assignLeaveSubmit).click();
    // }
}