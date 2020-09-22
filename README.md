# netP@ Scrapper

A tool to automatically retrieve information about a course (like the status, grade, etc) from a netP@/netPA (by Digitalis) instance.

_This tool is not affiliated or supported by Digitalis._

## How to run

- Firstly clone the repository
- Install `puppeteer` by running `npm install`
- Provide the required environment variables (see below) and run the tool with `node index.js`

### Environment variables

| Variable                      | Required               | Description                                                                                                                                                                                          |
| ----------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NETPA_URL`                   | Yes                    | The NetPA instance base URL \| _If the login page is `https://example.com/netpa/page` then the variable should be `https://example.com/netpa`_                                                       |
| `NETPA_USER`                  | Yes                    | Your NetPA username                                                                                                                                                                                  |
| `NETPA_PASS`                  | Yes                    | Your NetPA password                                                                                                                                                                                  |
| `NETPA_COURSEID`              | Yes                    | The course ID                                                                                                                                                                                        |
| `NETPA_COURSEINFOCOLUMNID`    | No; Defaults to `1071` | The column ID of the information that will be retrieved \| _`1071`: Course status, `1075`: Grade_ \*                                                                                                 |
| `NETPA_TELEGRAM_TOKEN`        | Yes                    | Telegram bot token used to send a message                                                                                                                                                            |
| `NETPA_TELEGRAM_CHATID`       | Yes                    | Telegram chat ID to where a message should be sent                                                                                                                                                   |
| `NETPA_TELEGRAM_DEFAULTVALUE` | Yes                    | The default value of the retrieved information; a Telegram message will only be sent if the retrieved information is different than this value \| _For grades, the default value is an empty string_ |
| `NETPA_TELEGRAM_MESSAGE`      | Yes                    | The Telegram message to be sent                                                                                                                                                                      |

_\* IDs might be different from instance to instance_

### Full example

```
NETPA_URL=https://example.com/netpa \
NETPA_USER=stu12395 \
NETPA_PASS=hunter2 \
NETPA_COURSEID=1593994 \
NETPA_COURSEINFOCOLUMNID=1075 \
NETPA_TELEGRAM_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11 \
NETPA_TELEGRAM_CHATID=114492432 \
NETPA_TELEGRAM_DEFAULTVALUE="" \
NETPA_TELEGRAM_MESSAGE="You've been graded!" \
node index.js
```

## License

Do What The Fuck You Want To Public License (WTFPL)
