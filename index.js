const puppeteer = require("puppeteer");

const BASE_URL = process.env.NETPA_URL;
const USER = process.env.NETPA_USER;
const PASS = process.env.NETPA_PASS;
const COURSE_ID = process.env.NETPA_COURSEID;
const COURSE_INFO_COLUMN_ID = process.env.NETPA_COURSEINFOCOLUMNID || 1071; // Course status

if (!BASE_URL || !USER || !PASS || !COURSE_ID) {
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
  const courseColumnIdentifier = await page.waitForSelector(
    `td[data-qtip*='${COURSE_ID}'`
  );
  const courseInfoElement = (
    await courseColumnIdentifier.$x(
      `../td[contains(@class, '${COURSE_INFO_COLUMN_ID}')]`
    )
  )[0];
  const courseInfo = await (
    await courseInfoElement.getProperty("innerText")
  ).jsonValue();

  console.log(courseInfo);

  await browser.close();
})();
