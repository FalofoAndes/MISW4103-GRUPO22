import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PagesPage extends Page {
    async goToCreatePage() {
        return super.open('editor/page');
    }

}

export default new PagesPage();
