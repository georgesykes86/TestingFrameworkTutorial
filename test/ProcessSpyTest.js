const runTestSuite = require('../src/TestingFramework');
const ProcessSpy = require('./ProcessSpy');

runTestSuite(function ProcessSpy_BehaviourTest(t) {
  const processSpy = new ProcessSpy();

  this.testHasExitedWithCode_initiallyIsNull = () => {
    t.assertEqual(null, processSpy.hasExitedWithCode);
  };

  this.testHasExitedWithCode_isZero_afterExitZeroCall = () => {
    processSpy.exit(0);
    t.assertEqual(0, processSpy.hasExitedWithCode);
  };

  this.testHasExitedWithCode_isOne_afterExitOneCall = () => {
    processSpy.exit(1);
    t.assertEqual(1, processSpy.hasExitedWithCode);
  };
});
