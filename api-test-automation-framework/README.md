# API test automation framework

## Overall

This project is an API test automation framework for testing [PetStore API](https://petstore.swagger.io/#/) using [Mocha](https://mochajs.org/) framework and JavaScript. Also the framework contains linter [ESLint](https://eslint.org/) and is integrated with [Babel](https://babeljs.io/) compiler.

## Framework structure
-   [`src`](#src)
    -   [`generateHeaders.js`](#srcgenerateheadersjs)
    -   [`petRequests.js`](#srcpetrequestsjs)
    -   [`testData.js`](#srctestdatajs)
-   [`tests`](#tests)
## `src`

All source files.

### `src/generateHeaders.js`

The file contains function for generation headers.

### `src/petRequests.js`

The file contains all requests to the Pet Store.

### `src/testData.js`

The file consists of static test data and request body generator for creation pet.

## `tests`

The folder contains spec files.

## How to setup

### Precondition
1. Latest version of [NodeJS](https://nodejs.org/uk/) should be installed locally.
2. Clone repository to your local machine.

### How to start tests
1. Install dependencies.
```bash
npm install
```
2. Compile the ES6 Babel into the `/lib` directory.
```bash
npm run compile
```
3. Check code by linter.
```bash
npm run lint
```
4. Start tests. 
```bash
npm run test
```