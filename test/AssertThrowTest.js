const runTestSuite = require('../src/TestingFramework');

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

  this.testFailure = () => {
    t.assertThrow(`Expected to equal an error message, but got a different message`, () => {
      t.assertThrow('an error message', () => {
        throw new Error('a different message');
      });
    });
  };

  this.testFailure_whenActionDoesNotThrow = () => {
    t.assertThrow('Expected to throw an error but nothing was thrown', () => {
      t.assertThrow('an error message', () => {});
    });
  };

  this.testThrows_whenActionDoesNotThrow = () => {
    var hasThrown = false;

    try {
      t.assertThrow('an error message', () => {});
    } catch (error) {
      hasThrown = true;
    }

    t.assertTrue(hasThrown, "it should have thrown");
  };
});
