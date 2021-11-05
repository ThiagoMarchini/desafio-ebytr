import puppeteer from "puppeteer";

describe("LoginForm.jsx", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  it("Testa o login com um usuário inexistente", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".login");
    await page.click('#email');
    await page.type("#email", "xablau");
    await page.click('#password');
    await page.type("#password", "xablau");
    await page.click("#login-button");
    await page.waitForSelector(".span");
    const text = await page.$eval(
      ".span",
      (e) => e.textContent
    );
    expect(text).toContain("Usuário/senha inválidos!");
  });

  it("Testa o login com um usuário admin", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".login");
    await page.click('#email');
    await page.type("#email", "admin@ebytr.com");
    await page.click('#password');
    await page.type("#password", "123456");
    await page.click("#login-button");
    await page.waitForSelector("table")
  });

  afterAll(() => browser.close());
});