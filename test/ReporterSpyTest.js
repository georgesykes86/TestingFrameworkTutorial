const runTestSuite = require('../src/TestingFramework');
const ReporterSpy = require('./ReporterSpy');

runTestSuite(function ReporterSpy_BehaviourTest(t) {
  var reporter = new ReporterSpy(t);

  this.testAssertHasReportedTestSuite_whenFailing = () => {
    t.assertThrow(
      "Expected test suite 'HelloWorld' to be reported",
      () => {
        reporter.assertHasReportTestSuite('HelloWorld');
      });
  };

  this.testAssertHasReportedTestSuite_whenFailing_withOtherName = () => {
    t.assertThrow(
      "Expected test suite 'OtherTestSuite' to be reported",
      () => {
        reporter.assertHasReportTestSuite('OtherTestSuite');
      }
    );
  };
});
