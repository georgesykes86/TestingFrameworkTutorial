var runTestSuite = require("../src/TestingFramework");

runTestSuite(function AssertNotThrowTest(t) {
    this.testSuccess = () => {
        t.assertNotThrow(() => {
            t.assertNotThrow(() => {
                // do nothing
            });
        });
    };

    this.testFailure = () => {
        t.assertThrow("Expected not to throw error, but thrown 'error message'", function () {
            t.assertNotThrow(() => {
                throw new Error('error message');
            });
        });
    };

    this.testFailure_withDifferentMessage = () => {
        t.assertThrow("Expected not to throw error, but thrown 'different error message'", function () {
            t.assertNotThrow(() => {
                throw new Error('different error message');
            });
        });
    };
});
