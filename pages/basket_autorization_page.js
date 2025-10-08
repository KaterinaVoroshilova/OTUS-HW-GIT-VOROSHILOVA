export class BasketPageAutorization
{

    constructor(page) {
        this.page = page;
        this._enterButton = page.locator('.v-enter-button');
        this._autorizationForm = page.locstor('.v-modal-wrap');
        this._inputEmail = page.locator('[id="email"]');
        this._inputPass = page.locator('[id="password"]');
        this._enterButtonOnForm = page.locator('[value="Войти"]')
    }


     async clickTariffButton() {
        await this._tariffSelectButton.click();
    }

    async clickInsurance() {
        await this._addInsurance.click();
    }

    async clickServices() {
        await this._addService.click();
    }
    
    async clickSelectSet() {
        await this._selectSet.click();
    }

    async clickSelectBaggage() {
        await this._selectBaggage.click();
    }
    
    async clickGoToStepTourists() {
        await this._goToStepTourists.click();
        return new BasketPageStep2(this.page);
    }

}