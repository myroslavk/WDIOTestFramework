/**
 * Table header class is used for manipulation with table header
 * @constructor uses @param options agruments for setting switch values
 */
class TableHeader {
    switchValues;
    constructor(options) {
        this.switchValues = options.switchValues;
    }

    /**
     * @param value is set during constuctor call and provided valid values for swither
     */
    async switchTo(value) {
        if (!this.switchValues.includes(value)) {
            throw new Error(`Unexpected switch value = ${value}. Please, set one of the valid values "${this.switchValues.join(',')}"`);
        }
        await $$('label.ant-radio-button-wrapper > span').forEach(async (elem) => {
            if (await elem.getText() == value) {
                await elem.click();
            }
        });
    }

    // Click on the arrow to go the next day or month etc. (depends on switch options)
    async goAhead() {
        await $('table td div.ant-col div.header2-text [data-icon="right"]').click();
    }

    // Click on the arrow to go the next day or month etc. (depends on switch options)
    async goToPrevious() {
        await $('table td div.ant-col div.header2-text [data-icon="left"]').click();
    }
}

export { TableHeader };
