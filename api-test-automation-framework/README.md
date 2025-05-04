# API test automation framework

## Overall

This project is an API test automation framework for testing [PetStore API](https://petstore.swagger.io/#/) using [Mocha](https://mochajs.org/) framework and TypeScript. Also the framework contains linter [ESLint](https://eslint.org/).

## How to setup

### Precondition
1. Latest version of [NodeJS](https://nodejs.org/uk/) should be installed locally.
2. Clone repository to your local machine.

Note: set the "NODE_TLS_REJECT_UNAUTHORIZED" env variable as 0 to run tests.

### How to start tests
1. Install dependencies.
```bash
npm install
```
2. Check code by linter.
```bash
npm run lint
```
3. Start tests. 
```bash
npm run test
```