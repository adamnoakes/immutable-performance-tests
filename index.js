const immutable = require('immutable');
const now = require("performance-now")
const immutableTests = require("./immutable-tests");
const jsTests = require("./js-tests");

const catalogue = require('./test-data/catalogue.json');
const { makeJs, makeImmutable } = require('./make-catalogue');
const largeJsCatalogue = makeJs(10000);
const veryLargeJsCatalogue = makeJs(100000);
const largeImmutableCatalogue = makeImmutable(10000);
const veryLargeImmutableCatalogue = makeImmutable(100000);

function performTest(name, fn, iterations = 10000) {
    const t0 = now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const t1 = now();
    const mean = (t1 - t0) / iterations;
    console.log(name, mean)
    return mean;
}

console.log("\n===== 100 items =====");
performTest("catalogue-fromJS", immutableTests.fromJS(catalogue), 1000);
performTest("catalogue-toJS", immutableTests.toJS(immutable.fromJS(catalogue)), 1000);
performTest("immutable-catalogue-set", immutableTests.setChannel(immutable.fromJS(catalogue), 50), 10000);
performTest("js-catalogue-set", jsTests.setChannel(catalogue, 50), 100-0);


// large data sets
console.log("\===== 10k items =====");
performTest("catalogue-fromJS", immutableTests.fromJS(largeJsCatalogue), 10);
performTest("catalogue-toJS", immutableTests.toJS(largeImmutableCatalogue), 10);
performTest("immutable-catalogue-set", immutableTests.setChannel(largeImmutableCatalogue, 5000), 10000);
performTest("js-catalogue-set", jsTests.setChannel(largeJsCatalogue, 5000), 1000);

console.log("\n===== 100k items =====");
// performTest("catalogue-fromJS", immutableTests.fromJS(veryLargeCatalogue), 10);
// performTest("catalogue-toJS", immutableTests.toJS(immutable.fromJS(veryLargeCatalogue)), 10);
performTest("immutable-catalogue-set", immutableTests.setChannel(veryLargeImmutableCatalogue, 50000), 10000);
performTest("js-catalogue-set", jsTests.setChannel(veryLargeJsCatalogue, 50000), 1000);
