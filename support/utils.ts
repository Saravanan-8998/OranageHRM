import { Page } from '@playwright/test';

export const click = async (page: Page, role: any, name: any) => {
    return await page.getByRole(role, { name }).click();
};

export const labelClick = async (page: Page, name: any) => {
    return await page.getByLabel(name).click();
};

export const rollFill = async (page: Page, role: any, nameValue: any, fillValue: any) => {
    return await page.getByRole(role, { name: `${nameValue}` }).fill(`${fillValue}`);
};

export const labelFill = async (page: Page, nameValue: any, fillValue: any) => {
    return await page.getByLabel(`${nameValue}`).fill(`${fillValue}`);
};

export const check = async (page: Page, nameValue: any) => {
    return await page.getByLabel(`${nameValue}`).isVisible();
};

export const rollSelect = async (page: Page, role: any, nameValue: any, dropDownValue: any) => {
    return await page.getByRole(role, { name: `${nameValue}` }).selectOption(dropDownValue);
};

export const rollTrue = async (page: Page, role: any, nameValue: any) => {
    return await page.getByRole(role, { name: nameValue, exact: true }).click();
};

export const type = async (page: Page, name: any, typeValue: any) => {
    return await page.getByLabel(name).type(typeValue);
};