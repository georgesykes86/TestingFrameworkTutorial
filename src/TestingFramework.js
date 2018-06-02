const assertions = {
  assertTrue(condition, message) {
    let errorMessage = 'Expected to be true, but got false';

    if (message) {
      errorMessage = message;
    }
    if (!condition) {
      throw new Error(errorMessage);
    }
  },

  assertEqual(expected, actual) {
    this.assertTrue(
      expected === actual,
      `Expected to equal ${expected}, but got ${actual}`,
    );
  },

  assertThrow(expectedMessage, action) {
    try {
      action();
    } catch (error) {
      this.assertEqual(expectedMessage, error.message);
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
