import { BasePage } from "./base_page";
import { DocsPage } from "./docs_page";

export class HomePage extends BasePage{
    docsLink = this.page.getByRole("link", {name: "Docs"})
    searchButton = this.page.getByRole("button",{text: "Search"})

    async goto(url){
        await this.page.goto(url);
    }

    async navigateDocs(){
        await this.docsLink.click();
        return new DocsPage(this.page);
    }

    async openSearchModal() {
        await this.searchButton.click();
        return new ModalWindow(this.page);
    }
}

