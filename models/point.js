var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var PointSchema = new Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    z: {type: Number, required: true},
    owner: {type: String, required: true}
});

module.exports = mongoose.model('Point', PointSchema);
