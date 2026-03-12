import {expect, test} from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();
const accountName = process.env.TEST_ACCOUNT_NAME;
const accountPassword = process.env.TEST_ACCOUNT_PASSWORD;

test('login', async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(accountName);
    await page.locator('input[name="username"]').press('Tab');
    await page.locator('input[name="password"]').fill(accountPassword);
    await page.getByRole('button', {name: 'Log In'}).click();

    await expect(page.getByRole('heading', {name: 'Accounts Overview'})).toBeVisible()
});

test('failed login', async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(accountName);
    await page.locator('input[name="username"]').press('Tab');
    await page.locator('input[name="password"]').fill('WrongPassword');
    await page.getByRole('button', {name: 'Log In'}).click();

    await expect(page.getByRole('heading', {name: 'Accounts Overview'})).not.toBeVisible()
});