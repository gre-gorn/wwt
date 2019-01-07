var mongoose = require('mongoose');

var directStoreInDb = true;

var url = 'mongodb://localhost/wwt_test';//:27017

mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    var Any = new mongoose.Schema({ any: mongoose.Schema.Types.Mixed });
    var Config = mongoose.model('Config', Any);
    var item = new Config({directStoreInDb: directStoreInDb});
    item.save(function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("init success");
    });
});

module.exports.mongoose = mongoose;
module.exports.directStoreInDb = directStoreInDb;
