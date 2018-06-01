const runTestSuite = require('../src/TestingFramework');

function fizzBuzz(number) {
  return number.toString();
}

runTestSuite(function FizzBuzzKataTest(t) {
  this.testNormalNumberIsReturned = () => {
    t.assertTrue(fizzBuzz(1) === '1', `Expected to equal 1, but got ${fizzBuzz(1)}`);
  };

  this.testAnotherNormalNumberIsReturned = () => {
    t.assertTrue(fizzBuzz(2) === '2', `Expected to equal 2, but got ${fizzBuzz(2)}`);
  };
});
