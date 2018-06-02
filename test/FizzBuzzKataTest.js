const runTestSuite = require('../src/TestingFramework');

function fizzBuzz(number) {
  if (number % 15 === 0) return 'FizzBuzz';
  if (number % 5 === 0) return 'Buzz';
  if (number % 3 === 0) return 'Fizz';
  return number.toString();
}

runTestSuite(function FizzBuzzKataTest(t) {
  this.testNormalNumberIsReturned = () => {
    t.assertEqual('1', fizzBuzz(1));
  };

  this.testAnotherNormalNumberIsReturned = () => {
    t.assertEqual('2', fizzBuzz(2));
  };

  this.testFizzIsReturned = () => {
    t.assertEqual('Fizz', fizzBuzz(3));
  };

  this.testFizzIsReturnedForDifferentNumber = () => {
    t.assertEqual('Fizz', fizzBuzz(6));
  };

  this.testBuzzIsReturned = () => {
    t.assertEqual('Buzz', fizzBuzz(5));
  };

  this.testBuzzIsReturnedForDifferentNumber = () => {
    t.assertEqual('Buzz', fizzBuzz(10));
  };

  this.testFizzBuzzIsReturned = () => {
    t.assertEqual('FizzBuzz', fizzBuzz(15));
  };

  this.testFizzBuzzIsReturnedForDifferentNumber = () => {
    t.assertEqual('FizzBuzz', fizzBuzz(30));
  };
});
