var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var RuleSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    in: [],//Array of Acts
    out: []//Array of Reacts
});

module.exports = mongoose.model('Rule', RuleSchema);
