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

function runTestSuite(testSuiteConstructor, options) {
  options = options || {};
  const reporter = options.reporter || new SimpleReporter();

  const testSuitePrototype = createTestSuite(testSuiteConstructor);
  reporter.reportTestSuite(
    getTestSuiteName(testSuiteConstructor, testSuitePrototype)
  );

  Object.keys(testSuitePrototype).forEach((methodName) => {
    if (methodName.match(/^test/)) {
      reporter.reportTest(methodName);
      let testSuite = createTestSuite(testSuiteConstructor);
      testSuite[methodName]();
    }
  });
}


function SimpleReporter() {
  this.reportTestSuite = (name) => {
    process.stdout.write(`\n${name}\n`);
  };
  this.reportTest = (name) => {
    process.stdout.write(`\t${name}\n`)
  };
}

function createTestSuite(TestSuiteConstructor) {
  return new TestSuiteConstructor(assertions);
}

function getTestSuiteName(testSuiteConstructor, testSuitePrototype){
  if (typeof(testSuitePrototype.getTestSuiteName) !== 'function') {
    return testSuiteConstructor.name;
  }
  return testSuitePrototype.getTestSuiteName();
}

module.exports = runTestSuite;
module.exports.SimpleReporter = SimpleReporter;
