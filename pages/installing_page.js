import { BasePage } from "./base_page";

export class InstallingPage extends BasePage{
    installingText = this.page.getByText('Installing Playwright').first();
    mainHeading = this.page.getByRole("heading", {level: 1});

    async waitLoaded() {
        await this.page.waitForLoadState('domcontentloaded')
    }

}