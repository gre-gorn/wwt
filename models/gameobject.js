var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var GameObjectSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    owner: {type: String, default: "Unknown"},
    contains: []
});

module.exports = mongoose.model('GameObject', GameObjectSchema);
