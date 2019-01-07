var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var ActSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    in: []
});

module.exports = mongoose.model('Act', ActSchema);
