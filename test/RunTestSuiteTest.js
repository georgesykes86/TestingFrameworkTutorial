const runTestSuite = require('../src/TestingFramework');
const ReporterSpy = require('./ReporterSpy');

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

  this.testItOutputsNameOfTheTest = function () {
    runTestSuite(function TestSuiteName(t) {
      this.testSomeTestName = () => {};
      this.testSomeOtherTestName = () => {};
    }, {reporter: reporter});

    reporter.assertHasReportedTestSuite('TestSuiteName');
    reporter.assertHasReportedTest('testSomeTestName');
    reporter.assertHasReportedTest('testSomeOtherTestName');
  }

  this.testItOutputsNameOfTheTest_withOtherName = function () {
    runTestSuite(function OtherTestSuiteName(t) {}, {reporter: reporter});

    reporter.assertHasReportedTestSuite('OtherTestSuiteName');
  }

});
