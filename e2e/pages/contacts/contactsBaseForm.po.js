'use strict';

const commonActions = require('../../core/ui/commonActions');
const Form = require('../common/form.po');

class ContactsBaseForm extends Form {
    /**
     * Constructor initializing all WebElements.
     */
    constructor() {
        super();
    }

    /**
     * Method to fill the contact fields.
     * @param contactInformation json with contact fields selectors.
     * @param contactDataValue json with contact fields values.
     */
    fillContactWithAllFieldsAndSave(contactInformation, contactDataValue) {
        let fillContactInformation = {
            'lastName': () => this.setContactInput(contactInformation.lastName, contactDataValue.lastName),
            'phone': () => this.setContactInput(contactInformation.phone, contactDataValue.phone),
            'mobile': () => this.setContactInput(contactInformation.mobile, contactDataValue.mobile),
            'title': () => this.setContactInput(contactInformation.title, contactDataValue.title),
            'department': () => this.setContactInput(contactInformation.department, contactDataValue.department),
            'leadSource': () => this.setContactOnComboBox(contactInformation.leadSource, contactDataValue.leadSource),
            'email': () => this.setContactInput(contactInformation.email, contactDataValue.email),
        };
        Object.keys(contactDataValue).forEach(key => {
            fillContactInformation[key].call();
        });
        this.clickOnSaveButton();

    }

    /**
     * Method to set the contact input text.
     * @param elementCss selector.
     * @param contactText value to set.
     */
    setContactInput(elementCss, contactText) {
        commonActions.setValue(elementCss, contactText);
    }

    /**
     * Method to set on combo box.
     * @param elementCss selector.
     * @param contactText value to set.
     */
    setContactOnComboBox(elementCss, contactText) {
        commonActions.selectOnComboBox(elementCss, contactText);
    }

}

module.exports = ContactsBaseForm;
