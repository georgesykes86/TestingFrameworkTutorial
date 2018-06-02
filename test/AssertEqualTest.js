const runTestSuite = require('../src/TestingFramework');

runTestSuite(function (t) {
  this.testSuccess = () => {
    t.assertEqual(42, 42);
  };

  this.testSuccess = () => {
    t.assertEqual(29, 29);
  };

  this.testFailure = () => {
    t.assertThrow('Expected to equal 42, but got 29', () => {
      t.assertEqual(42, 29);
    });
  };

  this.testFailure_withDifferentExpectedAndActual = () => {
    t.assertThrow('Expected to equal 94, but got 1027', () => {
      t.assertEqual(94, 1027);
    });
  };
});
