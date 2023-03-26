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
    readonly configure : any;
    readonly leaveList: any;
    readonly assignLeave: any;

    constructor(page: Page) {
        this.page = page;
        this.apply = {
            mainLeave : `//span[text()='Leave']`,
            apply: `//a[contains(text(),'Apply')]`,
            headApply : `//h6[text()='Apply Leave']`
        }
        this.myLeave = {
            myLeave : `//a[contains(text(),'My Leave')]`,
            submit : `//button[@type='submit']`,
            totalRecords : `//span[@class='oxd-text oxd-text--span']`
        }
        this.entitlement = {
            entitlement : `//span[text()='Entitlements ']`,
            addEntitlement : `(//a[@role='menuitem'])[1]`,
            myLeaveEntitlement : `(//a[@role='menuitem'])[2]`,
            myEntitlement : `(//a[@role='menuitem'])[3]`,
            empName : `//input[@placeholder='Type for hints...']`,
            leaveType : `(//div[@class='oxd-select-text-input'])[1]`,
            leaveEntitlement : `(//input[@class='oxd-input oxd-input--active'])[2]`,
            submit : `//button[@type='submit']`,
            search : `//button[text()=' Search ']`,
            totolRecords : `(//span[@class='oxd-text oxd-text--span'])[2]`,
        }
        this.reports = {
            reports : `//span[text()='Reports ']`,
            leaveEntitlement : `(//a[@role='menuitem'])[1]`,
            myLeaveEntitlement : `(//a[@role='menuitem'])[2]`
        }
        this.configure = {
            configure : `//span[text()='Configure ']`,
            leavePeriod : `(//a[@role='menuitem'])[1]`,
            leaveTypes : `(//a[@role='menuitem'])[2]`,
            workWeek : `(//a[@role='menuitem'])[3]`,
            holidays : `(//a[@role='menuitem'])[4]`,
        }
        this.leaveList = {
            leaveList : `//a[contains(text(),'Leave List')]`,
            leaveListStatus : `(//div[@class='oxd-select-text-input'])[1]`,
            leaveListType : `(//div[@class='oxd-select-text-input'])[2]`,
            leaveListEmpName : `input[placeholder='Type for hints...']`,
            leaveListSubUnit : `(//div[@class='oxd-select-text-input'])[3]`,
            leaveListSearch : `//button[@type='submit']`,
            leaveListTotalRecords : `//span[@class='oxd-text oxd-text--span']`
        }
        this.assignLeave = {
            assignLeave : `//a[contains(text(),'Assign Leave')]`,
            assignLeaveEmpName : `//input[@placeholder='Type for hints...']`,
            assignLeaveType : `oxd-select-text-input`,
            assignLeaveFromDate : `(//input[@placeholder='yyyy-mm-dd'])[1]`,
            assignLeaveToDate : `(//input[@placeholder='yyyy-mm-dd'])[2]`,
            assignLeaveComments : `//label[text()='Comments']/following::textarea`,
            assignLeaveSubmit : `//button[@type='submit']`
        }
    }

    async addEntitlement() {
        await this.page.locator(this.entitlement.entitlement).click();
        await this.page.locator(this.entitlement.addEntitlement).click();
        await this.page.locator(this.entitlement.empName).fill('test User');
        await this.page.locator(this.entitlement.leaveType).click();
        await this.page.getByRole('option', { name: testData.myLeave.leaveType }).getByText(testData.myLeave.leaveType, { exact: true }).click();
        await this.page.locator(this.entitlement.leaveEntitlement).fill('Add entitlement');
        await this.page.locator(this.entitlement.submit).click();
    }

    async myLeaveEntitlement(){
        await this.page.locator(this.entitlement.entitlement).click();
        await this.page.locator(this.entitlement.myEntitlement).click();
        await this.page.locator(this.entitlement.leaveType).click();
        await this.page.getByRole('option', { name: testData.myLeave.leaveType }).getByText(testData.myLeave.leaveType, { exact: true }).click();
        await this.page.locator(this.entitlement.search).click();
    }

    async verifymyLeaveEntitlement(){
        let records = await this.page.locator(this.entitlement.totolRecords).textContent();
        console.log('calue of records -->', records);
    }

    async myLeaveEntitlementPage(){
        await this.page.locator(this.entitlement.entitlement).click();
        await this.page.locator(this.entitlement.myLeaveEntitlement).click();
        await this.page.locator(this.entitlement.empName).fill('test User');
        await this.page.locator(this.entitlement.leaveType).click();
        await this.page.getByRole('option', { name: testData.myLeave.leaveType }).getByText(testData.myLeave.leaveType, { exact: true }).click();
        await this.page.locator(this.entitlement.search).click();
    }

    async navigate() {
        await this.page.locator(this.apply.mainLeave).click();
    }

    async applyModule(){
        await this.page.locator(this.apply.apply).click();
        let name = await this.page.locator(this.apply.headApply).textContent();
        console.log("name --->", name);
    }

    async myLeaveModule(){
        await this.page.locator(this.myLeave.myLeave).click();
        await this.page.getByRole('option', { name: testData.myLeave.leaveType }).getByText(testData.myLeave.leaveType, { exact: true }).click();
        await this.page.locator(this.myLeave.submit).click();
    }

    async verifyLeaveModule(){
        let records = await this.page.locator(this.myLeave.totalRecords).textContent();
        console.log('calue of records -->', records);
    }

    async assignALeave(){
        await this.page.locator(this.assignLeave.assignLeave).click();
        await this.page.locator(this.assignLeave.assignLeaveEmpName).fill('Test User');
        await this.page.locator(this.assignLeave.assignLeaveType).click();   
        await this.page.getByRole('option', { name: 'CAN - FMLA' }).getByText('CAN - FMLA', { exact: true }).click();
        await this.page.locator(this.assignLeave.assignLeaveFromDate).fill('2023-04-12');
        await this.page.locator(this.assignLeave.assignLeaveToDate).fill('2023-04-13');
        await this.page.locator(this.assignLeave.assignLeaveComments).fill('Assigning a leave');
        await this.page.locator(this.assignLeave.assignLeaveSubmit).click();
    }

    async searchLeaveList(){
        await this.page.locator(this.leaveList.leaveList).click();
        await this.page.locator(this.leaveList.leaveListStatus).click();
        await this.page.getByRole('option', { name: 'Rejected' }).getByText('Rejected', { exact: true }).click();
        await this.page.getByRole('option', { name: 'Cancelled' }).getByText('Cancelled', { exact: true }).click();
        await this.page.getByRole('option', { name: 'Taken' }).getByText('Taken', { exact: true }).click();
        await this.page.getByRole('option', { name: 'Scheduled' }).getByText('Scheduled', { exact: true }).click();
        await this.page.locator(this.leaveList.leaveListType).click();
        await this.page.getByRole('option', { name: 'CAN - FMLA' }).getByText('CAN - FMLA', { exact: true }).click();
        await this.page.locator(this.leaveList.leaveListEmpName).fill('Test User');
        await this.page.locator(this.leaveList.leaveListSubUnit).click();
        await this.page.getByRole('option', { name: 'Administration' }).getByText('Administration', { exact: true }).click();
        await this.page.locator(this.leaveList.leaveListSearch).click();
    }

    async verifySearchLeaveList(){
        let records = await this.page.locator(this.leaveList.leaveListTotalRecords).textContent();
        expect(records).toBe('No Records Found');
    }
}