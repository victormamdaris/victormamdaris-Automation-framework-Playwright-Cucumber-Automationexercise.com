const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, '../../../reports');
const jsonReport = path.join(reportsDir, 'cucumber-report.json');

if (fs.existsSync(jsonReport)) {
  report.generate({
    jsonDir: reportsDir,
    reportPath: reportsDir,
    metadata: {
      browser: {
        name: process.env.BROWSER || 'chromium',
        version: 'Latest'
      },
      device: 'Local Machine',
      platform: {
        name: process.platform,
        version: process.version
      }
    },
    customData: {
      title: 'Automation Test Execution Report',
      data: [
        { label: 'Project', value: 'AutomationExercise.com' },
        { label: 'Framework', value: 'Playwright + Cucumber' },
        { label: 'Environment', value: process.env.ENV || 'dev' },
        { label: 'Execution Date', value: new Date().toLocaleString() }
      ]
    }
  });

  console.log('✅ HTML report generated successfully!');
  console.log(`📊 Report location: ${path.join(reportsDir, 'index.html')}`);
} else {
  console.log('⚠️  No JSON report found. Skipping HTML report generation.');
}
