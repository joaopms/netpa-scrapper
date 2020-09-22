# netP@ Scrapper

A tool to automatically retrieve information about a course (like the status, grade, etc) from a netP@/netPA (by Digitalis) instance.

_This tool is not affiliated or supported by Digitalis._

## How to run

- Firstly clone the repository
- Install `puppeteer` by running `npm install`
- Provide the required environment variables (see below) and run the tool with `node index.js`

### Environment variables

| Variable                   | Required               | Description                                                                                                                                    |
| -------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `NETPA_URL`                | Yes                    | The NetPA instance base URL \| _If the login page is `https://example.com/netpa/page` then the variable should be `https://example.com/netpa`_ |
| `NETPA_USER`               | Yes                    | Your NetPA username                                                                                                                            |
| `NETPA_PASS`               | Yes                    | Your NetPA password                                                                                                                            |
| `NETPA_COURSEID`           | Yes                    | The course ID                                                                                                                                  |
| `NETPA_COURSEINFOCOLUMNID` | No; Defaults to `1071` | The column ID of the information that will be retrieved \| _`1071`: Course status, `1075`: Grade_ \*                                           |

_\* IDs might be different from instance to instance_

### Full example

```
NETPA_URL=https://example.com/netpa \
NETPA_USER=stu12395 \
NETPA_PASS=hunter2 \
NETPA_COURSEID=1593994 \
NETPA_COURSEINFOCOLUMNID=1071 \
node index.js
```

## License

Do What The Fuck You Want To Public License (WTFPL)
