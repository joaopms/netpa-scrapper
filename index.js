const puppeteer = require("puppeteer");

const BASE_URL = process.env.NETPA_URL;
const USER = process.env.NETPA_USER;
const PASS = process.env.NETPA_PASS;
const UC_ID = process.env.NETPA_UCID;
const GRADE_INFO_COLUMN_ID = process.env.NETPA_GRADEINFOCOLUMNID || 1071; // Grade status

if (!BASE_URL || !USER || !PASS || !UC_ID) {
  console.error("Please provide the correct environment variables");
  return;
}

(async () => {
  const browser = await puppeteer.launch({
    // devtools: true,
  });
  const page = await browser.newPage();

  // Login
  await page.goto(BASE_URL + "/page");
  await page.click("a#loginregisterLink");
  await page.waitForTimeout(500);
  await page.type("input[name='_user']", USER);
  await page.type("input[name='_pass']", PASS);
  await page.waitForTimeout(500);
  await page.click("div.login-submitbutton");

  // Grades page
  await page.waitForSelector("a[href='page?stage=ConsultaNotasAluno']");
  await page.goto(BASE_URL + "/page?stage=ConsultaNotasAluno");
  const ucColumnIdentifier = await page.waitForSelector(
    `td[data-qtip*='${UC_ID}'`
  );
  const gradeInfoElement = (
    await ucColumnIdentifier.$x(
      `../td[contains(@class, '${GRADE_INFO_COLUMN_ID}')]`
    )
  )[0];
  const gradeInfo = await (
    await gradeInfoElement.getProperty("innerText")
  ).jsonValue();

  console.log(gradeInfo);

  await browser.close();
})();
