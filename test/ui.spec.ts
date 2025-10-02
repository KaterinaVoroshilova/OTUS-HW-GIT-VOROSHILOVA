import { test, expect } from '@playwright/test';

test('Title on avia', async ({ page }) => {
  await page.goto('https://fstravel.com/avia');
  await expect(page.locator('.v-search-filter v-pt-4 v-pb-1')).toBeVisible;
  await expect(page.locator('.container-slider-main-banner')).toBeVisible;
  await expect(page.locator('.title')).toContainText('Спецпредложения авиакомпаний')
});

test('Message nothing', async ({ page }) => {
  await page.goto('https://fstravel.com/avia');
  await page.locator('[data-cy="whereFromSearchField"]').fill('123'); 
  await expect(page.locator('.v-select__option')).toBeVisible();
  await expect(page.locator('.v-select__option')).toHaveText('Ничего не найдено')
});

test('Enter departure city', async ({ page }) => {
  await page.goto('https://fstravel.com/avia');
  await page.locator('[data-cy="whereFromSearchField"]').fill('');
  await page.locator('[data-cy="whereFromSearchField"]').fill('Санкт')
  await expect(page.locator('.v-select__option').first()).toBeVisible();
  await expect(page.locator('.v-select__option').first()).toContainText('Санкт-Петербург');
  await page.locator('.v-select__option').first().click();
  await page.locator('[data-cy="whereFromSearchField"]').click();
  await expect(page.locator('.v-select__option')).toContainText('Санкт-Петербург')
});

test ('Search', async ({ page }) => {
  await page.goto('https://fstravel.com/avia');
  await page.locator('[data-cy="whereFromSearchField"]').fill('Санкт-'); 
  await page.locator('.v-select__option').first().click();
  await page.locator('[data-cy="whereToSearchField"]').fill('Москв');
  await page.locator('.v-select__option').click();
  await page.locator('[data-cy="dateForward"]').click();
  await page.locator('.mx-icon-right').click();
  await page.locator('.mx-icon-right').click();
  await page.locator('.mx-icon-right').click();
  await page.locator('[data-row-col = "2,4"]').click();
  await page.locator('.v-search-button').click();
  await page.locator('.title').waitFor({ state: 'visible', timeout: 20000 });
  await expect(page.locator('.title').first()).toContainText('Авиабилеты Санкт-Петербург - Москва');
  await expect(page.locator('.flight__desc-left').first()).toContainText('Санкт-Петербург');
  await expect(page.locator('.flight__desc-right').first()).toContainText('Москва')
});

test ('Go to basket', async ({ page }) => {
  await page.goto('https://fstravel.com/avia');
  await page.locator('[data-cy="whereToSearchField"]').fill('Соч');
  await page.locator('.v-select__option').click();
  await page.locator('[data-cy="dateForward"]').click();
  await page.locator('.mx-icon-right').click();
  await page.locator('.mx-icon-right').click();
  await page.locator('.mx-icon-right').click();
  await page.locator('[data-row-col = "2,4"]').click();
  await page.locator('.v-search-button').click();
  await page.locator('.title').waitFor({ state: 'visible', timeout: 20000 });
  await expect(page.locator('.title').first()).toContainText('Авиабилеты Москва - Сочи');
  await page.locator('label').filter({ hasText: 'S7 Airlines' }).click();
  await page.locator('label').filter({ hasText: 'Уральские авиалинии' } ).click();
  await page.locator('label').filter({ hasText: 'Аэрофлот' }).click();
  await page.locator('button[data-v-142aa699 = ""] >> nth=1').click();
  await page.locator('.title').filter({ hasText: 'Бронирование' }).waitFor({ state: 'visible', timeout: 20000 });
});



