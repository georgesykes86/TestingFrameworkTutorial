const runTestSuite = require('../src/TestingFramework');
const ReporterSpy = require('./ReporterSpy');
const ProcessSpy = require('./ProcessSpy');

runTestSuite(function RunTestSuiteTest(t) {
  const reporter = new ReporterSpy(t);

  this.testItCallsAllTestMethods = () => {
    let spyOne = t.spy();
    let spyTwo = t.spy();
    let spyThree = t.spy();

    runTestSuite(function (t) {
      this.testFunctionOne = spyOne;
      this.testFunctionTwo = spyTwo;
      this.testFunctionThree = spyThree;
    });

    t.assertTrue(spyOne.called);
    t.assertTrue(spyTwo.called);
    t.assertTrue(spyThree.called);
  };

  this.testItDoesNotRunTestWithoutPrefixTest = () => {
    let aSpy = t.spy();

    runTestSuite( function (t) {
      this.someMethod = aSpy;
    });

    t.assertTrue(!aSpy.called);
  };

  this.testItOutputsNameOfTheTest = () => {
    runTestSuite(function TestSuiteName(t) {
      this.testSomeTestName = () => {};
      this.testSomeOtherTestName = () => {};
    }, {reporter: reporter});

    reporter.assertHasReportedTestSuite('TestSuiteName');
    reporter.assertHasReportedTest('testSomeTestName');
    reporter.assertHasReportedTest('testSomeOtherTestName');
  };

  this.testItOutputsNameOfTheTest_withOtherName = () => {
    runTestSuite(function OtherTestSuiteName(t) {}, {reporter: reporter});

    reporter.assertHasReportedTestSuite('OtherTestSuiteName');
  };

  this.testItCanHaveCustomNameOfTheTestSuite = () => {
    runTestSuite(function (t) {
      this.getTestSuiteName = () => {
        return 'CustomNameOfTheTestSuite';
      };
    }, {reporter: reporter});

    reporter.assertHasReportedTestSuite('CustomNameOfTheTestSuite');
  };

  this.testItCanHaveCustomNameOfTheTestSuite_withOtherName = () => {
    runTestSuite(function (t) {
      this.getTestSuiteName = () => {
        return 'OtherCustomNameOfTheTestSuite';
      };
    }, {reporter: reporter});

    reporter.assertHasReportedTestSuite('OtherCustomNameOfTheTestSuite');
  };

});

runTestSuite(function FailureTest(t) {
  const processSpy = new ProcessSpy();

  this.testItDoesNotBubbleUpExceptions = () => {
    let aSpy = t.spy();

    t.assertNotThrow(() => {
      runTestSuite(function (t) {
        this.testFailure = () => {
          t.assertTrue(false)
        };

        this.testSomething = aSpy;
      }, { process: processSpy, silenceFailures: true });
    });
    aSpy.assertCalled();
  };

  this.testExitsWithProcessCodeOne = () => {
    runTestSuite(function (t) {
      this.testFailure = () => {
        t.assertTrue(false);
      };
    }, { process: processSpy, silenceFailures: true });
    t.assertEqual(1, processSpy.hasExitedWithCode);
  };

  this.testItExitsWithProcessCodeZero_onSuccess = () => {
    runTestSuite(function (t) {
      this.testFailure = () => {
        t.assertTrue(true);
      };
    }, { process: processSpy, silenceFailures: true });

    t.assertEqual(0, processSpy.hasExitedWithCode);
  }
});
