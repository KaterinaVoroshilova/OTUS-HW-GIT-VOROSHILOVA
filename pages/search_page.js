export class SearchResultPage
{

    constructor(page) {
        this.page = page;
        this._inputFrom = page.locator('[data-cy="whereFromSearchField"]');
        this._inputTo = page.locator('[data-cy="whereToSearchField"]');
        this._inputThere  = page.locator('[data-cy="dateForward"]');
        this._inputBack = page.locator('[data-cy="dateBackward"]');
        this._fieldTourists = page.locator('.v-tourists');
        this._searchButton = page.locator('.v-search-button');
        this._cityList = page.locator('.v-select__option');
        this._calendar = page.locator('.mx-calendar-panel-date');
        this._buttonNextMonth = page.locator('.mx-icon-right');
        this._buttonPreviousMonth = page.locator('.mx-icon-left');
        this._buttonNextYear = page.locator('.mx-icon-double-right');
        this._buttonPreviousYear = page.locator('.mx-icon-double-left');
        this._date = page.locator('[data-row-col = "2,4"]');
        this._addAdult = page.locator('[data-cy="adultsPlus"]');
        this._reduceAdult = page.locator('[data-cy="adultsMinus"]');
        this._addChildren = page.locator('[data-cy="childrenPlus"]');
        this._reduceChildren = page.locator('[data-cy="childrenMinus"]');
        this._addInfant = page.locator('[data-cy="infantsPlus"]');
        this._reduceInfant = page.locator('[data-cy="infantsMinus"]');
        this._economyRadioButton = page.locator('[id="economy"]');
        this._comfortRadioButton = page.locator('[id="comfort"]');
        this._bussinessRadioButton = page.locator('[id="business"]');
        this._firstClassRadioButton = page.locator('[id="first"]');
        this._title = page.locator('.title');
        this._filter = page.locator('.label');
        this._firstButtonAddToBasket = page.locator('button[data-v-142aa699 = ""] >> nth=1');
    }

    async fillFrom(city) {
        await this._inputFrom.fill(city);
    };

    async fillTo(city) {
        await this._inputTo.fill(city);
    }

    async clickFirstCityOfList() {
        await this._cityList.first().click();
    } 

    async clickCityOfList() {
        await this._cityList.click();
    }

    async clickDateForward() {
        await this._inputThere.click();
    }

    async clickDateBack() {
        await this._inputBack.click();
    } 

    async clickNextMonth() {
        await this._buttonNextMonth.click();
    }

    async clickPreviousMonth() {
        await this._buttonPreviousMonth.click();
    }

    async clickNextYear() {
        await this._buttonNextYear.click();
    }

    async clickPreviousYear() {
        await this._buttonPreviousYear.click();
    }

    async clickDate() {
        await this._date.click();
    }

    async clickAddAdult() {
        await this._addAdult.click();
    }

    async clickReduceAdult() {
        await this._reduceAdult.click();
    }

    async clickAddChild() {
        await this._addChildren.click();
    }

    async clickReduceChild() {
        await this._reduceChildren.click();
    }

    async clickAddInfant() {
        await this._addInfant.click();
    }

    async clickReduceInfant() {
        await this._reduceInfant.click();
    }

     async clickSearchButton() {
        await this._searchButton.click();
    }

    async clickFilters(nameFilter) {
        await this._filter.filter({ hasText: nameFilter}).click();
    }

    async clickButtonAddToBasket() {
        await this._firstButtonAddToBasket.click();
    }
    
    async addToBasket() {
        await this.clickFilters('S7 Airlines');
        await this.clickFilters('Уральские авиалинии');
        await this.clickFilters('Аэрофлот');
        await this.clickButtonAddToBasket;
        return new BasketPageStep1(this.page);
    }

}