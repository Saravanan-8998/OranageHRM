import { expect, Locator, Page } from "@playwright/test";

export class Dashboard {
    readonly page: Page;
    readonly timeAtWorkLoc: any;
    readonly myActions: any;
    readonly quickLaunches: any;

    constructor(page: Page) {
        this.page = page;
        this.timeAtWorkLoc = {
            timeAtWorkTitle: `//p[text()='Time at Work']`,
            punchedOut: `//p[text()='Punched Out']`,
            timeFormat: `.orangehrm-attendance-card-bar`,
            timeBtn: `//i[@class='oxd-icon bi-stopwatch']`,
            currentWeek: `(//p[@class='oxd-text oxd-text--p'])[3]`,
            totalHours: `.orangehrm-attendance-card-summary-total`,
            empTimeChart: `//div[@class='emp-attendance-chart']//canvas[1]`,
        }
        this.myActions = {
            myActionsTitle: `//p[text()='My Actions']`,
            leaveRequestIcon: `button.oxd-icon-button.oxd-icon-button--success`,
            timeSheetIcon: `button.oxd-icon-button.oxd-icon-button--warn`,
            selfReviewIcon: `button.oxd-icon-button.oxd-icon-button--danger`,
            interviewIcon: `button.oxd-icon-button.oxd-icon-button--info`,
            leaveRequest: `(//div[@class='orangehrm-todo-list-item']//p)[1]`,
            timeSheet: `(//div[@class='orangehrm-todo-list-item']//p)[2]`,
            selfReview: `(//div[@class='orangehrm-todo-list-item']//p)[3]`,
            interview: `(//div[@class='orangehrm-todo-list-item']//p)[4]`,
        }
        this.quickLaunches = {
            quickLaunchesTitle: `//p[text()='Quick Launch']`,
            assignLeave: `button[title='Assign Leave']`,
            leaveList: `button[title='Leave List']`,
            timesheet: `button[title='Timesheets']`,
            applyLeave: `button[title='Apply Leave']`,
            myLeave: `button[title='My Leave']`,
            myTimesheet: `button[title='My Timesheet']`,
        }
    }

    async verifyTimeAtWorkComponents() {
        await (await this.page.waitForSelector(this.timeAtWorkLoc.timeAtWorkTitle)).isVisible();
        await (await this.page.waitForSelector(this.timeAtWorkLoc.punchedOut)).isVisible();
        await (await this.page.waitForSelector(this.timeAtWorkLoc.timeFormat)).isVisible();
        await (await this.page.waitForSelector(this.timeAtWorkLoc.timeBtn)).isVisible();
        await (await this.page.waitForSelector(this.timeAtWorkLoc.currentWeek)).isVisible();
        await (await this.page.waitForSelector(this.timeAtWorkLoc.totalHours)).isVisible();
        await (await this.page.waitForSelector(this.timeAtWorkLoc.empTimeChart)).isVisible();
    }

    async timerClick() {
        await this.page.locator(this.timeAtWorkLoc.timeBtn).click();
    }

    async verifyMyActionsComponents() {
        await (await this.page.waitForSelector(this.myActions.myActionsTitle)).isVisible();
        await (await this.page.waitForSelector(this.myActions.leaveRequestIcon)).isVisible();
        await (await this.page.waitForSelector(this.myActions.timeSheetIcon)).isVisible();
        await (await this.page.waitForSelector(this.myActions.selfReviewIcon)).isVisible();
        await (await this.page.waitForSelector(this.myActions.interviewIcon)).isVisible();
        await (await this.page.waitForSelector(this.myActions.leaveRequest)).isVisible();
        await (await this.page.waitForSelector(this.myActions.timeSheet)).isVisible();
        await (await this.page.waitForSelector(this.myActions.selfReview)).isVisible();
        await (await this.page.waitForSelector(this.myActions.interview)).isVisible();
    }

    async leaveRequestClick() {
        await this.page.locator(this.myActions.leaveRequest).click();
    }

    async timeSheetClick() {
        await this.page.locator(this.myActions.timeSheet).click();
    }

    async selfReviewClick() {
        await this.page.locator(this.myActions.selfReview).click();
    }

    async interviewClick() {
        await this.page.locator(this.myActions.interview).click();
    }

    async verifyQuickLaunchesComponents() {
        await (await this.page.waitForSelector(this.quickLaunches.quickLaunchesTitle)).isVisible();
        await (await this.page.waitForSelector(this.quickLaunches.assignLeave)).isVisible();
        await (await this.page.waitForSelector(this.quickLaunches.leaveList)).isVisible();
        await (await this.page.waitForSelector(this.quickLaunches.timesheet)).isVisible();
        await (await this.page.waitForSelector(this.quickLaunches.applyLeave)).isVisible();
        await (await this.page.waitForSelector(this.quickLaunches.myLeave)).isVisible();
        await (await this.page.waitForSelector(this.quickLaunches.myTimesheet)).isVisible();
    }

    async assignLeaveClick() {
        await this.page.locator(this.quickLaunches.assignLeave).click();
    }

    async leaveListClick() {
        await this.page.locator(this.quickLaunches.leaveList).click();
    }

    async timesheetClick() {
        await this.page.locator(this.quickLaunches.timesheet).click();
    }

    async applyLeaveClick() {
        await this.page.locator(this.quickLaunches.applyLeave).click();
    }

    async myLeaveClick() {
        await this.page.locator(this.quickLaunches.myLeave).click();
    }

    async myTimesheetClick() {
        await this.page.locator(this.quickLaunches.myTimesheet).click();
    }
}