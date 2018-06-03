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

function TestSuiteRunStatus() {
  let failed = false;

  this.markedAsFailed = function () {
    failed = true;
  };

  this.hasFailed = function () {
    return failed;
  };
}

function TestSuiteRunContext(testSuiteConstructor, options) {
  options = options || {};
  const reporter = options.reporter || new SimpleReporter();
  const process = options.process || global.process;
  let silenceFailures = options.silenceFailures || false;
  let status = new TestSuiteRunStatus();

  const testSuitePrototype = createTestSuite(testSuiteConstructor);

  this.invoke = function () {
        reportTestSuite();
        runAllTests();
        finishTestRun();
    };


  function reportTestSuite() { reporter.reportTestSuite(getTestSuiteName()); }

  function getTestSuiteName(){
    if (typeof(createTestSuite().getTestSuiteName) !== 'function') {
      return testSuiteConstructor.name;
    }
    return createTestSuite().getTestSuiteName();
  }

  function createTestSuite() {
    return new testSuiteConstructor(assertions);
  }

  function runAllTests() {
    Object.keys(testSuitePrototype).forEach((methodName) => {
      if (methodName.match(/^test/)) {
        handleTest(methodName);
      }
    });
  }

  function handleTest(testName) {
    reporter.reportTest(testName);
    runTest(createTestSuite(), testName);
  }

  function reportTest(testName) {
    reporter.reportTest(testName);
  }

  function runTest(testSuite, testName) {
    try {
      testSuite[testName]();
    } catch (error) {
      if (!silenceFailures) console.log(error);
      status.markedAsFailed();
    }
  }

  function finishTestRun() {
    if (status.hasFailed()) return process.exit(1);
      process.exit(0);
  }
}

function SimpleReporter() {
  this.reportTestSuite = (name) => {
    process.stdout.write(`\n${name}\n`);
  };
  this.reportTest = (name) => {
    process.stdout.write(`\t${name}\n`)
  };
}


function runTestSuite(testSuiteConstructor, options) {
  new TestSuiteRunContext(testSuiteConstructor, options).invoke();
}

module.exports = runTestSuite;
module.exports.SimpleReporter = SimpleReporter;
