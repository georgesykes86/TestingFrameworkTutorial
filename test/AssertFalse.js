const runTestSuite = require('../src/TestingFramework');

runTestSuite(function AssertFalse(t) {
  this.testSuccess = () => {
    t.assertNotThrow(() => {
      t.assertFalse(false)
    });
  };

  this.testFailure = () => {
    t.assertThrow('Expected to be false, but got true', () => {
      t.assertFalse(true);
    });
  };

  this.testFailure_withCustomMessage = () => {
    t.assertThrow('custom error message', () => {
      t.assertFalse(true, 'custom error message' )
    });
  };
});
