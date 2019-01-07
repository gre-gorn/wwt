var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var SessionSchema = new Schema({
    token: {type: String, required: true, index: {unique: false}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    agent: {type: String, required: true, index: {unique: false}}
});

module.exports = mongoose.model('Session', SessionSchema);
