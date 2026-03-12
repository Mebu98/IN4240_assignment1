import {expect, test} from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();
const accountName = process.env.TEST_ACCOUNT_NAME;
const accountPassword = process.env.TEST_ACCOUNT_PASSWORD;
const indexUrl = process.env.INDEX_URL || 'https://parabank.parasoft.com/parabank/index.htm';

async function login(page, username, password) {
    await page.goto(indexUrl);
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="username"]').press('Tab');
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole('button', {name: 'Log In'}).click();

}

test.describe('Single tests', () => {
    test('Login', async ({page}) => {
        await login(page, accountName, accountPassword);
        await expect(page.getByRole('heading', {name: 'Accounts Overview'})).toBeVisible()
    });

    test('Failed login', async ({page}) => {
        await login(page, accountName, 'Wrong Password');
        await expect(page.getByRole('heading', {name: 'Accounts Overview'})).not.toBeVisible()
    });
})

test.describe('Tests with beforeEach & afterEach', () => {
    test.beforeEach('Login', async ({page}) => {
        await login(page, accountName, accountPassword);
        await expect(page.getByRole('heading', {name: 'Accounts Overview'})).toBeVisible()
    })

    test.afterEach('Logout',async ({page}) => {
        await page.getByRole('link', {name: 'home', exact: true}).click();
        await page.getByRole('link', {name: 'Log Out'}).click();

        await expect(page.getByRole('link', {name: 'Log Out'})).not.toBeVisible()
        await expect(page.getByRole('button', {name: 'Log In'})).toBeVisible()
    })

    test('title', async ({page}) => {

    })
})