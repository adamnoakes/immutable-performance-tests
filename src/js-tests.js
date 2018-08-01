function setChannel(catalogue, index) {
    return function() {
        const newAttributes = { ...catalogue.relationships.items.data[index].attributes, channel: {} };
        const newItem = { ...catalogue.relationships.items.data[index], attributes: newAttributes };
        const newData = catalogue.relationships.items.data.slice(0, index).concat([newItem]).concat(catalogue.relationships.items.data.slice(index + 1));
        return { ...catalogue, items: { ...catalogue.relationships.items, data: newData } };
    }
}

module.exports = {
    setChannel
}