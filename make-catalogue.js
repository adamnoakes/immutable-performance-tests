const assert = require('assert');
const catalogue = require('./test-data/catalogue.json');
const immutable = require('immutable');

module.exports = {
    makeJs: function(length) {
        return {
            ...catalogue,
            relationships: {
                ...catalogue.relationships,
                items: {
                    ...catalogue.relationships.items,
                    data: new Array(length).fill(catalogue.relationships.items.data[2])
                }
            }
        }
    },
    makeImmutable: function(length) {
        let immutableCatalogue = immutable.fromJS(catalogue);
        for(let i = 0; i < length; i++) {
            immutableCatalogue = immutableCatalogue.setIn(['relationships', 'items', 'data', i], immutableCatalogue.getIn(['relationships', 'items', 'data', 2]));
        }
        return immutableCatalogue;
    }
}


assert.deepEqual(module.exports.makeJs(100), module.exports.makeImmutable(100).toJS())