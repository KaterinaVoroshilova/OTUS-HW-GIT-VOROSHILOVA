export class BasketPageStep1
{

    constructor(page) {
        this.page = page;
        this._selectedParameters = page.locator('.check');
        this._nonSelectedTariff = page.locator('.tariff__item');
        this._tariffName = page.locator('.tariff__item-head');
        this._tariffSelectButton = page.locator('button[data-v-6dbe8a4d =""]');
        this._cardOfInsurance = page.locator('.insurance__item');
        this._addInsurance = page.locator('button[data-v-1c6b551e = ""]');
        this._insuranceHead = page.locator('.insurance__item-head');
        this._cardOfService = page.locator('.service__item');
        this._addService = page.locator('button[data-v-20beec17= ""]');
        this._selectSet = page.locator('button[data-v-a6e9329e= ""]');
        this._selectBaggage = page.locator('button[data-v-fc24a2c6= ""]');
        this._goToStepTourists = page.locator('.pay-btn');
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