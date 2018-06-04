'use strict';
const format = require('string-format');

const timeToWait = 30000;

/**
 * CommonActions class with CommonActions Methods.
 */
class CommonActions {

    /**
     * Method to wait a element.
     * @param elementCSS WebElement locator.
     */
    static waitElement(elementCSS) {
        browser.waitUntil(function () {
            return browser.isVisible(elementCSS) && browser.isExisting(elementCSS);
        }, timeToWait);
    }

    /**
     * Method to wait a element.
     * @param elementCSS1 WebElement locator.
     * @param elementCSS2 WebElement locator.
     */
    static waitElements(elementCSS1, elementCSS2) {
        browser.waitUntil(function () {
            return browser.isVisible(elementCSS1)
                || browser.isVisible(elementCSS2);
        }, timeToWait);
    }

    /**
     * Method to click on element.
     * @param elementCSS WebElement locator.
     */
    static clickWebElement(elementCSS) {
        this.waitElement(elementCSS, timeToWait);
        this.moveToComponent(elementCSS);
        browser.element(elementCSS).click();
    }

    /**
     * Method to wait element has been enable.
     * @param elementCSS WebElement locator.
     */
    static waitElementToReady(elementCSS) {
        browser.pause(3000);
        browser.waitForEnabled(elementCSS);
    }

    /**
     * Method to return a element.
     * @param elementCSS WebElement locator.
     * @returns WebElement.
     */
    static getElement(elementCSS) {
        this.waitElement(elementCSS, timeToWait);
        return browser.element(elementCSS);
    }

    /**
     * Method to set WebElement value.
     * @param elementCSS WebElement locator.
     */
    static setInputTextField(elementCSS, value) {
        this.waitElement(elementCSS, timeToWait);
        this.moveToComponent(elementCSS);
        browser.element(elementCSS).setValue(value);
    }

    /**
     * Method to move focus to WebElement.
     * @param elementCss WebElement locator.
     */
    static moveToComponent(elementCss) {
        this.waitElement(elementCss, timeToWait);
        browser.moveToObject(elementCss);
    }

    /**
     * @param elementCss comboBox.
     * @param elementToSelect select text on comboBox.
     */
    static selectOnComboBox(elementCss, elementToSelect, elementOnComboBox) {
        this.clickWebElement(elementCss);
        let css = format(elementOnComboBox, elementToSelect);
        this.clickWebElement(css);
    }

    /**
     * @param elementName .
     * @param keyLocatorOnList .
     */
    static isElementOnList(elementName, keyLocatorOnList) {
        let elementToVerify = format(keyLocatorOnList, elementName);
        return browser.isExisting(elementToVerify)
    }

    /**
     * @param elementName element to to search and click on list.
     * @param keyLocatorOnList key locator on list.
     */
    static clickLastElementOnList(elementName, keyLocatorOnList) {
        let elementToClick = format(keyLocatorOnList, elementName);
        this.clickWebElement(elementToClick);
    }

    /**
     * Confirm delete action on alert at Classic Theme.
     */
    static confirmAlert() {
        if (browser.alertText()) {
            browser.alertAccept();
        }
    }

    /**
     * @param message popup message.
     * @param closeButton close button on popup message at Classic Theme.
     */
    static closePopMessage(message, closeButton) {
        if (browser.isVisible(message)) {
            this.clickWebElement(closeButton);
        }
    }

    /**
     * @param elementCss element.
     * @param textToVerify text to verify.
     */
    static isPresentOnElement(elementCss, textToVerify) {
        return this.getElement(elementCss).getText().toString() === textToVerify;
    }

    /**
     * @param elementCss auto completer textField.
     * @param textToSelect select text on autoCompleter.
     */
    static selectOnAutoCompleterTextField(elementCss, textToSelect) {
        this.setInputTextField(elementCss, textToSelect);
        this.clickWebElement('//input[contains(@id,"acc3")]/following-sibling::a');
        this.autoCompleterClassicTheme(textToSelect);
    }


    /**
     * @param textToSelect select text on autoCompleter.
     */
    static autoCompleterClassicTheme(textToSelect) {


        let handle = browser.getTabIds();
        browser.switchTab(handle[1]);
        browser.frame("resultsFrame");
        let css = format('//a[text()="{}"]', textToSelect);
        browser.pause(3000);
        this.clickWebElement(css);
        browser.switchTab(handle[0]);
    }

    /**
     * @param textToSelect select text on autoCompleter.
     * NEED IMPROVE
     */
    static autoCompleterLightTheme(textToSelect) {
        let selector = format("//div[@title='%s']/parent::div/preceding-sibling::div", textToSelect);
        this.clickWebElement(selector);
    }

    /**
     * Method to wait spam bear after login on Lightning theme.
     */
    static waitToLightningBear() {
        browser.waitForExist('div[class="auraLoadingBox oneLoadingBox loadingHide"]', 30000);
    }

    /**
     * Method to verify is currently theme is Classic.
     * @param logo is to identify theme.
     * @return Boolean true if currently theme is Classic false is not.
     */
    static isCurrentThemeClassic(logo) {
        this.waitElements(logo.classic, logo.light);
        return browser.isVisible(logo.classic);
    }
}

module.exports = CommonActions;