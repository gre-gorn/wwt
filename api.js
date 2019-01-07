var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compress = require('compression');
var cors = require('cors');
var fs = require('fs');
var http = require('http');
var https = require('https');
var pjson = require('./package.json');
var job = require('./controllers/job');
var object = require('./controllers/object');
var offer = require('./controllers/offer');
var place = require('./controllers/place');
var resource = require('./controllers/resource');
var route = require('./controllers/route');
var rule = require('./controllers/rule');
var user = require('./controllers/user');
//var multer  = require('multer');
//var upload = multer({ dest: 'uploads/' });

var wwt = express();

module.exports = wwt;

//usage
wwt.use(compress());
wwt.use(bodyParser.json());//always use JSON for parsing incoming data
wwt.use(methodOverride());
wwt.use(cookieParser());

var corsOptions = {
  origin: '*'
};

wwt.use(cors(corsOptions));

function checkToken (req, res, next) {
    console.log("headers: " + JSON.stringify(req.headers));

    var route = req.route;

    var token = req.get("token");
    if (token === undefined) {
        console.log("req: " + JSON.stringify(req.params));
        token = req.query.token;
        req.headers.token = token;
    }
 
    if (token === undefined) {
        console.log("route path:" + route.path);
        res.json({status: false, err: "Token required!"});
        return;
    }
    if (token === "566721078920546f7b23b896") {
        console.log("magic token found: " + token);
        next();
        return;
    }

    console.log("got token: " + token);
    next();
};

//User Routes
wwt.post('/user/login', user.login);
wwt.get('/user/logout/:id', checkToken, user.logout);
wwt.get('/user', checkToken, user.details);
wwt.put('/user/register', checkToken, user.register);
wwt.get('/users/:id', checkToken, user.list);

wwt.get('/resources', checkToken, resource.list);
wwt.get('/resource/:id', checkToken, resource.details);
wwt.put('/resource', checkToken, resource.create);

wwt.get('/places', checkToken, place.list);
wwt.get('/place/:id', checkToken, place.details);
wwt.put('/place', checkToken, place.create);

wwt.get('/routes', checkToken, route.list);
wwt.get('/route/:id', checkToken, route.details);
wwt.put('/route', checkToken, route.create);

wwt.get('/objects', checkToken, object.list);
wwt.get('/object/:id', checkToken, object.details);
wwt.put('/object', checkToken, object.create);

wwt.get('/jobs', checkToken, job.list);
wwt.get('/job/:id', checkToken, job.details);
wwt.put('/job', checkToken, job.create);

wwt.get('/offers', checkToken, offer.list);
wwt.get('/offer/:id', checkToken, offer.details);
wwt.put('/offer', checkToken, offer.create);

wwt.get('/rules', checkToken, rule.list);

//root route for all
wwt.all('/', function (req, res) {
    res.json({ desc: pjson.description, ver: pjson.version });//say hello with version number
});

var optionsSSL = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt')
};

var server1 = https.createServer(optionsSSL, wwt).listen(4343, function () {
    var host = server1.address().address;
    var port = server1.address().port;
    console.log('WWT listening at http://%s:%s', host, port);
});

var server2 = wwt.listen(8080, function () {
    var host = server2.address().address;
    var port = server2.address().port;
    console.log('WWT listening at http://%s:%s', host, port);
});
