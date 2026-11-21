# Playwright BDD TypeScript Framework

This starter framework combines Playwright Test, TypeScript, Gherkin scenarios
through `playwright-bdd`, and Allure reporting.

## Setup

```bash
npm install
npx playwright install chromium
```

## Run tests and generate the Allure report

```bash
npm test
```

The command generates Playwright tests from the feature files, runs them, and
generates the HTML report in `allure-report/`. Allure result files are written
to `allure-results/` as each test runs. The HTML report is generated even when
a test fails; the command still exits with the test failure status.
Each scenario runs in desktop (1280×720), tablet (768×1024), and mobile
(390×844) viewports.

Open the generated report with:

```bash
npm run allure:open
```

Run scenarios by tag (the sample scenario is tagged `@smoke`):

```bash
npm.cmd test -- --grep "@smoke"
```

Add a Gherkin tag such as `@regression` on the line above a `Scenario` or
`Feature`, then use `--grep "@regression"` to select it. Tag-filtered runs also
generate or refresh the Allure report.

You can also run the generated Playwright tests directly with
`npm run test:playwright`, then create a report with `npm run allure:generate`.

## Add a BDD test

1. Add a scenario to a `.feature` file under `features/`.
2. Implement its Gherkin steps in a TypeScript file under `steps/`.
3. Run `npm test` to execute the scenarios and refresh the Allure report.

Page names in the feature file (for example, `"Home page"`) map to URLs in
`data/page-urls.ts`. Add another name and URL to `pageUrls` to reuse the same
navigation and URL-verification steps for another page. BDD bindings are kept
in `steps/homepage.steps.ts`; browser interactions and API assertions are in
`pages/store.page.ts`. The sample scenario adds an available product to the
cart, opens it, and checks displayed prices against the cart API response.
