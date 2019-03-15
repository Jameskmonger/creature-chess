import { TestRunner, TestSet } from "alsatian";
import { TapBark } from "tap-bark";
import { configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { register } from "tsconfig-paths";

// tslint:disable-next-line:no-var-requires
const { compilerOptions } = require("./tsconfig.json");
const { baseUrl, paths } = compilerOptions;
register({ baseUrl, paths });

configure({ adapter: new Adapter() });

const testType = process.argv[2];

// create test set
const testSet = TestSet.create();

// add your tests
testSet.addTestsFromFiles("./test/**/*.test.js");

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
