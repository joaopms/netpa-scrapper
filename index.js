const puppeteer = require("puppeteer");
const fetch = require("node-fetch");

const BASE_URL = process.env.NETPA_URL;
const USER = process.env.NETPA_USER;
const PASS = process.env.NETPA_PASS;
const COURSE_ID = process.env.NETPA_COURSEID;
const COURSE_INFO_COLUMN_ID = process.env.NETPA_COURSEINFOCOLUMNID || 1071; // Course status

const TELEGRAM_TOKEN = process.env.NETPA_TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NETPA_TELEGRAM_CHATID;
const TELEGRAM_DEFAULT_VALUE = process.env.NETPA_TELEGRAM_DEFAULTVALUE;
const TELEGRAM_MESSAGE = process.env.NETPA_TELEGRAM_MESSAGE;

if (
  !BASE_URL ||
  !USER ||
  !PASS ||
  !COURSE_ID ||
  !TELEGRAM_TOKEN ||
  !TELEGRAM_CHAT_ID ||
  !TELEGRAM_DEFAULT_VALUE ||
  !TELEGRAM_MESSAGE
) {
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

  await browser.close();

  console.log(courseInfo);
  await sendTelegramMessage(courseInfo);
})();

async function sendTelegramMessage(value) {
  if (value === TELEGRAM_DEFAULT_VALUE) {
    return;
  }

  console.log("Sending Telegram message");
  await fetch(`https://api.telegram.org/${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: TELEGRAM_MESSAGE,
    }),
    headers: { "Content-Type": "application/json" },
  });
}
