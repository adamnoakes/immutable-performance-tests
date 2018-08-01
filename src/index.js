const immutable = require('immutable');
const immutableTests = require("./immutable-tests");
const jsTests = require("./js-tests");
const helpers = require('./helpers');
const catalogue = require('../test-data/catalogue.json');
const { makeJs, makeImmutable } = require('./make-catalogue');
const largeJsCatalogue = makeJs(10000);
const veryLargeJsCatalogue = makeJs(100000);
const largeImmutableCatalogue = makeImmutable(10000);
const veryLargeImmutableCatalogue = makeImmutable(100000);

const { performTest } = helpers;

const tests = [
    () => performTest("catalogue-fromJS", immutableTests.fromJS(catalogue), 1000),
    () => performTest("catalogue-toJS", immutableTests.toJS(immutable.fromJS(catalogue)), 1000),
    () => performTest("immutable-catalogue-set", immutableTests.setChannel(immutable.fromJS(catalogue), 50), 10000),
    () => performTest("js-catalogue-set", jsTests.setChannel(catalogue, 50), 10000),


    () => performTest("catalogue-fromJS", immutableTests.fromJS(largeJsCatalogue), 10),
    () => performTest("catalogue-toJS", immutableTests.toJS(largeImmutableCatalogue), 10),
    () => performTest("immutable-catalogue-set", immutableTests.setChannel(largeImmutableCatalogue, 5000), 10000),
    () => performTest("js-catalogue-set", jsTests.setChannel(largeJsCatalogue, 5000), 1000),

    // () => performTest("catalogue-fromJS", immutableTests.fromJS(veryLargeCatalogue), 10),
    // () => performTest("catalogue-toJS", immutableTests.toJS(immutable.fromJS(veryLargeCatalogue)), 10),
    () => performTest("immutable-catalogue-set", immutableTests.setChannel(veryLargeImmutableCatalogue, 50000), 10000),
    () => performTest("js-catalogue-set", jsTests.setChannel(veryLargeJsCatalogue, 50000), 1000),


]
if (require.main === module) {
    console.log("\n===== 100 items =====");
    tests[0]();
    tests[1]();
    tests[2]();
    tests[3]();


    // large data sets
    console.log("\===== 10k items =====");
    tests[4]();
    tests[5]();
    tests[6]();
    tests[7]();

    console.log("\n===== 100k items =====");
    tests[8]();
    tests[9]();
}

module.exports = tests;