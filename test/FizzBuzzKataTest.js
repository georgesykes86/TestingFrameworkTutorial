function FizzBuzzKataTest() {
  this.testNormalNumberIsReturned = function() {
    this.assertTrue("1" === fizzBuzz(1));
  };
}

var test = new FizzBuzzKataTest();
test.testNormalNumberReturned();
