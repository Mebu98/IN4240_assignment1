import { test, expect } from '@playwright/test';

test('Send Customer Care message (task 1.5)', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'contact', exact: true }).click();
  await page.locator('#name').click();
  await page.locator('#name').fill('test');
  await page.locator('#email').click();
  await page.locator('#email').fill('test@gmail.com');
  await page.locator('#phone').click();
  await page.locator('#phone').fill('12345678');
  await page.locator('#message').click();
  await page.locator('#message').fill('Test message.');
  await page.getByRole('button', { name: 'Send to Customer Care' }).click();
  expect(page.getByText('Thank you test'))
});