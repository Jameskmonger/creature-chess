import { TestRunner, TestSet } from "alsatian";
import { TapBark } from "tap-bark";

const testType = process.argv[2];

// create test set
const testSet = TestSet.create();

// add your tests
testSet.addTestsFromFiles([
    "./packages/*/!(node_modules)/**/*.test.ts?(x)"
]);

// create a test runner
const testRunner = new TestRunner();

// setup the output
let outStream = testRunner.outputStream;

if (testType !== "ci") {
    outStream = outStream.pipe(TapBark.create().getPipeable());
}

// pipe to the console
outStream.pipe(process.stdout);

// run the test set
testRunner.run(testSet);
