const assertions = {
  assertTrue(condition, message) {
    let errorMessage = message || 'Expected to be true, but got false';

    if (!condition) {
      throw new Error(errorMessage);
    }
  },

  assertFalse(condition, message) {
    let errorMessage = message || 'Expected to be false, but got true';

    this.assertTrue(!condition, errorMessage);
  },

  assertEqual(expected, actual) {
    this.assertTrue(
      expected === actual,
      `Expected to equal ${expected}, but got ${actual}`,
    );
  },


  assertNotEqual(expected, actual) {
        this.assertFalse(
            expected === actual,
            `Expected not to equal ${expected} but got ${actual}`
        )
    },

  assertThrow(expectedMessage, action) {
    let hasThrown = false;

    try {
      action();
    } catch (error) {
      hasThrown = true;
      this.assertEqual(expectedMessage, error.message);
    }

    this.assertTrue(hasThrown, 'Expected to throw an error but nothing was thrown');
  },

  assertNotThrow(action) {
    try {
      action();
    } catch (error) {
      throw new Error(
        `Expected not to throw error, but thrown '${error.message}'`
      )
    }
  },

  spy() {
    function that() {
      that.called = true;
    };

    that.assertNotCalled = function () {
      assertions.assertTrue(!that.called, 'Expected not to be called');
    };

    that.assertCalled = function () {
      assertions.assertTrue(that.called, 'Expected to be called');
    };

    return that;
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
