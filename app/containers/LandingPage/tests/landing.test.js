// const faker = require('faker');
const puppeteer = require('puppeteer');
// const person = {
//   email: faker.internet.email(),
//   password: faker.random.word(),
// };
const appUrlBase = 'http://localhost:3000';
const routes = {
  public: {
    landing: `${appUrlBase}/landing`,
  },
  private: {
    home: `${appUrlBase}/`,
    profile: `${appUrlBase}/profile/:id`,
  },
};
// create global variables to be used in the beforeAll function
let browser;
let page;

beforeAll(async () => {
  // launch browser
  browser = await puppeteer.launch({
    headless: false, // headless mode set to false so browser opens up with visual feedback
    slowMo: 250, // how slow actions should be
  });
  // creates a new page in the opened browser
  page = await browser.newPage();
});

describe('Register new user', () => {
  test('new user can register', async () => {
    await page.goto(routes.public.landing);
    await page.waitForSelector('#type-change-btn');
    await page.click('#type-change-btn');
    await page.waitForSelector('#register-form');

    await page.click('#username');
    await page.type('#username', 'newUser');
    await page.click('#password');
    await page.type('#password', 'newPassword');
    await page.click('#passwordConfirm');
    await page.type('#passwordConfirm', 'newPassword');
    await page.click('#email');
    await page.type('#email', 'test@test');
    await page.click('#dob');
    await page.type('#dob', '1995-12-22');
    await page.click('#zipcode');
    await page.type('#zipcode', '77005');
    await page.click('button[type=submit]');
    const hint = await page.$eval(
      'p[data-testid=register-hint]',
      e => e.innerHTML,
    );
    expect(hint).toBe('Register Success! Go to Login!');
  }, 6000000);
});

describe('login as new user', () => {
  test('new user can login', async () => {
    await page.waitForSelector('#type-change-btn');
    await page.click('#type-change-btn');
    await page.waitForSelector('#signin-form');

    await page.click('input[name=login-username]');
    await page.type('input[name=login-username]', 'newUser');
    await page.click('input[name=login-password]');
    await page.type('input[name=login-password]', 'newPassword');
    await page.click('button[name=login-btn]');
    await page.waitForSelector('#home-page');
  }, 6000000);
});

describe('Create new article and validate article appears in feed', () => {
  test('Create new article and validate article appears in feed', async () => {
    await page.click('#new-article-title');
    await page.type('#new-article-title', 'Test Article Title');
    await page.click('#new-article-body');
    await page.type('#new-article-body', 'test article content');
    await page.click('#add-new-article');
    await page.waitForSelector('#home-page');
    const titles = await page.$$eval('.home-page-post-item-post-title', arr =>
      arr.map(e => e.innerHTML),
    );
    expect(titles[0]).toBe('Test Article Title');
  }, 6000000);
});

describe('Update headline and verify change', () => {
  test('Update headline and verify change', async () => {
    await page.click('input[name=headline]');
    await page.type('input[name=headline]', 'new headline');
    await page.click('#update-headline');
    const headline = await page.$eval('.home-page-status', e => e.innerHTML);
    expect(headline).toBe('new headline');
  }, 6000000);
});

describe('Log out new user', () => {
  test('Log out new user', async () => {
    await page.click('#logout-btn');
    await page.waitForSelector('#signin-form');
  }, 6000000);
});

describe('log in as test user', () => {
  test('test user can login', async () => {
    await page.waitForSelector('#signin-form');

    await page.click('input[name=login-username]');
    await page.type('input[name=login-username]', 'test');
    await page.click('input[name=login-password]');
    await page.type('input[name=login-password]', '123');
    await page.click('button[name=login-btn]');
    await page.waitForSelector('#home-page');
  }, 6000000);
});

describe('Search for a keyword that matches only one of test user articles and verify only one article shows, and verify the author', () => {
  test('Search for a keyword that matches only one of test user articles and verify only one article shows, and verify the author', async () => {
    await page.click('input[name=search]');
    await page.type('input[name=search]', 'search test');
    await page.click('#search-btn');
    const authors = await page.$$eval('.home-page-post-item-author-name', arr =>
      arr.map(e => e.innerHTML),
    );
    expect(authors.length).toBe(1);
    expect(authors[0]).toBe('test');
  }, 6000000);
});
// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
  browser.close();
});
