import { TableHeader } from './tableHeader';
/**
 * Table class is used for manipulation with tables on page
 * @constructor initialize table header using @param options argument
 * and set main locator for table as well
 */
class Table {
    mainLocator;
    tableHeader;
    constructor(options) {
        this.tableHeader = new TableHeader(options.header);
        this.mainLocator = options.mainLocator;
    }

    async getEventsCount () {
        return await $(this.mainLocator).$$('div.event-item').length;
    }

    async createEvent(day, resourceName) {
        // Scroll to the first column for the valid further clicking
        await $$('.scheduler-view table.scheduler-bg-table thead tr th div')[0].scrollIntoView();

        const resource = await $(`.resource-view .resource-table tbody tr td [title="${resourceName}"] span`);
        await resource.waitForDisplayed({ timeout: 5000 });
        const columnWidth = await $$('.scheduler-bg-table thead tr th')[1].getSize('width');
        const columnNumber = day.split('/')[1];
        /*
         * X coordinate is calculated from
         * half of resource cell width (click is provided on the resource cell) plus
         * column width multiply to columns quantity (colums quantity depends of the day)
         * and minus one column width.
        */
        const x = Math.round(await resource.getSize('width') / 2) + columnWidth * columnNumber;
        resource.click({ x });
        // Accepting alerd is provided as syncronious operation
        browser.acceptAlert();
        // So for avoiding errors with acception alert need to wait a few seconds below
        await browser.pause(5000);
    }
}

export { Table };
