import { HeaderLink } from '../../src/models';
import Page from './page';
import { Table } from '../elements/table';

class InfiniteScrollPage extends Page {
    path = HeaderLink.INFINITE_SCROLL;
    table;
    // Table options are provided for generation table class for the further manipulations
    tableOptions = {
        mainLocator: '#RBS-Scheduler-root',
        header: {
            switchValues: ['Day', 'Month']
        }
    };
    /**
     * @constructor initialize table for the page using @param options argument
     */
    constructor() {
        super();
        this.table = new Table(this.tableOptions);
    }
    open() {
        return super.open(this.path);
    }

    async getHeaderName() {
        return await $('#root > div > div h3').getText();
    }

}

export { InfiniteScrollPage };
