var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var ProductionRuleSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    takes: [],
    produces: []
});

module.exports = mongoose.model('ProductionRule', ProductionRuleSchema);
