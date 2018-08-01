const now = require("performance-now")

function performTest(name, fn, iterations = 10000) {
    const t0 = now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const t1 = now();
    const mean = (t1 - t0) / iterations;
    console.log(name, mean);
    return mean;
}

module.exports = {
    performTest
};