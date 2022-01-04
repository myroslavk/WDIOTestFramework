import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends Page {
    /**
     * overwrite specific options to adapt it to page object
     */
    path = 'scheduler/#/';
    open() {
        return super.open(this.path);
    }

    async clickOnHeaderLink(linkName) {
        return await $(`#root ul li [href="#/${linkName}"]`).click();
    }
}

export default new MainPage();
