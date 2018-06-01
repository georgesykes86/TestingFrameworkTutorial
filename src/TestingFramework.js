const assertions = {
  assertTrue(condition, message) {
    if (!condition) {
      throw new Error(message || 'Expected to be true, but got false');
    }
  },
};

function runTestSuite(TestSuiteConstructor) {
  const testSuite = new TestSuiteConstructor(assertions);

  Object.keys(testSuite).forEach((methodName) => {
    if (methodName.match(/^test/)) {
      testSuite[methodName]();
    }
  });
}

module.exports = runTestSuite;
