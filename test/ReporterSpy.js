const assertions = require('../src/TestingFramework');

module.exports = function ReporterSpy(assertions) {
  let testNames = [];
  let testSuiteName = null;

  this.assertHasReportedTestSuite = (expectedName) => {
    assertions.assertTrue(
      testSuiteName === expectedName,
      `Expected test suite '${expectedName}' to be reported`)
  };

  this.reportTestSuite = (name) => {
    testSuiteName = name;
  };

  this.assertHasReportedTest = (expectedName) => {
    assertions.assertTrue(
      testNames.indexOf(expectedName) >= 0,
      `Expected test '${expectedName}' to be reported`
    )
  };

  this.reportTest = (name) => {
    testNames.push(name);
  };
};
