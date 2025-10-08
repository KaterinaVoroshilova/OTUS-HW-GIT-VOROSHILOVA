import { BasePage } from "./base_page";

export class DocsPage extends BasePage{
    installationLink = this.page.getByRole("link", {name: "Installation"})

    async navigateToInstallation() {
        await this.installationLink.click();
        return new InstallingPage(this.page)
    }
}
