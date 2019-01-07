var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var JobSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    ends: { type: Date, default: Date.now },
    place: {type: String, required: true},
    owner: {type: String, default: "Unknown"},
    rule: {type: String, required: true}
});

module.exports = mongoose.model('Job', JobSchema);
