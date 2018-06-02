const runTestSuite = require('../src/TestingFramework');

runTestSuite(function assertTrueTest(t) {
  this.testSuccess = () => {
    t.assertTrue(true);
  };

  this.testFailure = () => {
    t.assertThrow('Expected to be true, but got false', () => {
      t.assertTrue(false);
    });
  };


  this.testCustomFailureMessage = () => {
    t.assertThrow('it is not true!', () => {
      t.assertTrue(false, 'it is not true!');
    });
  };

  this.testCustomFailureMessage_withOtherMessage = () => {
    t.assertThrow('should be true', () => {
      t.assertTrue(false, 'should be true');
    });
  };
});
