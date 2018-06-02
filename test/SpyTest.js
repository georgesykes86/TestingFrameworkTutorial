const runTestSuite = require('../src/TestingFramework');

runTestSuite(function (t) {
  this.testIsNotCalledInitially = () => {
    t.spy().assertNotCalled();
  };

  this.testIsCalledAfterBeingCalled = () => {
    var aSpy = t.spy();
    aSpy();
    aSpy.assertCalled();
  };

  this.testAssertNotCalledFailsWhenCalled = () => {
    var aSpy = t.spy();
    aSpy();

    t.assertThrow('Expected not to be called', () => {
      aSpy.assertNotCalled();
    });
  };

  this.testAssertCalledFailsWhenNotCalled = () => {
    t.assertThrow('Expected to be called', () => {
      t.spy().assertCalled();
    });
  };
});
