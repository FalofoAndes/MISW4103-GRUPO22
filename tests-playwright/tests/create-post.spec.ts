import { test, expect, Page } from '@playwright/test';

const BASE_URL = "https://ghost-ur1e.onrender.com/";
const DEFAULT_USERNAME = 'pruebauniandes@uniandes.edu.co';
const DEFAULT_PASSWORD = 'Uniandes123456';

async function doLogin(page: Page) {
    await page.goto(BASE_URL + "ghost/#/signin");

    const emailTextField = page.locator('[name="identification"]');
    await emailTextField.fill(DEFAULT_USERNAME);

    const passwordTextField = page.locator('[name="password"]');
    await passwordTextField.fill(DEFAULT_PASSWORD);

    await page.getByRole('button', { name: 'Sign in' }).click();
}

async function doNavigateToCreatePost(page: Page) {
    const postsLink = await page.waitForSelector('a[href="#/posts/"]');
    await postsLink.click();

    const createPostsLink = await page.waitForSelector('a[href="#/editor/post/"]');
    await createPostsLink.click();
}

async function doPublishPost(page: Page) {
    const publishButtonSelector = 'button.gh-btn.gh-btn-editor.darkgrey.gh-publish-trigger';

    await page.waitForSelector(publishButtonSelector, { timeout: 5000 });
    await page.waitForTimeout(1000);
    await page.locator(publishButtonSelector).click();

    const finalReviewButtonSelector = 'button.gh-btn.gh-btn-black.gh-btn-large';

    await page.waitForSelector(finalReviewButtonSelector, { timeout: 5000 });
    await page.waitForTimeout(1000);
    await page.locator(finalReviewButtonSelector).click();

    const publishPostButtonSelector = 'button.gh-btn.gh-btn-large.gh-btn-pulse.ember-view';

    await page.waitForSelector(publishPostButtonSelector, { timeout: 5000 });
    await page.waitForTimeout(1000);
    await page.locator(publishPostButtonSelector).click();
}

async function doVisitPostJustCreated(page: Page) {
    const publishedPostLink = await page.waitForSelector('a.gh-post-bookmark-wrapper');
    await publishedPostLink.click();
}

async function doFillTitleAndContent(page: Page, title: string = "", content: string = "") {
    const titleInput = page.locator(`textarea[placeholder="Post title"]`);
    await titleInput.focus();
    await titleInput.fill(title);
    await titleInput.press('Enter')

    const contentInput = page.locator('div[data-kg="editor"]');

    await contentInput.focus();
    await contentInput.fill(content);
    await contentInput.press('Enter');
    await contentInput.press('Backspace');
}

test('Create post with title and content empty', async ({ page }) => {
    await doLogin(page);

    await doNavigateToCreatePost(page);

    await doFillTitleAndContent(page);

    await doPublishPost(page);
    await doVisitPostJustCreated(page);

    await expect(page).toHaveTitle(/Untitle/, { timeout: 3000 });
});

test('Create post with valid title', async ({ page }) => {
    const postTitle = 'Post title 1';

    await doLogin(page);

    await doNavigateToCreatePost(page);

    await doFillTitleAndContent(page, postTitle);

    await doPublishPost(page);
    await doVisitPostJustCreated(page);

    const postTitleRegex = new RegExp(`\\b${postTitle}\\b`);
    await expect(page).toHaveTitle(postTitleRegex, { timeout: 3000 });
});


test('Create post with custom url', async ({ page }) => {
    const customUrl = 'post-test-custom-url/';

    await doLogin(page);

    await doNavigateToCreatePost(page);

    await doFillTitleAndContent(page);

    const settingsButton = page.locator('button[title="Settings"]');
    await settingsButton.click();

    const urlInput = page.locator('input[name="post-setting-slug"][id="url"]');
    await urlInput.fill(customUrl);

    await doPublishPost(page);
    await doVisitPostJustCreated(page);

    await page.goto(BASE_URL + customUrl);

    await expect(page).toHaveURL(BASE_URL + customUrl);

    await expect(page).toHaveTitle(/Untitle/, { timeout: 3000 });
});


