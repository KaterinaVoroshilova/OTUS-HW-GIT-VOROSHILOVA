import { test, expect } from '@playwright/test';
import {HomePage} from '../pages/home_page.js';

test ("Проверка наличия текста installing playwright в разделе docs", async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.goto("https://playwright.dev/");
    const docsPage = await homePage.navigateDocs();
    const installingPage = await docsPage.navigationToInstallation();
    await installingPage.waitLoaded();

    await expect(installingPage.installingText).toBeVisible();
    await expect(installingPage.mainHeading).toHaveText("Installation")
})

test ("Проверка открытия поиска", async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.goto("https://playwright.dev/");
    const modalWindow = await homePage.openSearchModal();

    await expect(modalWindow.searchInput).toBeVisible;
})