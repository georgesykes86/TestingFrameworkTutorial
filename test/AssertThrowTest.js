var runTestSuite = require('../src/TestingFramework');

runTestSuite(function (t) {

  this.testSuccess = () => {
    t.assertThrow('an error message', () => {
      throw new Error('an error message');
    });
  };

  this.testSuccessWithDifferentMessage = () => {
    t.assertThrow('a different message', () => {
      throw new Error('a different message');
    });
  };
});
