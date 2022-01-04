import { expect } from 'chai';
import { config } from '../wdio.conf';
import { HeaderLink } from '../src/models';
import { InfiniteScrollPage } from '../src/pageobjects/infiniteScroll.page';
import MainPage from '../src/pageobjects/main.page';

describe('E2E test', () => {
    const infiniteScrollPage = new InfiniteScrollPage();
    let eventsCountBeforeGoAhead;
    let eventsCountAfterGoAhead;
    it('should open main page', async () => {
        await MainPage.open();
        expect(await browser.getUrl()).contains(config.baseUrl);

    });

    it('should navigate to infinite scroll page', async () => {
        await MainPage.clickOnHeaderLink(HeaderLink.INFINITE_SCROLL);
        expect(await infiniteScrollPage.getHeaderName()).contains('Infinite scroll');
    });

    it('should switch to "Month" view', async () => {
        await infiniteScrollPage.table.tableHeader.switchTo('Month');
    });

    it('should create several events', async () => {
        let eventsCountBeforeCreation = await infiniteScrollPage.table.getEventsCount();
        await infiniteScrollPage.table.createEvent('Fri 1/7', 'Resource4');
        await infiniteScrollPage.table.createEvent('Sat 1/1', 'Resource6');
        await infiniteScrollPage.table.createEvent('Mon 1/3', 'Resource5');
        let eventsCountAfterCreation = await infiniteScrollPage.table.getEventsCount();
        expect(eventsCountAfterCreation).is.greaterThan(eventsCountBeforeCreation);

        eventsCountBeforeGoAhead = eventsCountAfterCreation;
    });

    it('should go ahead month', async () => {
        await infiniteScrollPage.table.tableHeader.goAhead();
        browser.pause(5000);
        eventsCountAfterGoAhead = await infiniteScrollPage.table.getEventsCount();
        expect(eventsCountAfterGoAhead).is.lessThan(eventsCountBeforeGoAhead);
    });

    it('should go to previous month', async () => {
        await infiniteScrollPage.table.tableHeader.goToPrevious();
        let eventsCount = await infiniteScrollPage.table.getEventsCount();
        expect(eventsCountBeforeGoAhead).is.not.eq(eventsCount);
    });
});
