var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    value: {type: Number, default: 0},
    founder: {type: String, default: "Unknown"},
    owner: {type: String, default: "Unknown"},
    contains: []
});

module.exports = mongoose.model('Place', PlaceSchema);
