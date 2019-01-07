var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    place: {type: String, required: true},
    size: {type: Number, default: 0}
});

module.exports = mongoose.model('Resource', ResourceSchema);
