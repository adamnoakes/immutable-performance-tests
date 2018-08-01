const immutable = require('immutable');

function fromJS(object) {
    return function() {
        immutable.fromJS(object);
    }
}

function toJS(object) {
    return function() {
        object.toJS();
    }
}

function setChannel(catalogue, index) {
    return function() {
        catalogue.setIn(['relationships', 'items', 'data', index, 'attributes', 'channel'], {})
    }
}

module.exports = {
    fromJS,
    toJS,
    setChannel
}