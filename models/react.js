var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var ReactSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    out: []
});

module.exports = mongoose.model('React', ReactSchema);
