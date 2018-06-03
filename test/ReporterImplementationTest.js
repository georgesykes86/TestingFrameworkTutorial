const TestingFramework = require('../src/TestingFramework');
const runTestSuite = TestingFramework;
const SimpleReporter = TestingFramework.SimpleReporter;
const ReporterSpy = require('./ReporterSpy');

const IMPLEMENTATIONS = [
  SimpleReporter,
  ReporterSpy,
];

IMPLEMENTATIONS.forEach((ReporterImplementation) => {
  runTestSuite(function (t) {
    this.getTestSuiteName = () => {
      return ReporterImplementation.name + '_ReportTest';
    }
    let reporter = new ReporterImplementation();

    this.testDefines_reportTestSuite = () => {
      let reportTestSuite = reporter.reportTestSuite;
      t.assertEqual('function', typeof(reportTestSuite));
      t.assertEqual(1, reportTestSuite.length);
    };

    this.testDefines_reportTest = () => {
      let reportTest = reporter.reportTest;
      t.assertEqual('function', typeof(reportTest));
      t.assertEqual(1, reportTest.length);
    };
  });
});
