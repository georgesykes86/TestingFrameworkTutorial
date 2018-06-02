module.exports = function ReporterSpy(assertions) {
  this.assertHasReportTestSuite = (expectedName) => {
    assertions.assertTrue(false, `Expected test suite '${expectedName}' to be reported`)
  };
};
