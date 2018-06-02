const runTestSuite = require('../src/TestingFramework');

runTestSuite(function (t) {

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
    runTestSuite(function TestSuiteName(t) {}, {reporter: reporter});
    t.assertTrue(reporter.hasReportedTestSuite('TestSuiteName'))
    reporter.assertHasReportedTestSuite('TestSuiteName');
  }

});
