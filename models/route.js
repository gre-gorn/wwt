var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var RouteSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    from: {type: String, required: true},
    to: {type: String, required: true},
    founder: {type: String, default: "Unknown"},
    through: []
});

module.exports = mongoose.model('Route', RouteSchema);
