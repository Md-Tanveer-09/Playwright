const { spawnSync } = require('node:child_process');
const { mkdirSync, rmSync } = require('node:fs');
const path = require('node:path');

const npmCli = process.env.npm_execpath;

if (!npmCli) {
  console.error('Run this command through npm: npm test');
  process.exit(1);
}

function runNpmScript(script, args = []) {
  const forwardedArgs = args.length > 0 ? ['--', ...args] : [];
  return spawnSync(process.execPath, [npmCli, 'run', script, ...forwardedArgs], {
    stdio: 'inherit',
    env: process.env,
  });
}

const generation = runNpmScript('bdd:generate');
if (generation.error) {
  console.error(generation.error.message);
  process.exit(1);
}
if (generation.status !== 0) {
  process.exit(generation.status || 1);
}

const allureResultsDir = path.resolve(__dirname, '..', 'allure-results');
rmSync(allureResultsDir, { recursive: true, force: true });
mkdirSync(allureResultsDir, { recursive: true });

const tests = runNpmScript('test:playwright', process.argv.slice(2));
if (tests.error) {
  console.error(tests.error.message);
  process.exit(1);
}

const report = runNpmScript('allure:generate');
if (report.error) {
  console.error(report.error.message);
  process.exit(1);
}
if (report.status !== 0) {
  process.exit(report.status || 1);
}

process.exit(tests.status || 0);
