var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var OfferSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    description: {type: String, required: true},
    price: {type: Number, required: true},
    owner: {type: String, default: "Unknown"},
    in: [],
    out: []
});

module.exports = mongoose.model('Offer', OfferSchema);
