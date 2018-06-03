const runTestSuite = require('../src/TestingFramework');
const ReporterSpy = require('./ReporterSpy');

runTestSuite(function ReporterSpy_BehaviourTest(t) {
  let reporter = new ReporterSpy(t);

  this.testAssertHasReportedTestSuite_whenFailing = () => {
    t.assertThrow(
      "Expected test suite 'HelloWorld' to be reported",
      () => {
        reporter.assertHasReportedTestSuite('HelloWorld');
      });
  };

  this.testAssertHasReportedTestSuite_whenFailing_withOtherName = () => {
    t.assertThrow(
      "Expected test suite 'OtherTestSuite' to be reported",
      () => {
        reporter.assertHasReportedTestSuite('OtherTestSuite');
      }
    );
  };

  this.testAssertHasReportedTestSuite_whenReporting_andFailing = () => {
    t.assertThrow(
      "Expected test suite 'HelloWorld' to be reported", () => {
      reporter.reportTestSuite('OtherTestSuite');
      reporter.assertHasReportedTestSuite('HelloWorld');
    });
  };

  this.testAssertHasReportedTestSuite_whenReporting_andFailingWithDifferentName = () => {
    t.assertThrow(
      "Expected test suite 'OtherTestSuite' to be reported", () => {
      reporter.reportTestSuite('HelloWorld');
      reporter.assertHasReportedTestSuite('OtherTestSuite');
    });
  };

  this.testAssertHasReportedTestSuite_whenSucceeding = () => {
    t.assertNotThrow(() => {
      reporter.reportTestSuite('HelloWorld');
      reporter.assertHasReportedTestSuite('HelloWorld')
    });
  };

  this.testHasReportedTest_whenFailing = () => {
    t.assertThrow("Expected test 'testName' to be reported", () => {
      reporter.assertHasReportedTest('testName');
    });
  };

  this.testHasReportedTest_whenFailingWithDifferentName = () => {
    t.assertThrow("Expected test 'testDifferentName' to be reported", () => {
      reporter.assertHasReportedTest('testDifferentName');
    });
  };

  this.testAssertHasReportedTest_whenSucceeding = () => {
    t.assertNotThrow(() => {
      reporter.reportTest('testName');
      reporter.assertHasReportedTest('testName');
    });
  };

  this.testAssertHasReportedTest_whenSucceeding_withMultipleReports = () => {
    t.assertNotThrow(() => {
      reporter.reportTest('testName');
      reporter.reportTest('testOtherName');
      reporter.assertHasReportedTest('testName');
    });
  };

  this.testAssertHasReportedTestSuite_whenReporting_andFailing = () => {
    t.assertThrow(
      "Expected test 'testName' to be reported", () => {
      reporter.reportTest('testOtherName');
      reporter.assertHasReportedTest('testName');
    });
  };

  this.testAssertHasReportedTestSuite_whenReporting_andFailingWithDifferentName = () => {
    t.assertThrow(
      "Expected test 'testOtherName' to be reported", () => {
      reporter.reportTest('testName');
      reporter.assertHasReportedTest('testOtherName');
    });
  };
});
