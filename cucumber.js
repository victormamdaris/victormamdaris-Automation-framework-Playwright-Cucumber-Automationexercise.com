module.exports = {
  default: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: [
      'serenity.conf.ts',
      'src/test/steps/**/*.ts',
      'src/test/support/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      '@serenity-js/cucumber'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['src/test/features/**/*.feature'],
    dryRun: false,
    parallel: 1,
    timeout: 60000
  },
  smoke: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: [
      'serenity.conf.ts',
      'src/test/steps/**/*.ts',
      'src/test/support/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      '@serenity-js/cucumber'
    ],
    paths: ['src/test/features/**/*.feature'],
    tags: '@smoke',
    timeout: 60000
  },
  regression: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: [
      'serenity.conf.ts',
      'src/test/steps/**/*.ts',
      'src/test/support/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      '@serenity-js/cucumber'
    ],
    paths: ['src/test/features/**/*.feature'],
    tags: '@regression',
    parallel: 3,
    timeout: 60000
  },
  api: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: [
      'serenity.conf.ts',
      'src/test/steps/api/**/*.ts',
      'src/test/steps/common/**/*.ts',
      'src/test/support/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/api-cucumber-report.html',
      'json:reports/api-cucumber-report.json',
      '@serenity-js/cucumber'
    ],
    paths: ['src/test/features/api/**/*.feature'],
    timeout: 30000
  },
  ui: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: [
      'serenity.conf.ts',
      'src/test/steps/ui/**/*.ts',
      'src/test/steps/common/**/*.ts',
      'src/test/support/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/ui-cucumber-report.html',
      'json:reports/ui-cucumber-report.json',
      '@serenity-js/cucumber'
    ],
    paths: ['src/test/features/ui/**/*.feature'],
    timeout: 60000
  }
};
