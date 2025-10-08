import { BasePage } from "./base_page";

export class ModalWindow extends BasePage{
    searchInput = this.page.locator('id="docsearch-input"');
}