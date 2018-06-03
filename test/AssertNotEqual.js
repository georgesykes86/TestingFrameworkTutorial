const runTestSuite = require('../src/TestingFramework');

runTestSuite(function AssertNotEqual(t) {
  this.testSuccess = () => {
    t.assertNotThrow(() => {
      t.assertNotEqual(42, 57)
    });
  };

  this.testFailure = () => {
    t.assertThrow('Expected not to equal 42 but got 42', () => {
      t.assertNotEqual(42, 42);
    });
  };

  this.testFailure_withDifferentValue = () => {
    t.assertThrow('Expected not to equal 43 but got 43', () => {
      t.assertNotEqual(43, 43);
    });
  };
});
