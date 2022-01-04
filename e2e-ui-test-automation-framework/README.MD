# E2E UI Automation framework

## Overall

This project is a UI test automation framework for testing [Scheduler](https://stephenchou1017.github.io/scheduler/#/) using [WebDriverIO](https://webdriver.io/) and JavaScript. Also the framework contains linter [ESLint](https://eslint.org/) and is integrated with [Babel](https://babeljs.io/) compiler.

## Framework structure
-   [`src`](#src)
    -   [`pageobjects`](#srcpageobjects)
    -   [`elements`](#srcelements)
    -   [`models.js`](#srcmodelsjs)
-   [`tests`](#tests)
## `src`

All source files.

### `src/pageobjects`

The folder contains page object classes.

### `src/elements`

The folder contains classes of elements of which the page consists

### `src/models.js`

The file consists of static data.

## `tests`

The folder contains spec files.

## How to setup

### Precondition
1. Latest version of [NodeJS](https://nodejs.org/uk/) should be installed locally.
2. Clone repository to your local machine.

### How to start tests
1. Install dependencies.
``` bash
npm install
```
2. Check code by linter.
``` bash
npm run lint
```
3. Start tests.
```bash
npm run test
```
