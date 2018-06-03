const runTestSuite = require('../src/TestingFramework');

runTestSuite(function StatelessTest(t) {
  let answer = 41;

  this.testItCanMutateVariable_andImmediatelyUseNewValue = () => {
    answer ++;
    t.assertEqual(42, answer);
  };

  this.testItCanMutateVariableAgain_andGetTheSameResult = () => {
    answer++;
    t.assertEqual(42, answer);
  };
});
